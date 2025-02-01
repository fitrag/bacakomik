'use client'

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Baca = () => {
  const params = useParams();
  const slug = params.slug;

  const [chapters, setChapters] = useState([]);
  const [komik, setKomik] = useState([]);
  const [loading, setLoading] = useState(true)
  const [loadingImage, setLoadingImage] = useState(true)

  // Mendapatkan daftar chapter dari API
  const getChapter = async () => {
    const get = await fetch(`https://apimanga.wocogeh.com/manga/v2/chapter/${slug}`);
    const res = await get.json();

    if ('caches' in window) {
      caches.open('chapter-komik').then((cache) => {
        cache.add(new Request(`https://apimanga.wocogeh.com/manga/v2/chapter/${slug}`)); // Add the chapter to cache
      });
    }

    setChapters(res.chapter);
    setKomik(res);
    saveReadingHistory(res)
    setLoading(false)
  };

  const handleImageLoad = () => {
    setLoadingImage(false)
  }

  useEffect(() => {
    getChapter();
  }, []);

  // Menyimpan chapter yang sedang dibaca ke localStorage
  const saveReadingHistory = (chapter) => {
    const history = JSON.parse(localStorage.getItem("readingHistory")) || [];

    // Cek jika chapter sudah ada di riwayat
    const existingChapter = history.find(item => item.slug === slug && item.title === chapter.judul);

    if (!existingChapter) {
      history.push({
            title: chapter.judul,
            slug: slug,
            timestamp: new Date().toISOString(),
      });

      if (history.length > 10) {
        history.shift(); // Hapus item pertama jika lebih dari 10
      }

      // Simpan kembali ke localStorage
      localStorage.setItem("readingHistory", JSON.stringify(history));
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-[#1F242D] flex py-4 gap-x-2 items-center border-b dark:border-gray-700">
        <div className="cursor-pointer" onClick={() => window.history.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="truncate text-ellipsis w-full text-gray-700 dark:text-white">
          {
            loading ?
            <div className="animate-pulse">
                <div className="rounded-lg bg-slate-200 dark:bg-slate-600 h-3 w-full"></div>
            </div>
            :
            komik.judul
          }
        </div>
      </div>

      {chapters.map((chapter, index) => (
        <div key={index} className="my-4">
          <div>
            {loadingImage && 
            <div className="animate-pulse p-2">
                <div className="rounded-lg bg-slate-200 dark:bg-slate-600 h-[150px] w-full"></div>
            </div>}
            <Image
              src={chapter.chapter_image}
              width={200}
              height={200}
              layout="responsive"
              loading="lazy"
              onLoadingComplete={handleImageLoad}
              alt={komik.judul}
            />
          </div>
        </div>
      ))}

      <div className="flex justify-between gap-x-2">
        {komik.prevlink && 
        <Link href={`/pages/baca/${komik.prevlink}`}>
          <div className="w-full bg-red-500 text-white p-4 rounded-lg hover:bg-red-600 transition-all">
            Sebelumnya
          </div>
        </Link>}
        {komik.nextlink && 
        <Link href={`/pages/baca/${komik.nextlink}`}>
          <div className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-all">
            Selanjutnya
          </div>
        </Link>}
      </div>
    </>
  );
};

export default Baca;
