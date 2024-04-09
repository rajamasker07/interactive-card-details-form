import Image from "next/image";
import Container from "./components/container";
import bgMainDesktop from '@/public/assets/bg-main-desktop.png';

export default function Home() {
  return (
    <>

      <div className="w-screen h-screen grid grid-rows-[1fr_2fr] md:grid-cols-[1fr_2fr] absolute z-0">
        <Image src={bgMainDesktop} alt="bg" className="md:h-screen h-3/4 "/>
        <div></div>
      </div>

      <main className="flex flex-col absolute z-[1] w-screen h-screen md:place-items-center md:place-content-center">
        <Container/>
      </main>
    </>
    
  );
}
