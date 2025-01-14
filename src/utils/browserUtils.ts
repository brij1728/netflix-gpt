export const BrowserUtils = {
  getLocationHref: () => window.location.href,
  setLocalStorageItem: (key: string, value: string) =>
    window.localStorage.setItem(key, value),
  getLocalStorageItem: (key: string): string | null =>
    window.localStorage.getItem(key),
  removeLocalStorageItem: (key: string) => window.localStorage.removeItem(key),
};
