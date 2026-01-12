import React, { useState } from 'react';
import { locationsData } from './data/locations';
import './LocationTree.scss';

type LocationNode = {
  id: string;
  name: string;
  floorplan?: string;
  children?: LocationNode[];
};

type Props = {
  onSelectFloorplan: (floorplan: string) => void;
};

/**
 * Expandable hierarchical tree for locations.
 *
 * UX rules:
 * - Country & City nodes toggle expand / collapse
 * - Building nodes (leaf) trigger SVG render
 * - Hover-only highlight (no persistent selection)
 * - Expand state is local to the tree
 */
export const LocationTree: React.FC<Props> = ({ onSelectFloorplan }) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleNode = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const renderNode = (node: LocationNode) => {
    const isExpandable = Boolean(node.children?.length);
    const isExpanded = expandedIds.has(node.id);
    const isLeaf = Boolean(node.floorplan);

    return (
      <li key={node.id}>
        <div
          className="tree-row"
          onClick={() => {
            if (isExpandable) {
              toggleNode(node.id);
            } else if (isLeaf && node.floorplan) {
              onSelectFloorplan(node.floorplan);
            }
          }}
        >
          {isExpandable && (
            <span className="caret">
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
          <span className="label">{node.name}</span>
        </div>

        {isExpandable && isExpanded && (
          <ul className="tree-children">
            {node.children!.map(renderNode)}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="location-tree">
      <ul className="tree-root">
        {locationsData.map(renderNode)}
      </ul>
    </div>
  );
};

export default LocationTree;
