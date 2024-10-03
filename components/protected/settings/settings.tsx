import { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

interface LinkItem {
  href: string;
  label: string;
}

interface settingsProps {
  links: LinkItem[];
}

const Settings: FC<settingsProps> = ({ links }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-bgLight p-4 shadow-lg max-w-full w-full pt-8">
      {/* Header with close icon */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-textDark">
          Settings
        </h2>
        <button className="text-textDark hover:text-textDark/80">
          <AiOutlineClose className="w-6 h-6" />
        </button>
      </div>

      {/* Links */}
      <nav className="flex flex-col space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-textGray hover:text-textGray/70"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Settings;
