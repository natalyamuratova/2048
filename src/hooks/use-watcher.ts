import { useEffect, useRef } from "react";

/**
 * Watches for states changes and applies callback if this changes was made.
 * It skips the first render after component initialization.
 * @param callback - applied function.
 * @param deps - states that is watching.
 */
function useWatcher<T>(callback: () => void, deps: T[]) {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    callback();
  }, deps);
}

export default useWatcher;
