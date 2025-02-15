import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-wrap bg-white">
      <div className="w-full lg:w-full rounded-3xl bg-white p-6 mb-8">
        <div className="flex items-center justify-between text-black mb-8">
          <p className="text-2xl font-bold">Home</p>
        </div>
        <div className="max-w-full">
          {/* Section */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8 border border-gray-300 transition-transform transform hover:scale-105">
            <div className="relative rounded-xl overflow-hidden bg-white text-gray-700 shadow-lg" style={{ height: '500px' }}>
              <Image
                src="/images/logo.png"
                alt="Revolutionizing Our Production Process"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-start h-full bg-white text-gray-700">
              <p className="text-2xl font-light leading-normal mb-4">IDEA</p>
              <a href="#" className="text-xl font-semibold leading-snug text-blue-gray-900 mb-2 normal-case transition-colors hover:text-gray-700">Description</a>
              <p className="text-base leading-relaxed mb-8 font-normal text-gray-500">Description.....</p>
            </div>
          </div>

          {/* Second Section */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8 border border-gray-300 transition-transform transform hover:scale-105">
            <div className="relative rounded-xl overflow-hidden bg-white text-gray-700 shadow-lg" style={{ height: '500px' }}>
              <Image
                src="/images/logo.png"
                alt="Revolutionizing Our Production Process"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-start h-full bg-white text-gray-700">
              <p className="text-2xl font-light leading-normal mb-4">IDEA</p>
              <a href="#" className="text-xl font-semibold leading-snug text-blue-gray-900 mb-2 normal-case transition-colors hover:text-gray-700">Description</a>
              <p className="text-base leading-relaxed mb-8 font-normal text-gray-500">Description.....</p>
            </div>
          </div>

          {/* Third Section */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8 border border-gray-300 transition-transform transform hover:scale-105">
            <div className="relative rounded-xl overflow-hidden bg-white text-gray-700 shadow-lg" style={{ height: '500px' }}>
              <Image
                src="/images/logo.png"
                alt="Revolutionizing Our Production Process"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-start h-full bg-white text-gray-700">
              <p className="text-2xl font-light leading-normal mb-4">IDEA</p>
              <a href="#" className="text-xl font-semibold leading-snug text-blue-gray-900 mb-2 normal-case transition-colors hover:text-gray-700">Description</a>
              <p className="text-base leading-relaxed mb-8 font-normal text-gray-500">Description.....</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
