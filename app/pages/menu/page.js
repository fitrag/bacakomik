'use client'
import Header from "@/app/components/Header";
import InstallButton from "@/app/components/InstallButton";

const Menu = () => {
  return (
    <>
        <div className="bg-white flex py-4 gap-x-2 items-center border-b text-center dark:bg-[#1F242D] dark:text-gray-300 dark:border-gray-600">
            {/* <div className="cursor-pointer" onClick={()=> window.history.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                </svg>
            </div> */}
            <div className="flex-1 text-center">
                Menu
            </div>
        </div>
        <InstallButton  />
    </>
  );
};

export default Menu;
