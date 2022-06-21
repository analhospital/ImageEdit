// import { Temp } from "../components/temp";
import dynamic from "next/dynamic";

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
