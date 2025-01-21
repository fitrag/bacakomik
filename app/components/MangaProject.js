'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MangaProject = () => {
    
    const [komik, setKomik] = useState();
    const [komikList, setKomikList] = useState([]);
    const [loading, setLoading] = useState(true)

    const getKomik = async () => {
        const response = await fetch('https://apimanga.wocogeh.com/manga/v2/manga-project');
        const data = await response.json();
        setKomikList(data.anime_list);
        setKomik(data);
        setLoading(false)
    }

    useEffect(() => {
        getKomik();
    }, []);

    return(
        <>
        <h3 className="text-lg font-semibold px-3">Manga Project</h3>
        <div className="flex overflow-x-auto bg-white">
            {
                loading ? 
                <>
                <div className="animate-pulse p-2 w-[350px]">
                    <div className="rounded-lg bg-slate-200 h-[150px] w-full"></div>
                    <div className="rounded-lg bg-slate-200 h-3 w-full mt-2"></div>
                    <div className="rounded-lg bg-slate-200 h-3 w-[8vw] mt-2"></div>
                </div>
                <div className="animate-pulse p-2 w-[350px]">
                    <div className="rounded-lg bg-slate-200 h-[150px] w-full"></div>
                    <div className="rounded-lg bg-slate-200 h-3 w-full mt-2"></div>
                    <div className="rounded-lg bg-slate-200 h-3 w-[8vw] mt-2"></div>
                </div>
                <div className="animate-pulse p-2 w-[350px]">
                    <div className="rounded-lg bg-slate-200 h-[150px] w-full"></div>
                    <div className="rounded-lg bg-slate-200 h-3 w-full mt-2"></div>
                    <div className="rounded-lg bg-slate-200 h-3 w-[8vw] mt-2"></div>
                </div>
                <div className="animate-pulse p-2 w-[350px]">
                    <div className="rounded-lg bg-slate-200 h-[150px] w-full"></div>
                    <div className="rounded-lg bg-slate-200 h-3 w-full mt-2"></div>
                    <div className="rounded-lg bg-slate-200 h-3 w-[8vw] mt-2"></div>
                </div>
                <div className="animate-pulse p-2 w-[350px]">
                    <div className="rounded-lg bg-slate-200 h-[150px] w-full"></div>
                    <div className="rounded-lg bg-slate-200 h-3 w-full mt-2"></div>
                    <div className="rounded-lg bg-slate-200 h-3 w-[8vw] mt-2"></div>
                </div>
                </>
             :
                komikList.map((komik, index) => (
                    <div className="p-4 w-[200px]" key={index}>
                        <Link href={`/pages/detail/${komik.link}`}>
                            <div className="relative">
                                <h3 className="text-sm absolute top left bg-blue-500 p-2 rounded-md text-white font-semibold">{komik.chapter}</h3>
                                <Image src={komik.img} alt={komik.judul} width={200} height={200} className="rounded-lg w-[200px] object-cover h-[200px]" loading="lazy"/>
                            </div>
                            <h1 className="text-sm font-semibold truncate text-ellipsis mt-1">{komik.judul}</h1>
                            <h3 className="text-sm truncate text-ellipsis">{komik.chapter_update}</h3>
                        </Link>
                    </div>
                ))
            }
        </div>
        </>
    )

};

export default MangaProject;