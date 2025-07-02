'use client'
import { NewRestaurantModal } from '@/features/restaurants-listing/components/modals-drawer/restaurant-new-modal'
import React from 'react'
import Headerfilter from '@/features/restaurants-listing/components/listing/header-filter'
import { RowGroups } from '@/features/restaurants-listing/components/listing/row-groups'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function Page() {
    const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
  <h1>Restaurant</h1>
      <NewRestaurantModal/>
      <Headerfilter/>
      <RowGroups/>
    </div>
  )
}
