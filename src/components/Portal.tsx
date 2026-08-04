'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

export default function Portal({ children }: PortalProps) {
  const containerRef = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');
    containerRef.current = modalRoot || document.body;
    setMounted(true);
  }, []);

  if (!mounted || !containerRef.current) {
    return null;
  }

  return createPortal(children, containerRef.current);
}