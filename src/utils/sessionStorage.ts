/** セッションストレージに保存する */
export const saveSessionStorageItem = <T>(key: string, saveItem: T) => {
  const formatedData = JSON.stringify(saveItem);
  window.sessionStorage.setItem(key, formatedData);
};

export const removeSessionStorageItem = (key: string) => {
  window.sessionStorage.removeItem(key);
};

export const getSessionStorageItem = <T>(key: string) => {
  const data = window.sessionStorage.getItem(key);
  const formatedData = JSON.parse(data!);

  return formatedData as T;
};

export const allClearSessionStorage = () => {
  window.sessionStorage.clear();
};
