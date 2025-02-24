"use client"

import { useTheme } from "../context/theme-context";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button 
            className="md:w-[3rem] md:h-[3rem] w-[2.5rem] h-[2.5rem] 
            bg-opacity-80 backdrop-blur-[0.5rem] border border-gray-200 border-opacity-40 shadow-2xl rounded-full 
            flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
            onClick={toggleTheme}
        >
            {theme === "dark" ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="md:w-[1.5rem] md:h-[1.5rem] w-[1.2rem] h-[1.2rem]"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="md:w-[1.5rem] md:h-[1.5rem] w-[1.2rem] h-[1.2rem]"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                </svg>
            )}
        </button>
    );
}