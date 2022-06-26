import React, { useState, useRef } from "react";
import { Layer, Rect, Stage, Text, Image, Group, Circle } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import { Text as CText } from "@chakra-ui/react";
import Head from "next/head";

//ChakraUIとkonvaでTextがダブったので
// import { CText } from "./CText";

import {
  Box,
  Flex,
  Input,
  Stack,
  Spacer,
  Container,
  Button,
  Link,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

const Temp = () => {
  const inputRef = useRef(null);

  const [mainImage, setMainImage] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    var blobUrl = window.URL.createObjectURL(files[0]);
    setMainImage(blobUrl);
  };

  const handleIconImageChange = (e) => {
    const files = Array.from(e.target.files);
    var blobUrl = window.URL.createObjectURL(files[0]);
    setIconImage(blobUrl);
  };

  const [image, imageStatus] = useImage(mainImage);
  const [image1] = useImage("/bangumi.png");
  const [image2] = useImage("/fukidashi.png");

  const width = 500;

  // {画像が読み込みおわったら正しいcanvasサイズをセット}
  let height = 500;
  if (imageStatus === "loaded") {
    height = (height * image.height) / image.width;
  }

  // function TelopField() {
  const stageRef = useRef();
  const [textState, setTextState] = useState("なんかいい感じのテロップ");
  // const [formtext, setFormText] = useState(textState)

  // const handleSubmit = () => { setTextState(textState) };
  const [titleState1, setTitleState1] = useState("タイトルを入力");
  const [titleState2, setTitleState2] = useState("テスト");
  const [commentState, setCommentState] = useState("便利すぎ");
  const [iconImage, setIconImage] = useState("/icon.png");

  const [image3, image3Status] = useImage(iconImage);
  const textChange = (event) => {
    setTextState(event.target.value);
  };
  const titleChange1 = (event) => {
    setTitleState1(event.target.value);
  };
  const titleChange2 = (event) => {
    setTitleState2(event.target.value);
  };
  const commentChange = (event) => {
    setCommentState(event.target.value);
  };

  function NeonText() {
    const fontsize = 35;
    const fontfamily = "'YuMincho', 'Yu Mincho', 'serif'";
    const fontstyle = "italic";
    const r = 180;
    const g = 0;
    const b = 0;
    const shadowcolor = `rgb(${r}, ${g}, ${b})`;
    const text_length = new Konva.Text({
      text: textState,
      fontSize: fontsize,
      fontFamily: fontfamily,
      fontStyle: fontstyle,
    }).textWidth;
    const strokecolor = `rgba(${r}, ${g}, ${b}, 0.2)`;
    const fillcolor = `rgba(255, 255, 255, 1)`;
    const scaleX = Math.min(1, (width * 0.9) / text_length);

    // const fontsize = 70
    return (
      <Group
        x={(width - text_length * scaleX) / 2}
        y={height - fontsize * 1.2 - 20}
        scaleX={scaleX}
      >
        <Text
          text={textState}
          fontSize={fontsize}
          fontFamily={fontfamily}
          fontStyle={fontstyle}
          align="left"
          stroke={strokecolor}
          shadowColor={shadowcolor}
          shadowBlur={10}
          strokeWidth={8.5}
          fillEnabled={false}
        />
        <Text
          text={textState}
          fontSize={fontsize}
          fontFamily={fontfamily}
          fontStyle={fontstyle}
          align="left"
          stroke={strokecolor}
          strokeWidth={7}
          fillEnabled={false}
        />
        <Text
          text={textState}
          fontSize={fontsize}
          fontFamily={fontfamily}
          fontStyle={fontstyle}
          align="left"
          stroke={strokecolor}
          strokeWidth={5.5}
          fillEnabled={false}
        />
        <Text
          text={textState}
          fontSize={fontsize}
          fontFamily={fontfamily}
          fontStyle={fontstyle}
          align="left"
          stroke={strokecolor}
          strokeWidth={4}
          fillEnabled={false}
        />

        <Text
          text={textState}
          fontSize={fontsize}
          fontFamily={fontfamily}
          fontStyle={fontstyle}
          align="left"
          stroke={fillcolor}
          strokeWidth={1.5}
          fillEnabled={false}
        />
        <Text
          text={textState}
          fontSize={fontsize}
          fontFamily={fontfamily}
          fontStyle={fontstyle}
          align="left"
          fill={fillcolor}
        />
      </Group>
    );
  }

  function TitleText() {
    const fontsize1 = 24;
    const fontfamily1 = "KiWi Maru";
    const text_length1 = new Konva.Text({
      text: titleState1 + "    ",
      fontSize: fontsize1,
      fontFamily: fontfamily1,
    }).textWidth;

    const fontsize2 = 24;
    const fontfamily2 = "KiWi Maru";
    const text_length2 = new Konva.Text({
      text: titleState2 + " ",
      fontSize: fontsize2,
      fontFamily: fontfamily2,
    }).textWidth;
    const text_length_sum =
      40 +
      (titleState1 !== "" ? text_length1 - 29 : 0) +
      (titleState2 !== "" ? text_length2 : 0);
    function TitleText1() {
      if (titleState1 === "") {
        return <Group></Group>;
      } else {
        return (
          <Group>
            <Image
              image={image1}
              x={0}
              y={1}
              scaleX={(0.1 * text_length1) / 164}
              scaleY={0.15}
            />
            <Text
              text={titleState1}
              x={14}
              y={14}
              fontSize={fontsize1}
              fontFamily={fontfamily1}
              align="left"
              stroke="#000"
              strokeWidth={1.5}
              fill="#000"
            />
          </Group>
        );
      }
    }
    function TitleText2() {
      if (titleState2 === "") {
        <Group></Group>;
      } else {
        return (
          <Group>
            <Rect
              x={text_length1}
              y={13}
              width={text_length2}
              height={fontsize2 + 4}
              fill="red"
            />
            <Text
              text={titleState2}
              x={text_length1 + 3}
              y={14}
              fontSize={fontsize2}
              fontFamily={fontfamily2}
              align="left"
              stroke="#000"
              strokeWidth={2}
              fill="#000"
            />
          </Group>
        );
      }
    }

    return (
      <Group x={width - text_length_sum}>
        <TitleText1 />
        <TitleText2 />
      </Group>
    );
  }

  function WipeComment() {
    const radius = 40;
    const waku_ratio = 0.1;
    function RoundedImage() {
      if (image3Status !== "loaded") {
        return <Group></Group>;
      } else {
        return (
          <Group
            clipFunc={(ctx) => {
              ctx.beginPath();
              ctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
            }}
          >
            <Image width={radius * 2} height={radius * 2} image={image3} />
          </Group>
        );
      }
    }
    function WipeText() {
      const fontsize = 18;
      const fontfamily = "Kiwi Maru";
      const text_length = new Konva.Text({
        text: commentState + "    ",
        fontSize: fontsize,
        fontFamily: fontfamily,
      }).textWidth;
      if (commentState === "") {
        return <Group></Group>;
      } else {
        return (
          <Group x={20} y={85}>
            <Image
              image={image2}
              x={3 - text_length * 0.05}
              y={1}
              scaleX={(0.18 * text_length) / 90}
              scaleY={0.3}
            />
            <Text
              text={commentState}
              x={10}
              y={14}
              fontSize={fontsize}
              fontFamily={fontfamily}
              align="left"
              stroke="#000"
              strokeWidth={1.0}
              fill="#000"
            />
          </Group>
        );
      }
    }
    return (
      <Group x={radius * waku_ratio} y={radius * waku_ratio}>
        <Circle
          x={radius}
          y={radius}
          radius={radius * (1 + waku_ratio)}
          fill="white"
          strokeWidth={2}
          stroke="black"
        />
        <RoundedImage />
        <WipeText />
      </Group>
    );
  }

  const handleSaveImage = () => {
    if (stageRef.current !== undefined) {
      const dataURL = stageRef.current.toDataURL({
        mimeType: "image/jpeg",
        quality: 0,
        pixelRatio: 2,
      });
      console.log(dataURL);
    }
  };

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
          width="500px"
          borderBottom={1}
          borderStyle={"solid"}
          align={"center"}
          py={4}
          px={{ base: "20px", md: "100px" }}
          borderColor={"gray.200"}
          bg={"white"}
          color={"gray.600"}
        >
          <CText
            textAlign={{ base: "center", md: "left" }}
            fontFamily={"Nico Moji"}
            fontSize={{ base: "4xl", md: "left" }}
            color={"gray.800"}
          >
            テロップつくるくん
          </CText>
          <Spacer />

          <Link href="https://donate.wikimedia.org/w/index.php?title=Special:LandingPage&country=XX&uselang=ja&utm_medium=sidebar&utm_source=donate&utm_campaign=C13_ja.wikipedia.org">
            <Button colorScheme="blue">寄付する</Button>
          </Link>
        </Flex>

        <Container maxW="7xl" pt={{ base: "12", md: "12" }} pb={1} px={4}>
          <Flex flexDirection={{ base: "column-reverse", md: "row" }}>
            <Stack spacing={4}>
              <Text fontWeight="semibold">コマ画像</Text>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
                ref={inputRef}
              />
              <Text fontWeight="semibold">アイコン</Text>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleIconImageChange}
                ref={inputRef}
              />
              <Text fontWeight="semibold">テロップ</Text>
              <Input
                inputMode="text"
                placeholder="どういうお笑い"
                value={textState}
                onChange={textChange}
              />
              <Text fontWeight="semibold">ツッコミ</Text>
              <Input
                inputMode="text"
                placeholder="どういうお笑い"
                value={commentState}
                onChange={commentChange}
              />

              <Text fontWeight="semibold">番組名１</Text>
              <Input
                inputMode="text"
                placeholder="@TwitterJP"
                value={titleState1}
                onChange={titleChange1}
              />
              <Text fontWeight="semibold">番組名２</Text>
              <Input
                inputMode="text"
                placeholder="@TwitterJP"
                value={titleState2}
                onChange={titleChange2}
              />
              <Button colorScheme="blue" onClick={handleSaveImage}>
                反映する
              </Button>
            </Stack>
            <Stack height={550}>
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
                      <WipeComment />
                    </Group>
                    <Group x={0} y={0}>
                      <TitleText />
                    </Group>
                    <NeonText />
                  </Layer>
                </Stage>
              </Box>
              <canvas id="my-canvas" width="500" height="500" hidden></canvas>
              <canvas id="icon" width="500" height="500" hidden></canvas>
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
          <Text fontSize="sm">
            &copy; {new Date().getFullYear()} なんちゃらかんちゃらシステム開発 ,
            All rights reserved.
          </Text>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default Temp;
