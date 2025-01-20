'use client'
import Link from "next/link"
import { usePathname } from "next/navigation";

const Navbar = () => {

    const currentPath = usePathname();

    return(
        <>
            <nav className="fixed bottom-0 p-4 left-0 right-0 flex gap-x-auto justify-around items-center bg-white text-gray-400 m-auto max-w-[500px] flex-wrap">
                <div className={ currentPath === '/' ? 'text-white bg-sky-600 p-2 rounded-md' : 'text-dark p-2 rounded-md'}>
                    <Link href='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                        </svg>
                    </Link>
                </div>
                <div className={ currentPath.startsWith('/pages/favorit') ? 'text-white bg-sky-600 p-2 rounded-md' : 'text-dark p-2 rounded-md'}>
                    <Link href='/pages/favorit' replace>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                        <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                    </svg>
                    </Link>
                </div>
                <div className={ currentPath.startsWith('/pages/riwayat') ? 'text-white bg-sky-600 p-2 rounded-md' : 'text-dark p-2 rounded-md'}>
                    <Link href='/pages/riwayat' replace>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </nav>
        </>
    )

}

export default Navbar