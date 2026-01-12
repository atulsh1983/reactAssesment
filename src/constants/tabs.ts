export const TABS = {
    DESCRIPTION: 'description',
    IMPLEMENTATION: 'implementation',
  } as const;
  
  export type Tab = typeof TABS[keyof typeof TABS];
  