"use client";

import "./globals.css";
// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { apolloClient } from "../graphql/client";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const theme = createTheme();

  return (
    <html lang="ja">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body>
        {/* <ThemeProvider theme={theme}> */}
        <ChakraProvider>
          <ApolloProvider client={apolloClient}>
            {/* <div style={{ width: 480, height: "100%", margin: "auto" }}> */}
            {/* {pathname !== "/" && <Header />} */}
            {children}
            {/* {pathname !== "/" && <Footer />} */}
            {/* </div> */}
          </ApolloProvider>
        </ChakraProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
