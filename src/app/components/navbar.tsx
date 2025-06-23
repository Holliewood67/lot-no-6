"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavBar(){
    const [open, setOpen] = useState(false);
    return (
        <header className="flex w-full items-center border-b-2 border-white">
            <div className="container">
                <div className="flex items-center justify-between mx-auto p-4 lg:text-3xl">
                    <Link href={"/"} className="flex items-center gap-4 justify-between" >
                        <Image  src="/logo.png" alt="Lot No. 6 Logo" width={100} height={50}/>
                    </Link>
                    {/* Mobile Bar Toggle*/}
                    <button
                        onClick={() => setOpen(!open)} 
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg hover:bg-gray-600 focus:outline-none ring-2 focus:ring-gray-600 md:hidden">
                        <span className="sr-only">Open Menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                        {/* Full Nav */}
                        <nav className="hidden md:flex p-4 w-full ">
                            <ul className="flex w-full justify-around lg:justify-normal gap-6 lg:gap-10 p-4">
                                <li className=""><Link href={"/"} className=" hover:text-gray-700">Home</Link></li>
                                <li className=""><Link href={"/events"} className=" hover:text-gray-700">Events</Link></li>
                                <li className=""><Link href={"/#featured"} className=" hover:text-gray-700">Featrued Artist</Link></li>
                                <li className=""><Link href={"/#about"} className=" hover:text-gray-700">About</Link></li>
                                <li className=""><Link href="/#contact" className="hover:text-gray-700">Contact</Link></li>
                            </ul>
                        </nav>
                </div>
                {/* Mobile Nav Dropdown */}
                <div className={`${open ? "block" : "hidden"} w-full`}>
                    <nav>
                        <ul className="border-t-2 md:hidden">
                            <li className="p-4 border-b-2"><Link href={"/"} className="hover:text-gray-700">Home {">"}</Link></li>
                            <li className="p-4 border-b-2"><Link href={"/events"} className="hover:text-gray-700">Events {">"}</Link></li>
                            <li className="p-4 border-b-2"><Link href={"/#featured"} className="hover:text-gray-700">Featured Artist {">"}</Link></li>
                            <li className="p-4 border-b-2"><Link href={"/#about"} className="hover:text-gray-700">About {">"}</Link></li>
                            <li className="p-4"><Link href="/#contact" className=" hover:text-gray-700">Contact {">"}</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}