"use client";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { TrpcProvider } from "@/utils/trpc-provider";
import { type Session } from "next-auth";

interface RootLayoutProps {
  children: React.ReactNode;
  session: Session;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </head>
        <body
          className={cn(
            "bg-background min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          {/* <SessionProvider session={session}> */}
              <TrpcProvider>{children}</TrpcProvider>
          {/* </SessionProvider> */}
        </body>
      </html>
    </>
  );
}
