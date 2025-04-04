// app/layout.tsx
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/reactQueryClient";
import "@/app/globals.css";
import Header from "@/components/layout/Header"; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
        <Header /> 
          <main>{children}</main> 
        </QueryClientProvider>
      </body>
    </html>
  );
}
