'use client'
import MangaProject from "./components/MangaProject";
import MangaUpdate from "./components/MangaUpdate";
import Header from "./components/Header";
import { useEffect, useState } from "react";

export default function Home() {
  
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);
 
  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js');
  }

  return (
    <>
      <Header />
      <MangaProject />
      <MangaUpdate  />
    </>
  );
}
