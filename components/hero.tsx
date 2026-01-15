import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="top min-h-screen mb-0 pt-10 lg:pt-20">
      <div className="top-content p-5 lg:p-20 lg:pt-12 flex flex-col items-center pb-10">
        <div className="flex flex-col items-center animate-fade-down animate-delay-300">
          <h1 className="font-extrabold text-5xl lg:text-8xl  mb-8 max-w-[970px] text-center bg-gradient-to-r from-purple-500 to-black dark:to-white inline-block text-transparent bg-clip-text">
            Lorem ipsum dolor sit amet.
          </h1>
          <h2 className="text-xl lg:text-2xl mb-10 text-center max-w-[660px] ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
            obcaecati accusamus sint fugiat, provident fugit.
          </h2>
        </div>
        <div className="flex flex-col items-center animate-fade-down animate-delay-700">
          <Link href="#pricing" className="mb-20">
            <Button
              variant={'hero'}
              size={'lg'}
              className="font-bold rounded-3xl text-lg"
            >
              See Pricing
            </Button>
          </Link>

          <div>
            <div className="flex gap-10 flex-wrap justify-center sm:flex-wrap">
              <Image
                src="/company-logos/next-js.svg"
                height={50}
                width={45}
                alt="next-js"
                className="dark:invert"
              />
              <Image
                src="/company-logos/supabase.png"
                height={50}
                width={45}
                alt="supabase"
              />
              {/* <Image src="/company-logos/product-hunt.svg" height={50} width={45} alt="product-hunt" /> */}
              <Image
                src="/company-logos/openai-2.svg"
                height={50}
                width={45}
                alt="openai"
                className="dark:invert"
              />
              <Image
                src="/company-logos/typescript.svg"
                height={50}
                width={45}
                alt="typescript"
              />
              <Image
                src="/company-logos/vercel-icon-light.svg"
                height={50}
                width={45}
                alt="vercel"
                className="invert dark:invert-0"
              />
              <Image
                src="/company-logos/stripe-2.svg"
                height={50}
                width={45}
                alt="stripe"
              />
              <Image
                src="/company-logos/react-2.svg"
                height={50}
                width={45}
                alt="react"
              />
              <Image
                src="/company-logos/tailwind-css-2.svg"
                height={50}
                width={45}
                alt="tailwind"
              />
              <Image
                src="/company-logos/postgresql.svg"
                height={50}
                width={45}
                alt="postgresql"
              />
              <Image
                src="/company-logos/logo-javascript.svg"
                height={50}
                width={45}
                alt="logo-javascript"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
