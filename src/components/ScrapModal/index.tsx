"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";

interface ScrapModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ScrapModal = (props: ScrapModalProps) => {
  const { isOpen, setOpen } = props;

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [map, setMap] = useState("");
  const [tag, setTag] = useState("");

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>したいこと</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="タイトル"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <Input
                placeholder="参考リンク"
                onChange={(e) => setLink(e.target.value)}
              ></Input>
              <Input
                placeholder="Google Map"
                onChange={(e) => setMap(e.target.value)}
              ></Input>
              <Input placeholder="タグ"></Input>
            </VStack>

            {/* <p>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
              officia tempor esse quis. Sunt ad dolore quis aute consequat.
              Magna exercitation reprehenderit magna aute tempor cupidatat
              consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
              incididunt cillum quis. Velit duis sit officia eiusmod Lorem
              aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
              consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
              et. Culpa deserunt nostrud ad veniam.
            </p> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              とじる
            </Button>
            <Button variant="ghost">登録</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScrapModal;
