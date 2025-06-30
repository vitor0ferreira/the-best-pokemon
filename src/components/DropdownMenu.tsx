'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiAccountBoxFill } from "react-icons/ri";
import { TbLogout2, TbLogin2 } from "react-icons/tb";
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

interface User {
  name: string | null | undefined;
  image: string | null | undefined;
  email: string | null | undefined;
};

export default function DropdownMenu () {

  useEffect(()=>{
    if(typeof window != undefined){
      const closeDropdown = () => setIsOpen(false);
      document.body.addEventListener("click", closeDropdown);
      return () => document.body.removeEventListener("click", closeDropdown);
    }
  }, []);
  

  const [isOpen, setIsOpen] = useState(false);
  const user:User = {name:'', image:'', email:''};

  const logout = () => {
    signOut({ callbackUrl: '/' });
  }

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const { data, status } = useSession();
  
  if(status == 'authenticated'){
    user.name = data.user?.name;
    user.image = data.user?.image;
  }

  return (
    <div className="ml-2 relative inline-block z-[999]" onClick={toggleDropdown}>
      <div className="cursor-pointer rounded-full h-10 w-10 relative hover:ring-2 ring-red-200 hover:brightness-75">
        {status == 'authenticated' && user.image ? (<Image
          src={user.image}
          fill
          sizes='(max-width: 768px) 100vw'
          alt='user photo'
          className='rounded-full'
        />) : <IoPersonCircleSharp color='black' className='w-full h-full'/>}
        
      </div>
      {isOpen ? (
        <div
          className="absolute right-0 mt-2 w-max bg-white border rounded shadow-md z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {status == 'authenticated' ? 
          (
            <ul>
              <li className="py-2 px-4 text-lg">Hi, {user.name}</li>
              <li className="py-2 px-4 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                <RiAccountBoxFill/>
                <Link href="/profile">Profile</Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-100 flex items-center gap-2 cursor-pointer" onClick={logout}>
                <TbLogout2/>
                Logout
              </li>
            </ul>
          ) : (
            <ul>
              <li className="py-2 px-4 hover:bg-gray-100 text-xl flex items-center gap-2">
                <Link href="/login" className='flex items-center gap-2'>
                  <TbLogin2 className='text-2xl'/>
                  Login
                </Link>
              </li>
            </ul>
          )
          }
        </div>
      ) : null}
    </div>
  );
};