import React, { useState } from 'react';
import './App.scss';
import { Description } from "./Description";
import { TABS, Tab } from './constants/tabs';
import Implementation from './Implementation';



export const App = () => {
  /**
   * Single source of truth for active tab.
   * Avoids multiple booleans and keeps UI state predictable.
   */
  const [activeTab, setActiveTab] = useState<Tab>(TABS.DESCRIPTION);

  // Derived state for readability in JSX
  const isDescriptionActive = activeTab === TABS.DESCRIPTION;

  return (
    <div className="App">
      <div className="tabs">
        <button
          onClick={() => setActiveTab('description')}
          className={isDescriptionActive ? 'active' : ''}
        >
          Description
        </button>

        <button
          onClick={() => setActiveTab('implementation')}
          className={!isDescriptionActive ? 'active' : ''}
        >
          Implementation
        </button>
      </div>

      <div className="content">
        {isDescriptionActive ? (
          // Description tab content
          <Description />
        ) : (
          // SVG implementation will be rendered here
          <Implementation/>
        )}
      </div>
    </div>
  );
};

export default App;
