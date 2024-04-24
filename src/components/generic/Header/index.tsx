import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="absolute top-0 z-50 flex items-center justify-between px-4 py-4 w-full bg-white">
      <Image
        src="/assets/paris-2024-logo-primary.png"
        alt="Paris 2024 Logo"
        width={24}
        height={24}
        priority
      />
      <Button variant={"secondary"} asChild>
        <Link href="/ticketing" title="Billetterie">
          Billetterie
        </Link>
      </Button>
    </header>
  );
};

export default Header;
