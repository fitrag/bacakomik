'use client'
import { useEffect, useState } from "react"

const Header = () => {
    const [name, setName]   = useState('')
    useEffect(() => {
        setName(localStorage.getItem("userName"))
    },[name])
    return(
        <>
            <div className="bg-white p-4 m-auto max-w-[500px]">
                <div className="mb-5">
                    <p className="text-gray-400">Selamat datang👋</p>
                    <h3 className="font-semibold">{name}</h3>
                </div>
                <form>
                    <input className="bg-slate-100 outline-none text-dark w-full p-4 rounded-lg" type="text" placeholder="Cari komik favoritmu!"/>
                </form>
            </div>
        </>
    )
}

export default Header