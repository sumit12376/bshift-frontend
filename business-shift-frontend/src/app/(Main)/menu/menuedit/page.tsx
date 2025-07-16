'use client';

import React from 'react';
import AddMenuPage from '@/features/menuListing/componets/listing/AddMenu';
import { useAtomValue } from 'jotai';
import { GetMenu } from '@/features/menuListing/state/common';

export default function Page() {

  return (
    <div>
 
        <AddMenuPage />
   
    </div>
  );
}
