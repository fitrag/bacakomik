'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MangaProject = () => {
    
    const [komik, setKomik] = useState();
    const [komikList, setKomikList] = useState([]);

    const getKomik = async () => {
        const response = await fetch('http://apimanga.wocogeh.com/manga/v2/manga-project');
        const data = await response.json();
        setKomikList(data.anime_list);
        setKomik(data);
    }

    useEffect(() => {
        getKomik();
    }, []);

    return(
        <>
        <h3 className="text-lg font-semibold px-3">Manga Project</h3>
        <div className="flex overflow-x-auto bg-white">
            {
                komikList.map((komik, index) => (
                    <div className="p-4 w-[200px]" key={index}>
                        <Link href={`/manga/${komik.link}`}>
                            <div className="relative">
                                <h3 className="text-sm absolute top left bg-blue-500 p-2 rounded-md text-white font-semibold">{komik.chapter}</h3>
                                <Image src={komik.img} alt={komik.judul} width={250} height={400} className="rounded-lg w-[250px] h-[200px]" loading="lazy"/>
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