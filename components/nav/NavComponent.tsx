import LogoLink from "./LogoLink";
import MobileMenuButton from "./MobileMenuButton";
import MobileDrawerContainer from "./MobileDrawerContainer";

function NavComponent() {
  return (
    <div className="sticky top-0 left-0 text-3xl right-0 z-20 bg-[var(--secondary-color)] shadow-sm">
      <div className="flex py-mobileY h-24 px-mobileX justify-between items-center mx-2 sm:mx-4 md:mx-8 lg:mx-3">
        <LogoLink />
        <div className="flex items-center">
          <MobileMenuButton />
        </div>
      </div>

      <MobileDrawerContainer />
    </div>
  );
}

export default NavComponent;
