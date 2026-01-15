import Image from 'next/image';

const Features = () => {
  return (
    <div
      id="features"
      className="mb-10 lg:mb-20 p-10 flex flex-col justify-center"
    >
      <h1 className="text-4xl text-center font-extrabold dar:text-white sm:text-center sm:text-6xl mb-16">
        Features
      </h1>

      <div
        id="features"
        className="flex gap-4 flex-wrap justify-center max-w-[1250px] mb-20"
      >
        <div className="p-6 rounded-2xl w-full lg:w-[400px] flex flex-col items-center justify-between border border-grey-400 bg-gradient-to-tr from-sky-950 to-gray-700 dark:to-black">
          <Image
            src="/illustrations/ai.svg"
            width={290}
            height={200}
            alt=""
            className="mb-10"
          />
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">Feature Name</h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis perferendis quia architecto quibusdam sed saepe totam,
              vel sapiente praesentium id?
            </p>
          </div>
        </div>
        <div className="p-6 rounded-2xl w-full lg:w-[400px] flex flex-col items-center justify-between border border-grey-400 bg-gradient-to-tr from-purple-950 to-gray-700 dark:to-black">
          <Image
            src="/illustrations/auth.svg"
            width={200}
            height={200}
            alt=""
            className="mb-10"
          />
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">Feature Name</h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis perferendis quia architecto quibusdam sed saepe totam,
              vel sapiente praesentium id?
            </p>
          </div>
        </div>
        <div className="p-6 rounded-2xl w-full lg:w-[400px] flex flex-col items-center justify-between border border-grey-400 bg-gradient-to-tr from-green-950 to-gray-700 dark:to-black">
          <Image
            src="/illustrations/payments.svg"
            width={300}
            height={200}
            alt=""
            className="mb-10"
          />
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">Feature Name</h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis perferendis quia architecto quibusdam sed saepe totam,
              vel sapiente praesentium id?
            </p>
          </div>
        </div>
        <div className="p-6 rounded-2xl w-full lg:w-[400px] flex flex-col items-center justify-between border border-grey-400 bg-gradient-to-tr from-cyan-950 to-gray-700 dark:to-black">
          <Image
            src="/illustrations/landing.svg"
            width={300}
            height={200}
            alt=""
            className="mb-10"
          />
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">Feature Name</h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis perferendis quia architecto quibusdam sed saepe totam,
              vel sapiente praesentium id?
            </p>
          </div>
        </div>
        <div className="p-6 rounded-2xl w-full lg:w-[400px] flex flex-col items-center justify-between border border-grey-400 bg-gradient-to-tr from-red-950 to-gray-700 dark:to-black">
          <Image
            src="/illustrations/seo.svg"
            width={300}
            height={200}
            alt=""
            className="mb-10"
          />
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">Feature Name</h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis perferendis quia architecto quibusdam sed saepe totam,
              vel sapiente praesentium id?
            </p>
          </div>
        </div>
        <div className="p-6 rounded-2xl w-full lg:w-[400px] flex flex-col items-center justify-between border border-grey-400 bg-gradient-to-tr from-blue-950 to-gray-700 dark:to-black">
          <Image
            src="/illustrations/database.svg"
            width={230}
            height={200}
            alt=""
            className="mb-10"
          />
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">Feature Name</h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis perferendis quia architecto quibusdam sed saepe totam,
              vel sapiente praesentium id?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
