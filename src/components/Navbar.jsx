import { useState } from "react";
import { IKImage } from 'imagekitio-react';
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {

    // state of mobile menu
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full h-16 md:h-20 flex items-center justify-between">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
                <Image src="logo.png" alt="logo" w={32} h={32} />
                <span>phlog</span>
            </Link>
            {/* MOBILE MENU */}
            <div className="md:hidden">
                {/* MOBILE LIST BUTTON */}
                <div>
                    {open
                        ? (<img src="/close.png" alt="close" className="w-8 h-8 cursor-pointer" onClick={() => setOpen((prev) => !prev)} />
                        )
                        : (<img src="/hamburger.png" alt="menu" className="w-8 h-8 cursor-pointer" onClick={() => setOpen((prev) => !prev)} />
                        )
                    }
                </div>
                {/* MOBILE LINK LIST */}
                <div className={`${open ? "-right-0" : "right-[-100%]"} 
                                transition-all duration-300 ease-in-out w-full h-screen 
                                flex flex-col items-center justify-center absolute top-16 gap-8 font-medium text-lg`}
                >
                    <Link to="/">Home</Link>
                    <Link to="/">Trending</Link>
                    <Link to="/">Most Popular</Link>
                    <Link to="/">About</Link>
                    <Link to="/">
                        <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 👋</button>
                    </Link>

                </div>
            </div>
            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
                <Link to="/">Home</Link>
                <Link to="/">Trending</Link>
                <Link to="/">Most Popular</Link>
                <Link to="/">About</Link>

                <SignedOut>
                    <Link to="/login">
                        <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 👋</button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default Navbar