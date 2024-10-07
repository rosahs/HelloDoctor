import LogoLink from "./LogoLink";
import MobileMenuButton from "./MobileMenuButton";
import MobileDrawerContainer from "./MobileDrawerContainer";

function NavComponent() {
  return (
    <div className="sticky top-0 left-0 right-0 z-20 bg-bgLight">
      <div className="flex py-mobileY px-mobileX justify-between items-center bg-bgLight">
        <LogoLink />
        <MobileMenuButton />
      </div>

      <MobileDrawerContainer />
    </div>
  );
}

export default NavComponent;
