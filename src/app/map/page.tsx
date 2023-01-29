"use client";

import Image from "next/image";
import { Inter } from "@next/font/google";
import {
  Avatar,
  Box,
  chakra,
  Flex,
  Heading,
  Stack,
  Input,
  Button,
} from "@chakra-ui/react";
// import styles from "./page.module.css";
import { FaUserAlt, FaLock } from "react-icons/fa";

export default function Home() {
  const CFaUserAlt = chakra(FaUserAlt);

  return (
    <main>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading as="h1" size="lg" mt={4}>
            Welcome
          </Heading>
          <Box minW={{  md: "468px" }}>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                borderRadius={'lg'}
              >
                <Input placeholder="token" size="lg" />
                <Button>Login</Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </main>
  );
}
