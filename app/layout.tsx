import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Inside the Data Center — Interactive Academy",description:"Explore a data center, open its systems, and learn through chapters, practice and built-in flashcards.",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
