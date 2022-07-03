import { Layer, Rect, Stage, Text, Image, Group, Circle } from 'react-konva'
import Konva from 'konva'

export const Title = ({ width, image1, titleState }) => {
  if (titleState === '') {
    return <Group></Group>
  }
  const scale = width / 500
  const fontsize = 22 * scale
  const fontfamily = 'KiWi Maru'
  const text_length = new Konva.Text({
    text: titleState + '    ',
    fontSize: fontsize,
    fontFamily: fontfamily,
  }).textWidth

  return (
    <Group x={width - text_length} y={20 * scale}>
      <Image
        image={image1}
        x={-10*scale - text_length/25}
        y={-10*scale}
        scaleX={(0.00064 * text_length)}
        scaleY={0.15 * scale}
      />
      <Text
        text={titleState}
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
