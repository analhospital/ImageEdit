import React, { useState, useRef, useEffect } from "react";
import { Layer, Rect, Stage, Text, Image, Group, Circle } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import { Text as ChakraUIText, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";

import { Telop } from "./Telop";
import { Title } from "./Title";
import { Wipe } from "./Wipe";

import {
  Box,
  Flex,
  Input,
  Stack,
  Spacer,
  Container,
  Button,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

const Temp = () => {
  const useImg = useRef(null) as any;

  const [imageUrl, setImageUrl] = useState("");

  //mainImageは多分不要
  const [mainImage, setMainImage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    var blobUrl = window.URL.createObjectURL(files[0]);
    setMainImage(blobUrl);
  };

  const handleIconImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    var blobUrl = window.URL.createObjectURL(files[0]);
    setIconImage(blobUrl);
  };

  const [image, imageStatus] = useImage(mainImage);
  const [image1] = useImage("/bangumi.png");
  const [image2] = useImage("/fukidashi.png");

  const width = 500;

  // {画像が読み込みおわったら正しいcanvasサイズをセット}
  const [height, setHeight] = useState(500);

  useEffect(() => {
    if (imageStatus === "loaded") {
      if (image != null) {
        setHeight((height * image.height) / image.width);
      }
    }
  }, [imageStatus]);

  // function TelopField() {
  const stageRef = useRef() as any;
  const [textState, setTextState] = useState("なんかいい感じのテロップ");
  // const [formtext, setFormText] = useState(textState)

  // const handleSubmit = () => { setTextState(textState) };
  const [titleState, setTitleState1] = useState("タイトルを入力");
  const [commentState, setCommentState] = useState("便利すぎ");
  const [iconImage, setIconImage] = useState("/icon.png");

  const [image3, image3Status] = useImage(iconImage);
  const textChange = (event) => {
    setTextState(event.target.value);
  };
  const titleChange1 = (event) => {
    setTitleState1(event.target.value);
  };
  const commentChange = (event) => {
    setCommentState(event.target.value);
  };

  const handleSaveImage = () => {
    if (!stageRef.current) return;
    const dataURL = stageRef.current.toDataURL({
      mimeType: "image/jpeg",
      quality: 0,
      pixelRatio: 2,
    });
    setImageUrl(dataURL);
  };

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <ChakraProvider>
        <Head>
          <title> テロップつくるくん</title>
          <meta name="description" content="Generated by create next app" />
          <link
            href="https://fonts.googleapis.com/earlyaccess/nicomoji.css"
            rel="stylesheet"
          />
        </Head>

        <Flex
          as="header"
          minWidth="500px"
          width="full"
          borderBottom={1}
          borderStyle={"solid"}
          align={"center"}
          py={4}
          px={{ base: "20px", md: "100px" }}
          borderColor={"gray.200"}
          bg={"white"}
          color={"gray.600"}
        >
          <ChakraUIText
            textAlign={{ base: "center", md: "left" }}
            fontFamily={"Nico Moji"}
            fontSize={{ base: "4xl", md: "left" }}
            color={"gray.800"}
          >
            テロップつくるくん
          </ChakraUIText>
          <Spacer />

          <Link href="https://donate.wikimedia.org/w/index.php?title=Special:LandingPage&country=XX&uselang=ja&utm_medium=sidebar&utm_source=donate&utm_campaign=C13_ja.wikipedia.org">
            <Button colorScheme="blue">寄付する</Button>
          </Link>
        </Flex>

        <Container maxW="2xl" pt={{ base: "12", md: "12" }} pb={1} px={4}>
          <Flex flexDirection="column">
            <Stack height={height + 50}>
              {/* 仮置きでアイドル画像をImgタグで表示しています */}
              <Box rounded={"lg"} boxSize={{ base: "320px", lg: "500px" }}>
                <link
                  href="https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@300&display=swap"
                  rel="stylesheet"
                />
                <Stage ref={stageRef} width={width} height={height}>
                  <Layer>
                    <Image image={image} width={width} height={height} />
                    <Group x={15} y={25}>
                      <Wipe
                        image3Status={image3Status}
                        image2={image2}
                        image3={image3}
                        commentState={commentState}
                      />
                    </Group>
                    <Group x={0} y={0}>
                      <Title
                        width={width}
                        image1={image1}
                        titleState={titleState}
                      />
                    </Group>
                    <Telop
                      width={width}
                      height={height}
                      textState={textState}
                    />
                  </Layer>
                </Stage>
              </Box>
              <canvas id="my-canvas" width="500" height="500" hidden></canvas>
              <canvas id="icon" width="500" height="500" hidden></canvas>
            </Stack>
            <Stack spacing={4}>
              <ChakraUIText fontWeight="semibold">コマ画像</ChakraUIText>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
              />
              <ChakraUIText fontWeight="semibold">アイコン</ChakraUIText>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleIconImageChange}
              />
              <ChakraUIText fontWeight="semibold">テロップ</ChakraUIText>
              <Input
                inputMode="text"
                placeholder="どういうお笑い"
                value={textState}
                onChange={textChange}
              />
              <ChakraUIText fontWeight="semibold">ツッコミ</ChakraUIText>
              <Input
                inputMode="text"
                placeholder="どういうお笑い"
                value={commentState}
                onChange={commentChange}
              />

              <ChakraUIText fontWeight="semibold">番組名</ChakraUIText>
              <Input
                inputMode="text"
                placeholder="@TwitterJP"
                value={titleState}
                onChange={titleChange1}
              />

              {/* <Button colorScheme="blue" onClick={handleSaveImage}>
                保存する
              </Button> */}

              <Button
                colorScheme="blue"
                onClick={() => {
                  handleSaveImage();
                  setOverlay(<OverlayOne />);
                  onOpen();
                }}
              >
                保存する
              </Button>

              <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                  <ModalHeader>画像が生成されました！</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <img src={imageUrl} />
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Stack>
          </Flex>
        </Container>

        <Box
          as="footer"
          role="contentinfo"
          mx="auto"
          maxW="8xl"
          py={10}
          px={{ base: "4", md: "8" }}
        >
          <ChakraUIText fontSize="sm">
            &copy; {new Date().getFullYear()} なんちゃらかんちゃらシステム開発 ,
            All rights reserved.
          </ChakraUIText>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default Temp;