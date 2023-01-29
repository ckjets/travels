"use client";

import { ChakraProvider } from "@chakra-ui/react";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createContext, useState } from "react";
import { useNoteContext, NoteContextProvider } from "@/app/context/note";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="ja">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* <ChakraProvider> */}
        <NoteContextProvider>
          {/* <div style={{ width: 480, height: "100%", margin: "auto" }}> */}
            {/* {pathname !== "/" && <Header />} */}
            {children}
            {/* {pathname !== "/" && <Footer />} */}
          {/* </div> */}
        </NoteContextProvider>
        {/* </ChakraProvider> */}
      </body>
    </html>
  );
}
