import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Layer, Rect, Stage, Text, Image, Group, Circle } from 'react-konva'
import useImage from 'use-image'
import {
  Text as ChakraUIText,
  useDisclosure,
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

  // const handleWebShare = () => {
  //   if (!stageRef.current) return
  //   const dataURL = stageRef.current.toDataURL({
  //     mimeType: 'image/jpeg',
  //     quality: 0,
  //     pixelRatio: window.devicePixelRatio,
  //   })
  //   const toBlob = (base64) => {
  //     const decodedData = atob(base64.replace(/^.*,/, ''))
  //     const buffers = new Uint8Array(decodedData.length)
  //     for (let i = 0; i < decodedData.length; i++) {
  //       buffers[i] = decodedData.charCodeAt(i)
  //     }
  //     try {
  //       const blob = new Blob([buffers.buffer], {
  //         type: 'image/png',
  //       })
  //       return blob
  //     } catch (e) {
  //       return null
  //     }
  //   }

  //   const blob = toBlob(dataURL)
  //   if (!blob) return
  //   const imageFile = new File([blob], 'image.png', {
  //     type: 'image/png',
  //   })
  //   const shareData = {
  //     text: '#テロップつくるくん https://image-edit-khaki.vercel.app/',
  //     files: [imageFile],
  //   }

  //   navigator
  //     .share(shareData)
  //     .then(() => {
  //       console.log('Share was successful.')
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  // const ShareButton = () => {
  //   if (!navigator.canShare) {
  //     // console.log('cannnot share (for PC)')
  //     return <></>
  //   } else {
  //     const checkShare = new File(['check'], 'check', { type: 'image/png' })
  //     if (navigator.canShare({ files: [checkShare] })) {
  //       // console.log('can share (for mobile)')
  //       return (
  //         <Button
  //           colorScheme="blue"
  //           onClick={() => {
  //             handleWebShare()
  //           }}
  //         >
  //           みんなに見せる
  //         </Button>
  //       )
  //     } else {
  //       // 古いバージョンだとfilesで画像がシェアできない
  //       // console.log('cannot share (for old mobile)')
  //       return <></>
  //     }
  //   }
  // }

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

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = React.useState(
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  )

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
          <Tabs isFitted variant="enclosed" defaultIndex={1} mb={6}>
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
                      onChange={commentChange}
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
                    onChange={textChange}
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
                    onChange={titleChange1}
                  />
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Stack
            height={canvasSize.height + 50}
            justify={'center'}
            align={'center'}
          >
            <Box rounded={'lg'} boxSize={{ base: '320px', lg: '640px' }} mt={6}>
              <link
                href="https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@300&display=swap"
                rel="stylesheet"
              />
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
            <Button
              colorScheme="blue"
              onClick={() => {
                handleSaveImage()
                onOpen()
              }}
            >
              保存する
            </Button>
            <ShareButton stageRefCurrent={stageRef.current} />
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
            <Flex width="full" height={50} justify="center" align="center">
              <ShareButton stageRefCurrent={stageRef.current} />
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Main
