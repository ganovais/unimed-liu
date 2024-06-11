import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import MobileMenuButton from "./MobileMenuButton";
import NavigationLinks from "./NavigationLinks";
import MobileMenu from "./MobileMenu";
import { api } from "@/lib/api";

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleMakeLogout()  {
    const { data } = await api.post('/logout')
    if(!data?.error) {
      router.push('/')
      return
    }
    toast.error('Erro ao fazer logout')  
  }

  return (
    <header className="bg-white shadow-md">
      <nav
        className="bg-primaryDark mx-auto flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 items-center">
          <Image
            src="/Unimed_box_logo.svg"
            alt="Logo da empresa"
            width={200}
            height={40}
            className="hover:opacity-80 transition-opacity duration-300"
          />
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavigationLinks />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button
            variant="default"
            size="default"
            onClick={handleMakeLogout}
            className="text-sm font-semibold leading-6 text-white"
          >
            Sair <span aria-hidden="true">&rarr;</span>
          </Button>
        </div>
        <div className="flex lg:hidden">
          <MobileMenuButton onClick={() => setMobileMenuOpen(true)} />
        </div>
      </nav>
      <MobileMenu open={mobileMenuOpen} onClose={setMobileMenuOpen} makeLogout={handleMakeLogout}/>
    </header>
  );
}
