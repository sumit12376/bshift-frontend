"use client";
import React, { useEffect, useState } from 'react';
import Placeorder from '@/features/placeOrders/placeorder';

function Page() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <div>
      <Placeorder cart={cart} />
    </div>
  );
}

export default Page;
