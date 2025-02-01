'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
    const [name, setName] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');  // State untuk menangani input pencarian
    const [searchResults, setSearchResults] = useState([]);  // State untuk menyimpan hasil pencarian
    const [loading, setLoading] = useState(false);  // State untuk loading
    const [error, setError] = useState(null);  // State untuk error
    const debounceTimeout = useRef(null);  // Menggunakan useRef untuk debounce

    // Mengambil nama pengguna dari localStorage
    useEffect(() => {
        setName(localStorage.getItem("userName"));
    }, [name]);

    // Fungsi untuk menangani perubahan input pencarian dengan debounce
    const handleSearch = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);  // Membatalkan timeout sebelumnya
        }

        if (query.length < 3) { // Hanya lakukan pencarian jika query lebih dari 3 karakter
            setSearchResults([]);
            return;
        }

        // Menunggu 500ms setelah pengguna berhenti mengetik untuk memulai pencarian
        debounceTimeout.current = setTimeout(async () => {
            setLoading(true);  // Menampilkan loading saat mencari
            setError(null);  // Reset error

            try {
                const response = await fetch(`https://apimanga.wocogeh.com/manga/v2/page/1/${query}/`);  // Memanggil API
                const data = await response.json();

                if (data && data.anime_list) {
                    setSearchResults(data.anime_list);  // Simpan hasil pencarian ke state
                } else {
                    setSearchResults([]);  // Jika tidak ada hasil, set ke array kosong
                }
            } catch (err) {
                setError("Terjadi kesalahan saat mengambil data.");  // Tangani error
            } finally {
                setLoading(false);  // Sembunyikan loading
            }
        }, 500);  // 500ms debounce delay
    };

    return (
        <>
            <div className="relative bg-white dark:bg-[#1F242D] p-4 m-auto max-w-[500px]">
                {/* Backdrop blur ketika input fokus */}
                {/* {isFocused && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-10" />
                )} */}

                <div className="mb-5 z-20 flex">
                    <div className="">
                        <p className="text-gray-400 dark:text-gray-300">Selamat datang👋</p>
                        <h3 className="font-semibold text-gray-800 dark:text-white">{name}</h3>
                    </div>
                    <div className="bg-red-500">
                    </div>
                </div>

                <form>
                    <input
                        className="bg-slate-100 dark:bg-[#2D3A47] outline-none text-dark dark:text-white w-full p-4 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 z-30"
                        type="text"
                        placeholder="Cari komik favoritmu!"
                        value={searchQuery}
                        onChange={handleSearch}  // Memanggil fungsi saat ada perubahan input
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </form>

                {/* Menampilkan loading spinner saat pencarian */}
                {loading && (
                    <div className="mt-4 text-center text-gray-500 dark:text-gray-400">Sedang memuat...</div>
                )}

                {/* Menampilkan pesan error jika terjadi kesalahan saat pencarian */}
                {error && (
                    <div className="mt-4 text-center text-red-500">{error}</div>
                )}

                {/* Menampilkan hasil pencarian jika ada */}
                {searchQuery && searchResults.length > 0 && (
                    <div className="mt-4 bg-white dark:bg-[#2D3A47] rounded-lg shadow p-4 z-20">
                        <h4 className="font-semibold text-lg text-gray-800 dark:text-white">Hasil Pencarian</h4>
                        <ul className="mt-2">
                            {searchResults.map((komik, index) => (
                                <Link key={index} href={`/pages/detail/${komik.link}`}>
                                    <li className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-[#161921] rounded-md">
                                        <Image src={komik.img || ''} alt={komik.judul}
                                            width={200} height={200} loading="lazy" className="w-16 h-16 object-cover rounded-md" />
                                        <div className="text-sm">
                                            <h5 className="font-semibold text-gray-800 dark:text-white">{komik.judul}</h5>
                                            <p className="text-gray-500 dark:text-gray-400">{komik.chapter}</p>
                                        </div>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Menampilkan pesan jika tidak ada hasil pencarian */}
                {searchQuery && searchResults.length === 0 && !loading && (
                    <div className="mt-4 bg-white dark:bg-[#2D3A47] rounded-lg shadow p-4 z-20">
                        <p className="text-gray-500 dark:text-gray-400">Tidak ada hasil untuk "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Header;
