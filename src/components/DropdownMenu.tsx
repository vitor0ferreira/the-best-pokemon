'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiAccountBoxFill } from "react-icons/ri";
import { TbLogout2, TbLogin2 } from "react-icons/tb";
import { signOut, useSession } from 'next-auth/react';

interface User {
  name: string | null | undefined;
  image: string | null | undefined;
  email: string | null | undefined;
};

export default function DropdownMenu () {

  const [isOpen, setIsOpen] = useState(false);
  const user:User = {name:'', image:'', email:''}

  const logout = () => {
    signOut()
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { data, status } = useSession()
  
  if(status == 'authenticated'){
    user.name = data.user?.name
    user.image = data.user?.image
  }

  return (
    <div className="relative inline-block">
      <div className="cursor-pointer rounded-full h-10 w-10" onClick={toggleDropdown}>
        {status == 'authenticated' && user.image ? (<Image
          src={user.image}
          fill
          alt='user photo'
          className='rounded-full'
        />) : <IoPersonCircleSharp color='black' className='w-full h-full'/>}
        
      </div>
      {isOpen ? (
        <div
          className="absolute right-0 mt-2 w-max bg-white border rounded shadow-md z-10"
        >
          {status == 'authenticated' ? 
          (
            <ul>
              <li className="py-2 px-4 hover:bg-gray-100 text-lg">Hi, {user.name}</li>
              <li className="py-2 px-4 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                <RiAccountBoxFill/>
                <a href="/profile">Profile</a>
              </li>
              <li className="py-2 px-4 hover:bg-gray-100 flex items-center gap-2 cursor-pointer" onClick={logout}>
                <TbLogout2/>
                Logout
              </li>
            </ul>
          ) : (
            <ul>
              <li className="py-2 px-4 hover:bg-gray-100 text-xl flex items-center gap-2">
                <a href="/login" className='flex items-center gap-2'>
                  <TbLogin2 className='text-2xl'/>
                  Login
                </a>
              </li>
            </ul>
          )
          
          }
        </div>
      ) : null}
    </div>
  );
};
