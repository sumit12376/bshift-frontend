'use client';

import React from 'react';
import RestaurantDetailsPage from '@/features/menuListing/componets/listing/row-groups';
import { useAtomValue } from 'jotai';
import { GetMenu } from '@/features/menuListing/state/common';

export default function Page() {

  return (
    <div>
 
        <RestaurantDetailsPage />
   
    </div>
  );
}
