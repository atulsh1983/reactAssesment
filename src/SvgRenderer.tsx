import React from 'react';

// Import SVGs as React components
import { ReactComponent as Floor1 } from './assets/floor1.svg';
import { ReactComponent as Floor2 } from './assets/floor2.svg';
import { ReactComponent as Floor3 } from './assets/floor3.svg';
import { ReactComponent as FloorPlan } from './assets/floor_plan.svg';

type Props = {
  floorplan: string;
};

/**
 * Renders the correct SVG based on the selected floorplan.
 * This component is intentionally stateless and declarative.
 */
export const SvgRenderer: React.FC<Props> = ({ floorplan }) => {
  switch (floorplan) {
    case 'floor1.svg':
      return <Floor1 />;
    case 'floor2.svg':
      return <Floor2 />;
    case 'floor3.svg':
      return <Floor3 />;
    case 'floor_plan.svg':
      return <FloorPlan />;
    default:
      return null;
  }
};

export default SvgRenderer;
