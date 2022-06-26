import dynamic from "next/dynamic";

//SSRでエラーになるのを回避している
let Temp = dynamic(() => import("../components/temp"), {
  ssr: false,
});

const Index = () => {
  return (
    <>
      <Temp />
    </>
  );
};
export default Index;
