import { Layer, Rect, Stage, Text, Image, Group, Circle } from 'react-konva'
import Konva from 'konva'

export const Wipe = ({ image3Status, image2, image3, commentState, width }) => {
  const radius = width / 12
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
    const fontsize = 18
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
        <Group x={(radius * 2) / 3} y={radius * 2}>
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
      )
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
  )
}
