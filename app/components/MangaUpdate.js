'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

const MangaUpdate = () => {
    
    const [komik, setKomik] = useState();
    const [komikList, setKomikList] = useState([]);

    const getKomik = async () => {
        const response = await fetch('http://apimanga.wocogeh.com/manga/v2/manga-update');
        const data = await response.json();
        setKomikList(data.anime_list);
        setKomik(data);
    }

    useEffect(() => {
        getKomik();
    }, []);

    return(
        <>
        <h3 className="text-lg font-semibold px-3">Baru ditambahkan</h3>
        <div className="grid grid-cols-2 bg-white p-2">
            {
                komikList.map((komik, index) => (
                    <div className="w-[180px] lg:w-[250px] p-2" key={index}>
                        <Image src={komik.img} alt={komik.judul} width={400} height={400} objectFit="cover" objectPosition="center" className="rounded-lg h-[250px] object-cover w-[200px] lg:w-[350px] object-center" loading="lazy"/>
                        <h1 className="text-sm font-semibold truncate text-ellipsis mt-1">{komik.judul}</h1>
                        <h1 className="text-sm mt-2">{komik.chapter}</h1>
                        <h1 className="text-sm">{komik.chapter_update}</h1>
                    </div>
                ))
            }
        </div>
        </>
    )

};

export default MangaUpdate;