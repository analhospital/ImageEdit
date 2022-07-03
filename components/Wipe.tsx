import { Layer, Rect, Stage, Text, Image, Group, Circle } from 'react-konva'
import Konva from 'konva'

export const Wipe = ({ image3Status, image2, image3, commentState, width }) => {
  const scale = width / 500
  const radius = 40 * scale
  const waku_ratio = 0.1
  function RoundedImage() {
    if (image3Status !== 'loaded') {
      return <Group></Group>
    } else {
      return (
        <Group
          clipFunc={(ctx) => {
            ctx.beginPath()
            ctx.arc(radius, radius, radius, 0, Math.PI * 2, true)
          }}
        >
          <Image width={radius * 2} height={radius * 2} image={image3} />
        </Group>
      )
    }
  }
  function WipeText() {
    const fontsize = 18 * scale
    const fontfamily = 'Kiwi Maru'
    const text_length = new Konva.Text({
      text: commentState + '    ',
      fontSize: fontsize,
      fontFamily: fontfamily,
    }).textWidth
    if (commentState === '') {
      return <Group></Group>
    } else {
      return (
        <Group x={20 * scale} y={95*scale}>
          <Image
            image={image2}
            x={-5 * scale - text_length * 0.05}
            y={-11 * scale}
            scaleX={0.002 * text_length}
            scaleY={0.3*scale}
          />
          <Text
            text={commentState}
            fontSize={fontsize}
            fontFamily={fontfamily}
            align="left"
            stroke="#000"
            strokeWidth={1.0}
            fill="#000"
          />
        </Group>
      )
    }
  }
  return (
    <Group x={15*scale} y={20*scale}>
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
  )
}
