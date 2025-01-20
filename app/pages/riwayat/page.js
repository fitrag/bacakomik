'use client'

import { useEffect, useState } from "react";
import Link from "next/link";

const Riwayat = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("readingHistory")) || [];
    const sortedHistory = storedHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    setHistory(sortedHistory);
  }, []);

  return (
    <div className="">
    <div className="bg-white flex py-4 gap-x-2 items-center border-b text-center">
        {/* <div className="cursor-pointer" onClick={()=> window.history.back()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
            </svg>
        </div> */}
        <div className="flex-1 text-center">
            Riwayat Membaca
        </div>
    </div>
      <div>
        {history.length === 0 ? (
          <p className="text-gray-500">Belum ada riwayat membaca komik.</p>
        ) : (
          <ul>
            {history.map((item, index) => (
              <li key={index} className="p-4 border-b">
                <Link href={`/pages/baca/${item.slug}`}>
                <div className="flex items-center gap-x-3">
                    <div className="text-2xl text-gray-400">
                        {index+1}
                    </div>
                    <div className="">
                        {item.title}
                        <br />
                        <small className="text-gray-500">{new Date(item.timestamp).toLocaleString()}</small>
                    </div>
                </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Riwayat;
