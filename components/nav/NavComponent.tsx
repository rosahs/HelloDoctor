import LogoLink from "./LogoLink";
import MobileMenuButton from "./MobileMenuButton";
import MobileDrawerContainer from "./MobileDrawerContainer";

function NavComponent() {
  return (
    <div className="sticky top-0 left-0 text-3xl right-0 z-20 bg-black bg-opacity-100">
      <div className="flex py-mobileY h-20 px-mobileX justify-between items-center mx-2 sm:mx-4 md:mx-8 lg:mx-3">
        <LogoLink />
        <MobileMenuButton />
      </div>

      <MobileDrawerContainer />
    </div>
  );
}

export default NavComponent;
