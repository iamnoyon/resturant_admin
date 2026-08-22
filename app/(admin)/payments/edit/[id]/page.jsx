'use client';

import React from 'react';
import { useParams } from 'next/navigation';

const page = () => {
  const params = useParams();
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
      <h2 className="text-lg font-semibold text-[#043570]">Edit Payment</h2>
      <p className="mt-2 text-sm text-gray-500">
        TODO: Payment edit form for id: {params?.id}
      </p>
    </div>
  );
};

export default page;
