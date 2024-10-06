import Link from "next/link";

function LogoLink() {
  return (
    <div className="text-[1.4rem] font-semibold text-dark-hover">
      <Link href="/">HelloDoctor</Link>
    </div>
  );
}

export default LogoLink;
