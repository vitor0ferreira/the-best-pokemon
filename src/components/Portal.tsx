'use client'

import { useState, useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

export default function Portal({ children }: PortalProps) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    
    ref.current = document.querySelector<HTMLElement>("#modal-root");
    setMounted(true);
  }, []);

  
  return mounted && ref.current ? createPortal(children, ref.current) : null;
}