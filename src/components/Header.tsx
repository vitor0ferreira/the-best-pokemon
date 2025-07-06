'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import DropdownMenu from './DropdownMenu'; 

export default function Header() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* ----- NAVEGAÇÃO DESKTOP ----- */}
      <header className="h-max w-full bg-white items-center justify-center flex-col gap-1 px-2 py-2 hidden sm:flex sm:flex-row sm:gap-4 md:justify-evenly xl:justify-between xl:px-10">
        <span className="italic font-extrabold text-red-600 text-2xl whitespace-nowrap sm:text-3xl md:text-4xl">
          <Link href="/">The Best Pokemon</Link>
        </span>
        <nav className="flex items-center font-semibold text-lg gap-1 sm:gap-2 sm:text-xl">
          <Link href="/" className="hover:bg-red-600 hover:text-white px-2 py-1 rounded-md">Home</Link>
          <Link href="/catalogue" className="hover:bg-red-600 hover:text-white px-2 py-1 rounded-md">Pokédex</Link>
          <Link href="/ranking" className="hover:bg-red-600 hover:text-white px-2 py-1 rounded-md">Rankings</Link>
          <DropdownMenu />
        </nav>
      </header>

      {/* ----- NAVEGAÇÃO MOBILE ----- */}
      <header className="sm:hidden w-full bg-white p-4 flex justify-between items-center sticky top-0 z-40 shadow-md">
         <span className="italic font-extrabold text-red-600 text-2xl">
          <Link href="/">The Best Pokemon</Link>
        </span>
         <button onClick={() => setIsMobileMenuOpen(true)} className="text-3xl" aria-label="Abrir menu">
            <FiMenu />
         </button>
      </header>

      {/* ----- MENU OVERLAY MOBILE ----- */}
      {isMobileMenuOpen && (
          <nav className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-8">
              <button onClick={closeMenu} className="absolute top-5 right-5 text-4xl text-red-600" aria-label="Fechar menu">
                  <FiX/>
              </button>
              <Link onClick={closeMenu} href="/" className="text-4xl font-bold hover:text-red-600">Home</Link>
              <Link onClick={closeMenu} href="/catalogue" className="text-4xl font-bold hover:text-red-600">Pokédex</Link>
              <Link onClick={closeMenu} href="/ranking" className="text-4xl font-bold hover:text-red-600">Rankings</Link>
              <div className="mt-4" onClick={closeMenu}>
                <DropdownMenu />
              </div>
          </nav>
      )}
    </>
  );
}