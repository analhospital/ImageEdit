import { Layer, Rect, Stage, Text, Image, Group, Circle } from 'react-konva'
import Konva from 'konva'

export const Telop = ({ width, height, textState }) => {
  const fontsize = 35
  const fontfamily = "'YuMincho', 'Yu Mincho', 'serif'"
  const fontstyle = 'italic'
  const r = 180
  const g = 0
  const b = 0
  const shadowcolor = `rgb(${r}, ${g}, ${b})`
  const text_length = new Konva.Text({
    text: textState,
    fontSize: fontsize,
    fontFamily: fontfamily,
    fontStyle: fontstyle,
  }).textWidth
  const strokecolor = `rgba(${r}, ${g}, ${b}, 0.2)`
  const fillcolor = `rgba(255, 255, 255, 1)`
  const scaleX = Math.min(1, (width * 0.9) / text_length)

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
  )
}
