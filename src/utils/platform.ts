export const isAndroidApp = (): boolean => {
  if (import.meta.env.VITE_APP_PLATFORM === 'android') {
    return true;
  }
  if (typeof window !== 'undefined') {
    if ((window as any).AndroidBridge) return true;
    if (window.location.protocol === 'file:') return true;
    if (window.navigator.userAgent && window.navigator.userAgent.includes('AllCalculatorAndroid')) {
      return true;
    }
  }
  return false;
};
