import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6">
      <div className="grid grid-cols-1 gap-8 py-12 transition-colors duration-150 border-b border-t border-zinc-800 lg:grid-cols-12 ">
        <div className="col-span-1 lg:col-span-2">
          <Link
            href="/"
            className="flex items-center flex-initial font-bold md:mr-24"
          >
            <span className="mr-2">
              <Image src="/logo.png" width={45} height={45} alt="logo" />
            </span>
            <span className="text-sm">Company Name</span>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col flex-initial md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="transition duration-150 ease-in-out hover:text-zinc-600"
              >
                Home
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/#pricing"
                className="transition duration-150 ease-in-out hover:text-zinc-600"
              >
                Pricing
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/#features"
                className="transition duration-150 ease-in-out hover:text-zinc-600"
              >
                Features
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/#faq"
                className="transition duration-150 ease-in-out hover:text-zinc-600"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col flex-initial md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <p className="font-bold transition duration-150 ease-in-out">
                LEGAL
              </p>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/privacy-policy"
                className="transition duration-150 ease-in-out hover:text-zinc-600"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/tos"
                className="transition duration-150 ease-in-out hover:text-zinc-600"
              >
                Terms of Services
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-12 space-y-4 md:flex-row ">
        <div>
          <span>
            &copy; {new Date().getFullYear()} Company Name, Inc. All rights
            reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
