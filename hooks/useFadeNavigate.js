'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useFadeNavigate(duration = 1000) {
  const [isLeaving, setIsLeaving] = useState(false);
  const router = useRouter();

  const fadeNavigate = (href) => {
    setIsLeaving(true);
    setTimeout(() => {
      router.push(href);
    }, duration);
  };

  return { isLeaving, fadeNavigate };
}