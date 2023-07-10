/* src/components/Header.tsx */
import {
  Box,
  Flex,
  Container,
  Heading,
  /* 追加 */
  useColorMode,
  useColorModeValue,
  Button,
  IconButton,
  chakra,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, useState } from "react";
// 追加
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaPlus } from "react-icons/fa";
import { useScrapContext } from "../../context/scrap";

const Header: FC = () => {
  const { setIsOpenScrapModal } = useScrapContext();

  // 追加 カラーモードを切り替える
  const { colorMode, toggleColorMode } = useColorMode();
  const PlusIcon = chakra(FaPlus);
  return (
    /* 変更ライトモードでgray.100,ダークモードでgray.900とする。 */
    <Box style={{ position: "fixed" }}>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        as={"header"}
        maxW={480}
        zIndex={100}
      >
        <Container maxW="container.lg">
          <Flex py="4" justifyContent="space-between" alignItems="center">
            <NextLink href="/" passHref>
              {/* 変更 ライトモードでgray.600、ダークモードでwhiteとする */}
              <Heading
                as="h1"
                fontSize="2xl"
                cursor="pointer"
                color={useColorModeValue("gray.600", "white")}
              >
                したいことを追加する
              </Heading>
            </NextLink>
            {/* 追加 切り替えアイコン */}
            {/* <Button size="lg" onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button> */}
            <IconButton
              size={"lg"}
              aria-label="add-button"
              onClick={() => {
                console.log("click add button");
                setIsOpenScrapModal(true);
              }}
              icon={<PlusIcon />}
            />
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
