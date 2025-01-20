'use client'

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const Detail = () => {
    const params = useParams()
    const slug = params.slug
    
    const [komik, setKomik] = useState({})
    const [chapter, setChapter] = useState([])
    const [favorit, setFavorit] = useState([])
    const [isFavorit, setIsFavorit] = useState(false) // Menyimpan status apakah komik sudah di favoritkan

    // Mengambil detail komik berdasarkan slug
    const getDetail = async() => {
        const get = await fetch(`http://apimanga.wocogeh.com/manga/v2/detail/${slug}`)
        const res = await get.json()
        console.log(res.chapter_list)
        setKomik(res)
        setChapter(res.chapter_list)
    }

    // Mengambil data favorit dari localStorage
    useEffect(() => {
        getDetail()
        const storedFavorit = JSON.parse(localStorage.getItem('favoritKomik')) || []
        setFavorit(storedFavorit)

        // Cek apakah komik sudah ada di favorit
        const isAlreadyFavorit = storedFavorit.some(fav => fav.slug === slug)
        setIsFavorit(isAlreadyFavorit)
    }, [slug])

    // Menambah komik ke favorit
    const addToFavorit = (komik) => {
        // Cek jika komik sudah ada di favorit
        const isAlreadyFavorit = favorit.some(fav => fav.slug === komik.slug)

        if (!isAlreadyFavorit) {
            // Menambahkan slug ke objek komik yang akan disimpan ke localStorage
            const komikFavorit = { ...komik, slug: slug }
            const updatedFavorit = [...favorit, komikFavorit]
            setFavorit(updatedFavorit)
            localStorage.setItem('favoritKomik', JSON.stringify(updatedFavorit))
            setIsFavorit(true) // Mengubah status tombol menjadi sudah ditambahkan
        } else {
            alert('Komik ini sudah ada di favorit!')
        }
    }

    const bgImage = {
        backgroundImage: `url("${komik.img}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    return (
        <>
        <div style={bgImage} className="h-[450px] relative">
            <div className="absolute z-0 top-[0px] bottom-[0px] right-[0px] left-[0px] bg-gradient-to-t from-cyan-500 to-transparent">
                <div className="p-4">
                    <Link href={'/'}>
                    <div className="text-white bg-cyan-400 opacity-50 inline-block p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    </Link>
                </div>
            </div>
            <div className="absolute flex justify-between w-full bottom-0 z-10 items-center text-white p-4">
                <div className="">
                    <h1 className="font-bold text-2xl">
                        {komik.title}
                    </h1>
                    <p>{komik.author}</p>
                </div>
                <div className="p-2">
                    <div className="cursor-pointer" onClick={() => !isFavorit ? addToFavorit(komik) : ''}>
                        { isFavorit ? 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9">
                            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                          </svg>                          
                        : 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className="p-5">
            <div className="bg-gray-100 rounded-full justify-around items-center flex p-4 text-gray-400">
                <div className="flex gap-x-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    {komik.released}
                </div>
                <div className="flex gap-x-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                    </svg>
                    {komik.status}
                </div>
                <div className="flex gap-x-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                    </svg>
                    {komik.type}
                </div>
            </div>
        </div>
        <div className="p-4">
            <h3 className="font-semibold text-lg">Sinopsis</h3>
            <p className="text-gray-500 font-light">
                {komik.sinopsis}
            </p>
        </div>
        <div className="p-4">
            <div className="bg-slate-100 rounded-lg">
                <h3 className="p-3 font-semibold text-md border-b text-gray-500">List Chapter</h3>
                <div className="h-[50vh] overflow-y-auto">
                    { 
                        chapter.map((c, index) => (
                        <Link href={`/pages/baca/${c.chapter_link}`} key={index}>
                            <div className="p-4 border-b text-gray-400 flex gap-x-3">
                                    <div className="bg-gray-200 p-3 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                                        </svg>
                                    </div>
                                    <div className="font-normal">
                                        <h3 className="">
                                            {c.chapter_name}
                                        </h3>
                                        <p className="text-sm">
                                            {c.chapter_up}
                                        </p>
                                    </div>
                                    <div className=""></div>
                            </div>
                        </Link>
                        ))
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default Detail;
