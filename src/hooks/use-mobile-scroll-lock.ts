export function useMobileScrollLock() {
  const lockMobileScroll = () => {
    document.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchend', (e: TouchEvent) => {
      e.preventDefault();
    }, { passive: false });
  };

  return {
    lockMobileScroll,
  }
}
