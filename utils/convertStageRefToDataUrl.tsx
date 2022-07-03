export const convertStageRefToDataUrl = (stageRefCurrent) => {
  if (!stageRefCurrent) return
  const dataUrl = stageRefCurrent.toDataURL({
    mimeType: 'image/jpeg',
    quality: 0,
    pixelRatio: window.devicePixelRatio,
  })
  return dataUrl
}
