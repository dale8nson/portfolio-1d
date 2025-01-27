import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";


export default function Home() {

  return (
    <div className="bg-[#011627] border-[#1E2D3D] border-solid border-[1px] w-full h-full rounded-3xl flex flex-col justify-between items-center overflow-clip">
      <Header />
      <Main />
      <About/>
      <Footer />
    </div>
  );
}
