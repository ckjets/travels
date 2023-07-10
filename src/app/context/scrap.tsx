"use client";

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

interface ContextProps {
  isOpenScrapModal: boolean;
  setIsOpenScrapModal: Dispatch<SetStateAction<boolean>>;
}

const ScrapContext = createContext<ContextProps>({
  isOpenScrapModal: false,
  setIsOpenScrapModal: (prevState): boolean => !prevState,
});

export const ScrapContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenScrapModal, setIsOpenScrapModal] = useState(false);

  return (
    <ScrapContext.Provider value={{ isOpenScrapModal, setIsOpenScrapModal }}>
      {children}
    </ScrapContext.Provider>
  );
};

export const useScrapContext = () => useContext(ScrapContext);
