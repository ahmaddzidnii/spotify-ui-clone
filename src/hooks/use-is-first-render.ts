import { useRef, useEffect } from "react";

/**
 * React hook that returns true if the component is the first render
 * @returns {boolean} true if the component is the first render, otherwise false
 */
export default function useIsFirstRender() {
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    // This runs after the initial render and all subsequent renders
    isFirstRenderRef.current = false;
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return isFirstRenderRef.current;
}
