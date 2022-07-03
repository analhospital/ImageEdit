import dynamic from 'next/dynamic'

//SSRでエラーになるのを回避している
let Main = dynamic(() => import('../components/Main'), {
  ssr: false,
})

const Index = () => {
  return (
    <>
      <Main />
    </>
  )
}
export default Index
