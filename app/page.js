import Image from "next/image";
import MangaProject from "./components/MangaProject";
import MangaUpdate from "./components/MangaUpdate";

export default function Home() {
  return (
    <>
      <MangaProject />
      <MangaUpdate  />
    </>
  );
}
