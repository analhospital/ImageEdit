import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Layer, Rect, Stage, Text, Image, Group, Circle } from 'react-konva'
import useImage from 'use-image'
import { Text as ChakraUIText, useDisclosure } from '@chakra-ui/react'
import Head from 'next/head'

import { Telop } from './Telop'
import { Title } from './Title'
import { Wipe } from './Wipe'

import { useGetWindowSize } from '../hooks/useGetWindowSize'

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
} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

const Temp = () => {
  const [imageUrl, setImageUrl] = useState('')

  //mainImageは多分不要
  const [mainImage, setMainImage] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    var blobUrl = window.URL.createObjectURL(files[0])
    setMainImage(blobUrl)
  }

  const handleIconImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    var blobUrl = window.URL.createObjectURL(files[0])
    setIconImage(blobUrl)
  }

  const [image, imageStatus] = useImage(mainImage)
  const [image1] = useImage('/bangumi.png')
  const [image2] = useImage('/fukidashi.png')

  const displaySize = useGetWindowSize()
  console.log('画面サイズ：', displaySize)

  const [canvasImageResponsiveSize, setCanvasImageResponsiveSize] = useState({
    width: 0,
    height: 0,
  })

  const width = useMemo(
    () => (displaySize.width > 500 ? 500 : displaySize.width),
    [displaySize.width]
  )
  //初期表示時、画面サイズに準拠した４：３の画像を表示する
  const canvasInitWidth = useMemo(() => width * 0.8, [width])

  useEffect(() => {
    if (imageStatus === 'loaded' && image) {
      const ratio = image.height / image.width
      setCanvasImageResponsiveSize({
        width:
          image.width < displaySize.width
            ? image.width > 800
              ? 800
              : image.width
            : displaySize.width,
        height:
          image.width < displaySize.width
            ? image.width > 800
              ? 800 * ratio
              : image.height
            : displaySize.width * ratio,
      })
    }
  }, [imageStatus])

  useEffect(() => {
    setCanvasImageResponsiveSize({
      width: canvasInitWidth,
      height: (canvasInitWidth * 3) / 4,
    })
  }, [])

  const stageRef = useRef() as any
  const [textState, setTextState] = useState('なんかいい感じのテロップ')
  // const [formtext, setFormText] = useState(textState)

  // const handleSubmit = () => { setTextState(textState) };
  const [titleState, setTitleState1] = useState('タイトルを入力')
  const [commentState, setCommentState] = useState('便利すぎ')
  const [iconImage, setIconImage] = useState('/icon.png')

  const [image3, image3Status] = useImage(iconImage)
  const textChange = (event) => {
    setTextState(event.target.value)
  }
  const titleChange1 = (event) => {
    setTitleState1(event.target.value)
  }
  const commentChange = (event) => {
    setCommentState(event.target.value)
  }

  const handleSaveImage = () => {
    if (!stageRef.current) return
    const dataURL = stageRef.current.toDataURL({
      mimeType: 'image/jpeg',
      quality: 0,
      pixelRatio: window.devicePixelRatio,
    })
    setImageUrl(dataURL)
  }

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  )

  const handleWebShare = () => {
    if (!stageRef.current) return
    const dataURL = stageRef.current.toDataURL({
      mimeType: 'image/jpeg',
      quality: 0,
      pixelRatio: window.devicePixelRatio,
    })
    const toBlob = (base64) => {
      const decodedData = atob(base64.replace(/^.*,/, ''))
      const buffers = new Uint8Array(decodedData.length)
      for (let i = 0; i < decodedData.length; i++) {
        buffers[i] = decodedData.charCodeAt(i)
      }
      try {
        const blob = new Blob([buffers.buffer], {
          type: 'image/png',
        })
        return blob
      } catch (e) {
        return null
      }
    }

    const blob = toBlob(dataURL)
    if (!blob) return
    const imageFile = new File([blob], 'image.png', {
      type: 'image/png',
    })
    const shareData = {
      text: '#テロップつくるくん',
      url: 'https://telopkun.com',
      files: [imageFile],
    }

    navigator
      .share(shareData)
      .then(() => {
        console.log('Share was successful.')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const ShareButton = () => {
    if (!navigator.canShare) {
      console.log('cannnot share (for PC)')
      return <></>
    }
    else {
      const checkShare = new File(["check"], "check", {type: "image/png"})
      if (navigator.canShare({files: [checkShare]})) {
        console.log('can share (for mobile)')
        return (
          <Button
            colorScheme="blue"
            onClick={() => {
              handleWebShare()
            }}
          >
            Web Share API test
          </Button>
        )
      } else {
        // 古いバージョンだとfilesで画像がシェアできない
        console.log('cannot share (for old mobile)')
        return <></>
      }
  }}

  const canvasSize = useMemo(() => {
    return {
      width: !canvasImageResponsiveSize.width
        ? 320
        : canvasImageResponsiveSize.width * 0.92,
      height: !canvasImageResponsiveSize.height
        ? 240
        : canvasImageResponsiveSize.height * 0.92,
    }
  }, [canvasImageResponsiveSize])

  console.log(canvasSize)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = React.useState(<OverlayOne />)

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
          width="full"
          borderBottom={1}
          borderStyle={'solid'}
          align={'center'}
          py={4}
          px={{ base: '20px', md: '100px' }}
          borderColor={'gray.200'}
          bg={'white'}
          color={'gray.600'}
        >
          <ChakraUIText
            textAlign={{ base: 'center', md: 'left' }}
            fontFamily={'Nico Moji'}
            fontSize={{ base: '2xl', md: 'left' }}
            color={'gray.800'}
          >
            テロップつくるくん
          </ChakraUIText>
          <Spacer />

          <Link href="https://donate.wikimedia.org/w/index.php?title=Special:LandingPage&country=XX&uselang=ja&utm_medium=sidebar&utm_source=donate&utm_campaign=C13_ja.wikipedia.org">
            <Button colorScheme="blue">寄付する</Button>
          </Link>
        </Flex>

        <Container
          maxW="2xl"
          pt={{ base: '12', md: '12' }}
          pb={1}
          px={4}
          width="full"
        >
          <Flex flexDirection="column">
            <Stack height={canvasSize.height + 50}>
              <Box rounded={'lg'} boxSize={{ base: '320px', lg: '500px' }}>
                <link
                  href="https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@300&display=swap"
                  rel="stylesheet"
                />
                <Stage
                  ref={stageRef}
                  width={canvasSize.width}
                  height={canvasSize.height}
                  listening={false}
                  justify={'center'}
                  align={'center'}
                >
                  <Layer>
                    <Image
                      image={image}
                      width={canvasSize.width}
                      height={canvasSize.height}
                    />
                    <Group x={15} y={25}>
                      <Wipe
                        image3Status={image3Status}
                        image2={image2}
                        image3={image3}
                        commentState={commentState}
                        width={canvasSize.width}
                      />
                    </Group>
                    <Group x={0} y={0}>
                      <Title
                        width={canvasSize.width}
                        image1={image1}
                        titleState={titleState}
                      />
                    </Group>
                    <Telop
                      width={canvasSize.width}
                      height={canvasSize.height}
                      textState={textState}
                    />
                  </Layer>
                </Stage>
              </Box>
              <canvas
                id="my-canvas"
                width={canvasSize.width}
                height={canvasSize.height}
                hidden
              ></canvas>
              <canvas
                id="icon"
                width={canvasSize.width}
                height={canvasSize.height}
                hidden
              ></canvas>
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

              <Button
                colorScheme="blue"
                onClick={() => {
                  handleSaveImage()
                  setOverlay(<OverlayOne />)
                  onOpen()
                }}
              >
                保存する
              </Button>
              <ShareButton />
            </Stack>
          </Flex>
        </Container>

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

        <Box
          as="footer"
          role="contentinfo"
          mx="auto"
          maxW="8xl"
          py={10}
          px={{ base: '4', md: '8' }}
        >
          <ChakraUIText fontSize="sm">
            &copy; {new Date().getFullYear()} なんちゃらかんちゃらシステム開発 ,
            All rights reserved.
          </ChakraUIText>
        </Box>
      </ChakraProvider>
    </>
  )
}

export default Temp
