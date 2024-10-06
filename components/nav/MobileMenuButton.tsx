import { GiHamburgerMenu } from "react-icons/gi";

function MobileMenuButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      className="absolute right-2 top-2 p-2 text-dark-hover"
      onClick={onClick}
    >
      <GiHamburgerMenu size={24} />
    </button>
  );
}

export default MobileMenuButton;
