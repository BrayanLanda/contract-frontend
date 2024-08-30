import Image from "next/image";
import bg from "@/public/bg.png";
import Link from "next/link";

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Contract Smarth"
      />
      <div className="relative z-10 text-center">
        <h1 className="text-6xl text-primary-50 mb-10 tracking-tight font-normal">Welcome to Contract</h1>
        <Link 
          href="/about"
          className="bg-primary-200 px-8 py-6 text-slate-950 text-lg font-semibold hover:bg-primary-950 transition-all"
        >
          About
        </Link>
      </div>
    </main>
  );
}
