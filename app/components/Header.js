const Header = () => {
    return(
        <>
            <div className="bg-white p-4 m-auto max-w-[500px]">
                <div className="mb-5">
                    <p className="text-gray-400">Selamat datang👋</p>
                    <h3 className="font-semibold">Fadila Fitra Kusuma Jaya</h3>
                </div>
                <form>
                    <input className="bg-slate-100 outline-none text-dark w-full p-4 rounded-lg" type="text" placeholder="Cari komik favoritmu!"/>
                </form>
            </div>
        </>
    )
}

export default Header