import { Inter } from "next/font/google"
import "./globals.css";
import Navbar from "./components/Navbar";
import UserNameModal from "./components/UserNameModal";

const interFont = Inter({
  weight:["100","300","400","700","900"],
  subsets:["latin"],
  display:'swap'
})

export const metadata = {
  title: "BacaKomik",
  description: "baca komik online",

};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body
        className={`${interFont.className} antialiase mb-[12vh]`}
      >
          <UserNameModal  />
          <div className="m-auto max-w-[500px]">
            {children}
          </div>
          <Navbar />
      </body>
    </html>
  );
}
