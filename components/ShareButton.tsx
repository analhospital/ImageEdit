import { Button } from '@chakra-ui/react'

const handleWebShare = (stageRefCurrent) => {
  if (!stageRefCurrent) return
  const dataURL = stageRefCurrent.toDataURL({
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
    text: '#テロップつくるくん https://image-edit-khaki.vercel.app/',
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

export const ShareButton = ({ stageRefCurrent }) => {
  if (!navigator.canShare) {
    // console.log('cannnot share (for PC)')
    return <></>
  } else {
    const checkShare = new File(['check'], 'check', { type: 'image/png' })
    if (navigator.canShare({ files: [checkShare] })) {
      // console.log('can share (for mobile)')
      return (
        <Button
          colorScheme="blue"
          onClick={() => {
            handleWebShare(stageRefCurrent)
          }}
        >
          みんなに見せる
        </Button>
      )
    } else {
      // 古いバージョンだとfilesで画像がシェアできない
      // console.log('cannot share (for old mobile)')
      return <></>
    }
  }
}
