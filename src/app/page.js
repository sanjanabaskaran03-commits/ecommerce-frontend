"use client";

import { useEffect, useState } from 'react';
import HomePage from "@/src/app/components/homePage/page";
import List from '@/src/app/shop/page';
import Details from './detail/page';

export default function RootPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user_data');
    if (user) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (loading) return null; 

  // If not logged in, show the Login page directly at "/"
  // if (!isLoggedIn) {
  //   return <LoginPage />;
  // }

  // If logged in, show the actual Homepage
  return(
    <>
    <HomePage />
    </>
  )
}