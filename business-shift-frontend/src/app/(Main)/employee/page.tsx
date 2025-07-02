'use client';
import { DeleteEmployee } from "@/features/employee-listing/components/listing/modals-drawer/employee-delete-modals";
import { RowGroups } from "@/features/employee-listing/components/listing/row-groups";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { UpdateEmployee } from "@/features/employee-listing/components/listing/modals-drawer/employee-update-modal";
import HeaderFilter from "@/features/employee-listing/components/listing/header-filter";

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
      <h1>Employee</h1>
      <HeaderFilter/>
      <DeleteEmployee/>
      <RowGroups />
      <UpdateEmployee/>
    </div>
  );
}

