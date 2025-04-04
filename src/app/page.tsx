// src/app/page.tsx
"use client";

import React from 'react';
import { Promo } from '@/components/layout/promo';

export default function HomePage() {
  return (
    <div>
      <main className="py-8">
        <Promo></Promo>
      </main>
      {/* Footer */}
    </div>
  );
}