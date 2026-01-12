import React, { useEffect } from 'react';
import { LOCATION_IDS } from './constants/floorplan';

// Import SVGs as React components
import { ReactComponent as Floor1 } from './assets/floor1.svg';
import { ReactComponent as Floor2 } from './assets/floor2.svg';
import { ReactComponent as Floor3 } from './assets/floor3.svg';
import { ReactComponent as FloorPlan } from './assets/floor_plan.svg';

type Props = {
  floorplan: string;
  color: string | null;
};

/**
 * Renders the correct SVG based on the selected floorplan
 * and applies color to SVG locations when selected.
 *
 * Responsibilities:
 * - Choose correct SVG
 * - Apply / reset fill color using LOCATION_IDS
 *
 * NOTE:
 * SVG manipulation is intentional and scoped to known IDs only.
 */
export const SvgRenderer: React.FC<Props> = ({ floorplan, color }) => {
  useEffect(() => {
    // Apply or reset color for known SVG locations
    LOCATION_IDS.forEach((id) => {
      const element = document.getElementById(id);

      if (!element) return;

      if (color) {
        element.setAttribute('fill', color);
      } else {
        element.removeAttribute('fill');
      }
    });
  }, [color, floorplan]); // re-apply when SVG changes

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
