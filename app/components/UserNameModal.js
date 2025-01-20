'use client'

import { useState, useEffect } from 'react';

const UserNameModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');

  // Cek apakah nama sudah ada di localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (!storedName) {
      setIsModalOpen(true); // Tampilkan modal jika nama belum ada
    }
  }, []);

  // Menyimpan nama ke localStorage
  const handleSaveName = () => {
    if (userName) {
      localStorage.setItem('userName', userName);
      setIsModalOpen(false); // Menutup modal setelah nama disimpan
    }
  };

  // Menangani perubahan input nama
  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <>
      {/* Modal jika isModalOpen true */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 z-50 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h2 className="text-lg font-bold text-center mb-4">Masukkan Nama Anda</h2>
            <input
              type="text"
              placeholder="Nama Anda"
              value={userName}
              onChange={handleInputChange}
              className="w-full p-4 mb-4 border rounded-lg border-gray-300 outline-none"
            />
            <div className="flex justify-center">
              <button
                onClick={handleSaveName}
                className="bg-blue-500 text-white p-3 rounded-lg w-full"
              >
                Simpan Nama
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserNameModal;