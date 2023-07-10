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
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
// import styles from "./page.module.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "../css/date-picker.css";

export default function Create() {
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

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    // <main className={styles.main}>

    <>
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
          <Image src="/destination.png" alt="logo" width={200} height={200} />
          <Heading as="h1" size="lg" mt={4}>
            旅行計画を立てましょう！
          </Heading>
          <Box minW={{ md: "468px" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutateFunction({
                  onCompleted: (data) => {
                    console.log("data!!!!!!!!!", data);
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
                Radius={"lg"}
              >
                <Heading as="h2" size="md" mt={4}>
                  旅の名前を教えてください
                </Heading>
                <Input
                  placeholder="日本一周旅行"
                  size="lg"
                  onChange={(e) => {
                    setToken(e.target.value);
                  }}
                />
                <Heading as="h2" size="md" mt={4}>
                  どのくらい行きますか？
                </Heading>
                <FormControl>
                  <DatePicker
                    // className="react-datapicker__input-text"
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                      setDateRange(update);
                    }}
                    isClearable={true}
                    customInput={
                      <Input
                        size={"lg"}
                        marginEnd={16}
                        onChange={(e) => {
                          setToken(e.target.value);
                        }}
                      />
                    }
                  />
                </FormControl>
                <Button type="submit" isLoading={loading}>
                  旅行をはじめる
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
    // </main>
  );
}
