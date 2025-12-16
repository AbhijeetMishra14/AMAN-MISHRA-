import { useEffect } from 'react';

/**
 * HelpWidget Component
 * Renders OpenWidget communication tool loaded globally from index.html
 * OpenWidget provides chat, messaging, and other communication features
 */
export default function HelpWidget() {
  useEffect(() => {
    // OpenWidget script is loaded globally from index.html
    // The widget initializes automatically when the page loads
    // No additional setup required here
  }, []);

  // OpenWidget renders itself globally, this component just ensures it's initialized
  return null;
}
