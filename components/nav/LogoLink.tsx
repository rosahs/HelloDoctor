import Link from "next/link";
import { FaBriefcaseMedical } from "react-icons/fa";

function LogoLink() {
  return (
    <div className="text-[1.8rem] text-black
     font-semibold text-3xl text-dark-hover ml-8">
      <Link href="/" className="flex items-center">
        HelloDoctor 
        <FaBriefcaseMedical className="ml-2" />
      </Link>
    </div>
  );
}

export default LogoLink;
