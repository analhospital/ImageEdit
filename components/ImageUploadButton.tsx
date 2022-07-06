import { Box, Input, Flex, Button } from '@chakra-ui/react'

import { useRef } from 'react'
import { AddIcon } from '@chakra-ui/icons'

export const ImageUploadButton = ({ handleFileChange, label }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        type="file"
        onChange={handleFileChange}
        // accept=".png,.PNG,.jpg,.jpeg,.JPG,.JPEG"
        // multiple
        ref={inputRef}
        style={{ display: 'none' }}
      />

      <Button
        leftIcon={<AddIcon />}
        onClick={() => {
          if (!inputRef.current) return
          inputRef.current.click()
        }}
        colorScheme="teal"
      >
        {label}
      </Button>
    </>
  )
}
