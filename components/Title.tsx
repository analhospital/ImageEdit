import { Layer, Rect, Stage, Text, Image, Group, Circle } from 'react-konva'
import Konva from 'konva'

export const Title = ({ width, image1, titleState }) => {
  if (titleState === '') {
    return <Group></Group>
  }
  const fontsize = 22
  const fontfamily = 'KiWi Maru'
  const text_length = new Konva.Text({
    text: titleState + '    ',
    fontSize: fontsize,
    fontFamily: fontfamily,
  }).textWidth

  const text_length_sum = 40 + (titleState !== '' ? text_length - 29 : 0)

  return (
    <Group x={width - text_length_sum}>
      <Image
        image={image1}
        x={0}
        y={1}
        scaleX={(0.1 * text_length) / 164}
        scaleY={0.15}
        scale={width * 0.8}
      />
      <Text
        text={titleState}
        x={14}
        y={14}
        fontSize={fontsize}
        fontFamily={fontfamily}
        align="left"
        stroke="#000"
        strokeWidth={1.5}
        fill="#000"
      />
    </Group>
  )
}
