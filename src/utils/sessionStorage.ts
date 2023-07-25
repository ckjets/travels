/** セッションストレージに保存する */
export const saveSessionStorageItem = <T>(key: string, saveItem: T) => {
  if (typeof window !== "undefined") {
    const formatedData = JSON.stringify(saveItem);
    window.sessionStorage.setItem(key, formatedData);
  }
};

export const removeSessionStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(key);
  }
};

export const getSessionStorageItem = <T>(key: string) => {
  if (typeof window === "undefined") return null;
  const data = window.sessionStorage.getItem(key);
  const formatedData = JSON.parse(data!);

  return formatedData as T;
};

export const allClearSessionStorage = () => {
  if (typeof window !== "undefined") {
    window.sessionStorage.clear();
  }
};
