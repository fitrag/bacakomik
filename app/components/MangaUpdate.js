'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CACHE_EXPIRATION_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds

const MangaUpdate = () => {
    const [komikList, setKomikList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getKomik = async () => {
        const apiUrl = 'https://apimanga.wocogeh.com/manga/v2/manga-update';

        // Cek apakah kode berjalan di browser
        if (typeof window === 'undefined' || typeof caches === 'undefined') {
            console.warn('Caches API is not available. Fetching data directly...');
            fetchData(apiUrl);
            return;
        }

        // Cek apakah data ada di cache terlebih dahulu
        try {
            const cache = await caches.open('komikdata');
            const cachedResponse = await cache.match(apiUrl);
            const currentTime = Date.now();

            if (cachedResponse) {
                const cachedTime = Number(cachedResponse.headers.get('X-Cache-Time'));

                if (cachedTime && currentTime - cachedTime < CACHE_EXPIRATION_TIME) {
                    // Jika cache masih valid, ambil data dari cache
                    const cachedData = await cachedResponse.json();
                    setKomikList(cachedData.anime_list);
                    setLoading(false);
                    return;
                } else {
                    // Jika cache sudah kadaluwarsa, fetch ulang dan perbarui cache
                    console.log('Cache expired. Fetching new data...');
                }
            }
        } catch (cacheError) {
            console.warn('Failed to access cache:', cacheError);
        }

        // Jika data tidak ada di cache atau sudah kadaluwarsa, fetch ulang
        fetchData(apiUrl);
    };

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setKomikList(data.anime_list);
            setLoading(false);

            // Cache data yang baru didapat untuk akses offline
            if (typeof caches !== 'undefined') {
                caches.open('komikdata').then((cache) => {
                    const cacheResponse = new Response(JSON.stringify(data), {
                        headers: { 'X-Cache-Time': String(Date.now()) },
                    });
                    cache.put(url, cacheResponse);
                });
            }
        } catch (err) {
            console.error('Failed to fetch:', err);

            // Jika aplikasi offline, coba tampilkan data dari cache jika ada
            if (typeof caches !== 'undefined') {
                const cache = await caches.open('komikdata');
                const cachedResponse = await cache.match(url);
                if (cachedResponse) {
                    const cachedData = await cachedResponse.json();
                    setKomikList(cachedData.anime_list);
                    setLoading(false);
                } else {
                    setLoading(false);
                    setKomikList([]); // Kosongkan data jika tidak ada di cache
                }
            } else {
                setLoading(false);
                setKomikList([]);
            }
        }
    };

    useEffect(() => {
        getKomik();
    }, []);

    return (
        <>
            <h3 className="text-lg font-semibold px-3 text-gray-800 dark:text-white py-3">Baru ditambahkan</h3>
            <div className="grid grid-cols-2 bg-white p-2 dark:bg-[#1F242D]">
                {loading ? (
                    <>
                        <div className="animate-pulse p-2">
                            <div className="rounded-lg bg-slate-200 dark:bg-slate-600 h-[250px] w-full"></div>
                            <div className="rounded-lg bg-slate-200 dark:bg-slate-600 h-3 w-full mt-2"></div>
                            <div className="rounded-lg bg-slate-200 dark:bg-slate-600 h-3 w-[8vw] mt-2"></div>
                        </div>
                        {/* Add other loading skeletons here */}
                    </>
                ) : (
                    komikList.map((komik, index) => (
                        <div className="w-[180px] sm:w-[250px] p-3" key={index}>
                            <Link href={`/pages/detail/${komik.link}`} replace>
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
                                <h1 className="text-sm font-semibold truncate text-ellipsis mt-1 text-gray-800 dark:text-white">{komik.judul}</h1>
                                <h1 className="text-sm mt-2 text-gray-500 dark:text-gray-400">{komik.chapter}</h1>
                                <h1 className="text-sm text-gray-500 dark:text-gray-400">{komik.chapter_update}</h1>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default MangaUpdate;