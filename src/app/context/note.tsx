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
  isOpenNoteModal: boolean;
  setIsOpenNoteModal: Dispatch<SetStateAction<boolean>>;
}

const NoteContext = createContext<ContextProps>({
  isOpenNoteModal: false,
  setIsOpenNoteModal: (prevState): boolean => !prevState,
});

export const NoteContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenNoteModal, setIsOpenNoteModal] = useState(false);

  return (
    <NoteContext.Provider value={{ isOpenNoteModal, setIsOpenNoteModal }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => useContext(NoteContext);
