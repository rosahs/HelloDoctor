import { Outfit } from "next/font/google";
import "./globals.css";
import "./layout.css";
import Header from "./_components/header";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "My Doctor",
  description: "My Doctor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <div className="md:px-20">
          <Header />
        {children}

        </div>
      </body>
    </html>
  );
}
