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
  VStack,
  StackDivider,
  Tag,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaExternalLinkAlt, FaPen } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Header from "../Header";
import { useEffect, useState } from "react";
import ScrapModal from "@/components/ScrapModal";
import { useScrapContext } from "../../context/scrap";
import Footer from "@/components/Footer";
import { apolloClient } from "../../../graphql/client";

export default function Scrap() {
  const { isOpenScrapModal, setIsOpenScrapModal } = useScrapContext();

  return (
    <>
      {/* headerの高さ分だけpaddingを設定 */}
      <main>
        <Box maxW={480} style={{ height: "100%", margin: "auto" }}>
          <div style={{ paddingTop: 80 }}>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={2}
              align="stretch"
            >
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <Row key={i} />
                ))}
            </VStack>
          </div>
          <Footer token="hoge" />
        </Box>
      </main>
      <ScrapModal isOpen={isOpenScrapModal} setOpen={setIsOpenScrapModal} />
    </>
  );
}

const Row = () => {
  const MapMarkerIcon = chakra(FaMapMarkerAlt);
  const ExternalLinkIcon = chakra(FaExternalLinkAlt);
  const EditIcon = chakra(FaPen);
  const router = useRouter();
  return (
    <>
      <Box p={2}>
        <Box>
          <Flex justifyContent={"flex-end"}>
            <HStack spacing={2}>
              <Tag size={"sm"} bg="orange.100">
                たべもの
              </Tag>
              <Tag size={"sm"} bg="pink.100">
                絶対いきたい
              </Tag>
            </HStack>
          </Flex>

          <Flex pt={2} justifyContent="space-around">
            <Avatar bg="gray.200" />
            <Box>
              <p>ここのおまんじゅう気になる</p>
              <p>2023/01/12 hh:ss</p>
            </Box>
            <HStack spacing={1}>
              <Box as="button">
                <IconButton aria-label="map" icon={<MapMarkerIcon />} />
              </Box>
              <Box as="button">
                <IconButton aria-label="link" icon={<ExternalLinkIcon />} />
              </Box>
              <Box as="button">
                <IconButton aria-label="edit" icon={<EditIcon />} />
              </Box>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </>
  );
};
