import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Layer, Rect, Stage, Text, Image, Group, Circle } from 'react-konva'
import useImage from 'use-image'
import {
  Text as ChakraUIText,
  useDisclosure,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import { Telop } from './Telop'
import { Title } from './Title'
import { Wipe } from './Wipe'
import { ShareButton } from './ShareButton'

import { useGetWindowSize } from '../hooks/useGetWindowSize'
import { convertStageRefToDataUrl } from '../utils/convertStageRefToDataUrl'

import {
  Box,
  Flex,
  Input,
  Stack,
  Container,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const tabName = ['コマ画像', 'テロップ', 'ワイプ', '番組名']

const Main = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [mainImage, setMainImage] = useState('')
  const [image, imageStatus] = useImage(mainImage)
  const [image1] = useImage('/bangumi.png')
  const [image2] = useImage('/fukidashi.png')
  const stageRef = useRef() as any
  const [textState, setTextState] = useState('なんかいい感じのテロップ')
  const [titleState, setTitleState] = useState('タイトルを入力')
  const [commentState, setCommentState] = useState('便利すぎ')
  const [iconImage, setIconImage] = useState('/icon.png')
  const [image3, image3Status] = useImage(iconImage)

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

  const displaySize = useGetWindowSize()
  const width = useMemo(
    () => (displaySize.width > 500 ? 500 : displaySize.width),
    [displaySize.width]
  )
  //初期表示時、画面サイズに準拠した４：３の画像を表示する
  const canvasInitWidth = useMemo(() => width * 0.8, [width])

  const [canvasImageResponsiveSize, setCanvasImageResponsiveSize] = useState({
    width: 0,
    height: 0,
  })
  useEffect(() => {
    setCanvasImageResponsiveSize({
      width: canvasInitWidth,
      height: (canvasInitWidth * 3) / 4,
    })
  }, [])

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

  useEffect(() => {
    if (imageStatus === 'loaded' && image) {
      const ratio = image.height / image.width
      setCanvasImageResponsiveSize({
        width:
          image.width < displaySize.width
            ? image.width > 640
              ? 640
              : image.width
            : displaySize.width > 640
            ? 640
            : displaySize.width,
        height:
          image.width < displaySize.width
            ? image.width > 640
              ? 640 * ratio
              : image.height
            : displaySize.width > 640
            ? 640 * ratio
            : displaySize.width * ratio,
      })
    }
  }, [imageStatus])

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Container
        maxW="2xl"
        pt={{ base: '2', md: '6' }}
        pb={1}
        px={4}
        width="full"
      >
        <Flex flexDirection="column">
          <Tabs isFitted variant="enclosed" defaultIndex={0} mb={6}>
            <TabList>
              {tabName.map((n) => (
                <Tab fontSize={'0.8rem'} key={n}>
                  {n}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack spacing={2}>
                  <ChakraUIText fontSize={'0.8rem'} fontWeight="semibold">
                    コマ画像
                  </ChakraUIText>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={handleFileChange}
                  />
                </Stack>
              </TabPanel>

              <TabPanel>
                <Stack spacing={2}>
                  <>
                    <ChakraUIText fontSize={'0.8rem'} fontWeight="semibold">
                      アイコン
                    </ChakraUIText>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={handleIconImageChange}
                    />
                  </>
                  <>
                    <ChakraUIText fontSize={'0.8rem'} fontWeight="semibold">
                      ツッコミ
                    </ChakraUIText>
                    <Input
                      inputMode="text"
                      placeholder="どういうお笑い"
                      value={commentState}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCommentState(e.target.value)
                      }}
                    />
                  </>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={2}>
                  <ChakraUIText fontSize={'0.8rem'} fontWeight="semibold">
                    テロップ
                  </ChakraUIText>
                  <Input
                    inputMode="text"
                    placeholder="どういうお笑い"
                    value={textState}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTextState(e.target.value)
                    }}
                  />
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={2}>
                  <ChakraUIText fontSize={'0.8rem'} fontWeight="semibold">
                    番組名
                  </ChakraUIText>
                  <Input
                    inputMode="text"
                    placeholder="@TwitterJP"
                    value={titleState}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTitleState(e.target.value)
                    }}
                  />
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Stack height={canvasSize.height + 50}>
            <Box rounded={'lg'} boxSize={{ base: '320px', lg: '640px' }} mt={6}>
              <link
                href="https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@300&display=swap"
                rel="stylesheet"
              />
              <Center h="70%">
                <Stage
                  ref={stageRef}
                  width={canvasSize.width}
                  height={canvasSize.height}
                  listening={false}
                  mt={2}
                >
                  <Layer>
                    <Image
                      image={image}
                      width={canvasSize.width}
                      height={canvasSize.height}
                    />
                    <Wipe
                      image3Status={image3Status}
                      image2={image2}
                      image3={image3}
                      commentState={commentState}
                      width={canvasSize.width}
                    />
                    <Title
                      width={canvasSize.width}
                      image1={image1}
                      titleState={titleState}
                    />
                    <Telop
                      width={canvasSize.width}
                      height={canvasSize.height}
                      textState={textState}
                    />
                  </Layer>
                </Stage>
              </Center>
            </Box>
          </Stack>

          <Stack spacing={4}>
            <Button
              colorScheme="blue"
              onClick={() => {
                const dataURL = convertStageRefToDataUrl(stageRef.current)
                setImageUrl(dataURL)
                onOpen()
              }}
            >
              保存する
            </Button>
            <ShareButton dataUrl={convertStageRefToDataUrl(stageRef.current)} />
          </Stack>
        </Flex>
      </Container>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>画像が生成されました！</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img src={imageUrl} />
          </ModalBody>

          <ModalFooter>
            <Flex width="full" height={50} justify="center" align="center">
              <ShareButton dataUrl={imageUrl} />
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Main
