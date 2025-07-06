// src/components/DropdownMenu.tsx
'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiAccountBoxFill } from "react-icons/ri";
import { TbLogout2, TbLogin2 } from "react-icons/tb";
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

interface User {
  name: string | null | undefined;
  image: string | null | undefined;
};

export default function DropdownMenu () {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  // Função para fazer o logout
  const handleSignOut = async (e: React.MouseEvent) => {
    // 1. Previne que o clique se propague e feche o menu prematuramente
    console.log("signOut");
    e.stopPropagation(); 
    await signOut({ callbackUrl: '/' });
  };
  
  // Função para abrir/fechar o dropdown
  const toggleDropdown = (e: React.MouseEvent) => {
    // 2. Também é uma boa prática parar a propagação aqui
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };
  
  // Efeito para fechar o menu quando clicar fora
  useEffect(() => {
    const closeDropdown = () => setIsOpen(false);
    
    if (typeof window !== 'undefined') {
      window.addEventListener("click", closeDropdown);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("click", closeDropdown);
      }
    };
  }, []);

  const user: User | null = status === 'authenticated' ? session.user as User : null;

  return (
    <div className="ml-2 relative inline-block z-[999]">
      <div onClick={toggleDropdown} className="cursor-pointer rounded-full h-10 w-10 relative hover:ring-2 ring-red-200 hover:brightness-75">
        {user?.image ? (
          <Image
            src={user.image}
            fill
            sizes='40px'
            alt='user photo'
            className='rounded-full'
          />
        ) : <IoPersonCircleSharp color='black' className='w-full h-full'/>}
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-max bg-white border rounded shadow-md z-10"
          onClick={(e) => e.stopPropagation()} // Previne fechamento ao clicar dentro
        >
          {status === 'authenticated' ? (
            <ul>
              <li className="py-2 px-4 text-lg">Hi, {user?.name}</li>
              <li className="py-2 px-4 hover:bg-gray-100 flex items-center gap-2">
                <RiAccountBoxFill/>
                <Link href="/profile">Profile</Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-100 flex items-center gap-2 cursor-pointer" onClick={handleSignOut}>
                <TbLogout2/>
                Logout
              </li>
            </ul>
          ) : (
            <ul>
              <li className="py-2 px-4 hover:bg-gray-100 text-xl">
                <Link href="/login" className='flex items-center gap-2'>
                  <TbLogin2 className='text-2xl'/>
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};