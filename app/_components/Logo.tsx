import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

const Logo = () => {
  return (
    <Link href="/" className="felx items-center gap-4 z-10">
      <Image
        src={logo}
        height="60"
        width="60"
        quality={100}
        alt="Contract Smarth"
      />
      <span className="text-xl font-semibold text-primary-100">Contract</span>
    </Link>
  );
};

export default Logo;