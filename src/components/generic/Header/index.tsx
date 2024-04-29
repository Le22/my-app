"use client";

import { Button } from "@/components/ui/button";
import { QrCode, ShoppingBasket } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const Header = () => {
  const pass = useMemo(() => {
    return typeof window !== "undefined" && localStorage.getItem("pass");
  }, []);

  const session = useSession();

  console.log(session);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between py-4 w-full bg-white">
      <Link href="/" title="Paris 2024">
        <Image
          src="/assets/paris-2024-logo-primary.png"
          alt="Paris 2024 Logo"
          width={24}
          height={24}
          priority
        />
      </Link>

      {session.status !== "authenticated" ? (
        <div className="flex gap-4 items-center">
          <Button variant={"secondary"} asChild>
            <Link href="/ticketing" title="Billetterie">
              Billetterie
            </Link>
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            className="relative"
            asChild
          >
            <Link href="/basket" title="Panier">
              <ShoppingBasket />
              {pass && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              )}
            </Link>
          </Button>
        </div>
      ) : (
        <div>
          <Button onClick={() => signOut()}>logout</Button>
          <Button
            variant={"outline"}
            size={"icon"}
            className="relative"
            asChild
          >
            <Link href="/ticket" title="Ticket">
              <QrCode />
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
