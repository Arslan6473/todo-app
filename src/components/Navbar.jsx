"use client"; // ✅ Convert to a Client Component

import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => { 
  const { data: session } = useSession();

  return (
    <nav className="h-14 sticky z-[100] top-0 inset-x-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center w-full justify-between border-b border-zinc-200">
          <Link href="/" className="z-40 flex font-semibold">
            Todo<span className="text-green-600">App</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {session && (
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            ) }
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
