'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MangaUpdate = () => {
    
    const [komik, setKomik] = useState();
    const [komikList, setKomikList] = useState([]);
    const [loading, setLoading] = useState(true)

    const getKomik = async () => {
        const response = await fetch('http://apimanga.wocogeh.com/manga/v2/manga-update');
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
                    <div className="animate-pulse p-2">
                        <div className="rounded-lg bg-slate-200 h-[250px] w-full"></div>
                        <div className="rounded-lg bg-slate-200 h-3 w-full mt-2"></div>
                        <div className="rounded-lg bg-slate-200 h-3 w-[8vw] mt-2"></div>
                    </div> 
                    <div className="animate-pulse p-2">
                        <div className="rounded-lg bg-slate-200 h-[250px] w-full"></div>
                        <div className="rounded-lg bg-slate-200 h-3 w-full mt-2"></div>
                        <div className="rounded-lg bg-slate-200 h-3 w-[8vw] mt-2"></div>
                    </div> 
                    <div className="animate-pulse p-2">
                        <div className="rounded-lg bg-slate-200 h-[250px] w-full"></div>
                        <div className="rounded-lg bg-slate-200 h-3 w-full mt-2"></div>
                        <div className="rounded-lg bg-slate-200 h-3 w-[8vw] mt-2"></div>
                    </div> 
                    <div className="animate-pulse p-2">
                        <div className="rounded-lg bg-slate-200 h-[250px] w-full"></div>
                        <div className="rounded-lg bg-slate-200 h-3 w-full mt-2"></div>
                        <div className="rounded-lg bg-slate-200 h-3 w-[8vw] mt-2"></div>
                    </div> 
                    <div className="animate-pulse p-2">
                        <div className="rounded-lg bg-slate-200 h-[250px] w-full"></div>
                        <div className="rounded-lg bg-slate-200 h-3 w-full mt-2"></div>
                        <div className="rounded-lg bg-slate-200 h-3 w-[8vw] mt-2"></div>
                    </div> 
                </>
              : komikList.map((komik, index) => (
                    <div className="w-[180px] sm:w-[250px] p-3" key={index}>
                        <Link href={`/pages/detail/${komik.link}`}>
                            <Image src={komik.img} alt={komik.judul} width={300} height={200} objectFit="cover" objectPosition="center" className="rounded-lg h-[250px] object-cover object-center" loading="lazy"/>
                            <h1 className="text-sm font-semibold truncate text-ellipsis mt-1">{komik.judul}</h1>
                            <h1 className="text-sm mt-2">{komik.chapter}</h1>
                            <h1 className="text-sm">{komik.chapter_update}</h1>
                        </Link>
                    </div>
                ))
            }
        </div>
        </>
    )

};

export default MangaUpdate;