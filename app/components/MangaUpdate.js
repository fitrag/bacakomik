'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MangaUpdate = () => {
    
    const [komik, setKomik] = useState();
    const [komikList, setKomikList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getKomik = async () => {
        const apiUrl = 'https://apimanga.wocogeh.com/manga/v2/manga-update';

        // Cek apakah data ada di cache terlebih dahulu
        const cachedKomikList = await caches.match(apiUrl);
        if (cachedKomikList) {
            // Jika data ada di cache, ambil data dan tampilkan
            const cachedData = await cachedKomikList.json();
            setKomikList(cachedData.anime_list);
            setLoading(false);
        } else {
            // Jika data tidak ada di cache, lakukan fetch dari API
            const response = await fetch(apiUrl);
            const data = await response.json();
            setKomikList(data.anime_list);
            setLoading(false);

            // Cache data yang baru didapat untuk akses offline
            caches.open('komikdata').then((cache) => {
                cache.put(apiUrl, new Response(JSON.stringify(data)));
            });
        }
    };

    useEffect(() => {
        getKomik();
    }, []);

    return (
        <>
            <h3 className="text-lg font-semibold px-3">Baru ditambahkan</h3>
            <div className="grid grid-cols-2 bg-white p-2">
                {
                    loading ? 
                    <>
                        <div className="animate-pulse p-2">
                            <div className="rounded-lg bg-slate-200 h-[250px] w-full"></div>
                            <div className="rounded-lg bg-slate-200 h-3 w-full mt-2"></div>
                            <div className="rounded-lg bg-slate-200 h-3 w-[8vw] mt-2"></div>
                        </div> 
                        {/* Add other loading skeletons here */}
                    </>
                    : komikList.map((komik, index) => (
                        <div className="w-[180px] sm:w-[250px] p-3" key={index}>
                            <Link href={`/pages/detail/${komik.link}`}>
                                <Image 
                                    src={komik.img} 
                                    alt={komik.judul} 
                                    width={300} 
                                    height={200} 
                                    objectFit="cover" 
                                    objectPosition="center" 
                                    className="rounded-lg h-[250px] object-cover object-center" 
                                    loading="lazy"
                                />
                                <h1 className="text-sm font-semibold truncate text-ellipsis mt-1">{komik.judul}</h1>
                                <h1 className="text-sm mt-2">{komik.chapter}</h1>
                                <h1 className="text-sm">{komik.chapter_update}</h1>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default MangaUpdate;
