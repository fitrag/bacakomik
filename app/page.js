import Image from "next/image";
import MangaProject from "./components/MangaProject";
import MangaUpdate from "./components/MangaUpdate";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <MangaProject />
      <MangaUpdate  />
    </>
  );
}
