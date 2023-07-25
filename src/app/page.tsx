"use client";
import { PrismaClient } from "@prisma/client";

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
import styles from "./page.module.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { saveSessionStorageItem } from "@/utils/sessionStorage";

export default function Home() {
  const CFaUserAlt = chakra(FaUserAlt);
  const router = useRouter();

  const LOGIN_TRAVEL_BY_TOKEN = gql`
    mutation LoginToravelByToken($token: String!) {
      loginTravelByToken(token: $token) {
        id
        name
        token
      }
    }
  `;
  const [mutateFunction, { data, loading, error }] = useMutation(
    LOGIN_TRAVEL_BY_TOKEN
  );

  const [token, setToken] = useState("");

  return (
    <main className={styles.main}>
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
          <Box minW={{ md: "468px" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutateFunction({
                  onCompleted: (data) => {
                    console.log("data!!!!!!!!!", data);
                    saveSessionStorageItem("travelToken", token);
                    router.push(`${token}/scrap`);
                  },
                  onError: (error) => {
                    console.log(error);
                  },
                  variables: {
                    token: token,
                  },
                });
              }}
            >
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                borderRadius={"lg"}
              >
                <Input
                  placeholder="token"
                  size="lg"
                  onChange={(e) => {
                    setToken(e.target.value);
                  }}
                />
                <Button type="submit" isLoading={loading}>
                  Login
                </Button>
                {error && <p>Travelがありません</p>}
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </main>
  );
}
