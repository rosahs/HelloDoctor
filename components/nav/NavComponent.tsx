"use client";

import { useState } from "react";
import LogoLink from "./LogoLink";
import MobileMenuButton from "./MobileMenuButton";
import MobileDrawer from "./MobileDrawer";

function NavComponent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="sticky top-0 left-0 right-0 z-20 bg-bgLight">
      <div className="flex py-mobileY px-mobileX justify-between items-center bg-bgLight">
        <LogoLink />
        <MobileMenuButton onClick={openDrawer} />
      </div>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
    </div>
  );
}

export default NavComponent;
