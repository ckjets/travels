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
  Stack,
  chakra,
  IconButton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { FaStar, FaMapMarkedAlt, FaRegCalendarAlt } from "react-icons/fa";

// 追加
const Footer: FC = () => {
  // 追加 カラーモードを切り替える
  const { colorMode, toggleColorMode } = useColorMode();
  const StarIcon = chakra(FaStar);
  const MapIcon = chakra(FaMapMarkedAlt);
  const CalenderIcon = chakra(FaRegCalendarAlt);
  const router = useRouter();

  return (
    /* 変更　ライトモードでgray.100,ダークモードでgray.900とする。 */
    // <Stack direction={["column", "row"]} justifyContent="center" spacing="24px">
    //   <Box w="40px" h="40px" bg="yellow.200">
    //     1
    //   </Box>
    //   <Box w="40px" h="40px" bg="tomato">
    //     2
    //   </Box>
    //   <Box w="40px" h="40px" bg="pink.100">
    //     3
    //   </Box>
    // </Stack>
    <Box style={{ position: "fixed", bottom: 0}} maxW={480}>
      <Box
        minW={{ md: "468px" }}
        height={120}
        as="footer"
        background={"gray.100"}
      >
        <Flex justifyContent="center" alignItems="center">
          <Box p={10} as="button" onClick={() => router.push("/scrap")}>
            <StarIcon w={10} h={10} />
          </Box>
          <Box p={10} as="button">
            <MapIcon w={10} h={10} onClick={() => router.push("/map")} />
          </Box>
          <Box p={10} as="button">
            <CalenderIcon
              w={10}
              h={10}
              onClick={() => router.push("/itinerary")}
            />
          </Box>
        </Flex>
      </Box>

      {/* <Stack
        spacing={4}
        p="1rem"
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
        borderRadius={"lg"}
        // direction={["column", "row"]}
        justifyContent="center"
      >

      </Stack> */}
    </Box>
  );
};

export default Footer;
