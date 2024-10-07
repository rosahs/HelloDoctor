"use client";

import { useDrawerStore } from "@/store/drawerStore";
import { GiHamburgerMenu } from "react-icons/gi";

function MobileMenuButton() {
  const { openDrawer } = useDrawerStore();

  return (
    <button
      className="absolute right-2 top-2 p-2 text-dark-hover"
      onClick={openDrawer}
    >
      <GiHamburgerMenu size={24} />
    </button>
  );
}

export default MobileMenuButton;
