import React, { useState } from 'react';
import './App.scss';
import { Description } from "./Description";

/**
 * Using an explicit union type instead of boolean state.
 * This makes the UI state more expressive and easier to extend
 * if additional tabs are introduced later.
 */
type Tab = 'description' | 'implementation';

export const App = () => {
  /**
   * Single source of truth for active tab.
   * Avoids multiple booleans and keeps UI state predictable.
   */
  const [activeTab, setActiveTab] = useState<Tab>('description');

  // Derived state for readability in JSX
  const isDescriptionActive = activeTab === 'description';

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
          <p>Your implementation with SVG goes here...</p>
        )}
      </div>
    </div>
  );
};

export default App;
