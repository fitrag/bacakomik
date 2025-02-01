'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Favorit = () => {
  // State untuk menyimpan komik favorit
  const [favoritKomik, setFavoritKomik] = useState([]);

  // Mengambil komik favorit dari localStorage
  useEffect(() => {
    const storedFavorit = JSON.parse(localStorage.getItem("favoritKomik")) || [];
    setFavoritKomik(storedFavorit);
  }, []);

  // Fungsi untuk menghapus komik dari favorit
  const removeFromFavorit = (slug) => {
    const updatedFavorit = favoritKomik.filter((komik) => komik.slug !== slug);
    setFavoritKomik(updatedFavorit);
    // Simpan perubahan ke localStorage
    localStorage.setItem("favoritKomik", JSON.stringify(updatedFavorit));
  };

  return (
    <>
      {/* Header */}
      <div className="bg-white flex py-4 gap-x-2 items-center border-b text-center dark:bg-[#1F242D] dark:text-gray-300 dark:border-gray-600">
        <div className="flex-1 text-center">
          Komik Favorit
        </div>
      </div>

      {/* Jika belum ada komik favorit */}
      {favoritKomik.length === 0 ? (
        <p className="text-center text-gray-500 h-screen items-center flex justify-center">
          Belum ada komik favorit.
        </p>
      ) : (
        // Menampilkan daftar komik favorit
        <div className="grid grid-cols-2 gap-4">
          {favoritKomik.map((komik, index) => (
            <div className="w-[180px] sm:w-[250px] p-3" key={index}>
              <div className="relative">
                <Link href={`/pages/detail/${komik.slug}`}>
                  <Image
                    src={komik.img}
                    alt={komik.title}
                    width={300}
                    height={200}
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-lg h-[250px] object-cover object-center"
                    loading="lazy"
                  />
                </Link>

                {/* Tombol untuk menghapus komik dari favorit */}
                <button
                  onClick={() => removeFromFavorit(komik.slug)}
                  className="absolute top-2 right-2 text-white bg-red-500 p-1 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Menampilkan detail komik */}
              <h1 className="text-sm font-semibold truncate text-ellipsis mt-2">
                {komik.title}
              </h1>
              <p className="text-sm">{komik.chapter}</p>
              <p className="text-sm">{komik.chapter_update}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Favorit;
