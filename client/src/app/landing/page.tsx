"use client";
import { RootState } from "@/lib/store";
import {useRouter,redirect} from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";


export default function LandingPage() {
  // useEffect(() => {
  //   console.log('Component mounted');
  //   return () => {
  //     console.log('Component unmounted');
  //   };
  // }, []);
const router=useRouter();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // router.prefetch('/login');
    // router.prefetch('/register');
    console.log("Auth state changed:", authState);
    if (authState.authState) {
      if (authState.userType === 'Startup') {
        router.push("/dashboardStartup");
      } else if (authState.userType === 'Investor') {
        router.push("/dashboardInvestor");
      }
    }
  }, [authState, router]);
    return (<div >
      
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.9.2/tailwind.min.css"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n        @media(max-width:1520px) {\n            .left-svg {\n                display: none;\n            }\n        }\n\n        /* small css for the mobile nav close */\n        #nav-mobile-btn.close span:first-child {\n            transform: rotate(45deg);\n            top: 4px;\n            position: relative;\n            background: #a0aec0;\n        }\n\n        #nav-mobile-btn.close span:nth-child(2) {\n            transform: rotate(-45deg);\n            margin-top: 0px;\n            background: #a0aec0;\n        }\n    "
          }}
        />
        <header className="relative z-70 w-full h-24">
          <div className="container flex items-center justify-center h-full max-w-8xl px-8 mx-auto sm:justify-between xl:px-0">
            <a
              href="/"
              className="relative flex items-center  h-5  font-black leading-none"
            >
              <img
                src="images\logo.png"
                alt="Startup Connect Logo"
                className="w-auto h-6"
              />
              <span className="ml-1 text-2xl text-gray-800">
              LaunchPad<span className="text-pink-500">.</span>
              </span>
            </a>
            <nav
              id="nav"
              className="absolute top-0 left-0 z-50 flex flex-col items-center justify-between  w-full h-64 pt-5 mt-24 text-sm text-gray-800 bg-white border-t border-gray-200 md:w-auto md:flex-row md:h-24 lg:text-base md:bg-transparent md:mt-0 md:border-none md:py-0 md:flex md:relative"
            >
              <a
                href="#"
                className="ml-0 mr-0 font-bold duration-100 md:ml-12 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600"
              >
                Home
              </a>
              <a
                href="#aboutus"
                className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600"
              >
                About Us
              </a>
              <a
                href="#forinvestors"
                className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600"
              >
                For Investors
              </a>
              <a
                href="#forstartups"
                className="font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600"
              >
                For Startups
              </a>
              <a
                href="#faqs"
                className="font-bold duration-100 transition-color hover:text-indigo-600"
              >
                FAQs
              </a>
              

            </nav>
            <div className="absolute left-0 flex-col items-center justify-center hidden w-full pb-8 mt-48 border-b border-gray-200 md:relative md:w-auto md:bg-transparent md:border-none md:mt-0 md:flex-row md:p-0 md:items-end md:flex md:justify-between">
              <button
              onClick={()=>{router.push("/login")}}
                className="relative z-40 px-3 py-2 mr-0 text-sm font-bold text-pink-500 md:px-5 lg:text-white sm:mr-3 md:mt-0"
              >
                Login
              </button>
              <button
              onClick={()=>{router.push("/register")}}

                className="relative z-40 inline-block w-auto h-full px-5 py-3 text-sm font-bold leading-none text-white transition-all transition duration-100 duration-300 bg-indigo-700 rounded shadow-md fold-bold lg:bg-white lg:text-indigo-700 sm:w-full lg:shadow-none hover:shadow-xl"
              >
                Get Started
              </button>
              <svg
                className="absolute top-0 left-0 hidden w-screen max-w-3xl -mt-64 -ml-12 lg:block"
                viewBox="0 0 818 815"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <defs>
                  <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="c">
                    <stop stopColor="#E614F2" offset="0%" />
                    <stop stopColor="#FC3832" offset="100%" />
                  </linearGradient>
                  <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="f">
                    <stop stopColor="#657DE9" offset="0%" />
                    <stop stopColor="#1C0FD7" offset="100%" />
                  </linearGradient>
                  <filter
                    x="-4.7%"
                    y="-3.3%"
                    width="109.3%"
                    height="109.3%"
                    filterUnits="objectBoundingBox"
                    id="a"
                  >
                    <feOffset dy={8} in="SourceAlpha" result="shadowOffsetOuter1" />
                    <feGaussianBlur
                      stdDeviation={8}
                      in="shadowOffsetOuter1"
                      result="shadowBlurOuter1"
                    />
                    <feColorMatrix
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                      in="shadowBlurOuter1"
                    />
                  </filter>
                  <filter
                    x="-4.7%"
                    y="-3.3%"
                    width="109.3%"
                    height="109.3%"
                    filterUnits="objectBoundingBox"
                    id="d"
                  >
                    <feOffset dy={8} in="SourceAlpha" result="shadowOffsetOuter1" />
                    <feGaussianBlur
                      stdDeviation={8}
                      in="shadowOffsetOuter1"
                      result="shadowBlurOuter1"
                    />
                    <feColorMatrix
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      in="shadowBlurOuter1"
                    />
                  </filter>
                  <path
                    d="M160.52 108.243h497.445c17.83 0 24.296 1.856 30.814 5.342 6.519 3.486 11.635 8.602 15.12 15.12 3.487 6.52 5.344 12.985 5.344 30.815v497.445c0 17.83-1.857 24.296-5.343 30.814-3.486 6.519-8.602 11.635-15.12 15.12-6.52 3.487-12.985 5.344-30.815 5.344H160.52c-17.83 0-24.296-1.857-30.814-5.343-6.519-3.486-11.635-8.602-15.12-15.12-3.487-6.52-5.343-12.985-5.343-30.815V159.52c0-17.83 1.856-24.296 5.342-30.814 3.486-6.519 8.602-11.635 15.12-15.12 6.52-3.487 12.985-5.343 30.815-5.343z"
                    id="b"
                  />
                  <path
                    d="M159.107 107.829H656.55c17.83 0 24.296 1.856 30.815 5.342 6.518 3.487 11.634 8.602 15.12 15.12 3.486 6.52 5.343 12.985 5.343 30.816V656.55c0 17.83-1.857 24.296-5.343 30.815-3.486 6.518-8.602 11.634-15.12 15.12-6.519 3.486-12.985 5.343-30.815 5.343H159.107c-17.83 0-24.297-1.857-30.815-5.343-6.519-3.486-11.634-8.602-15.12-15.12-3.487-6.519-5.343-12.985-5.343-30.815V159.107c0-17.83 1.856-24.297 5.342-30.815 3.487-6.519 8.602-11.634 15.12-15.12 6.52-3.487 12.985-5.343 30.816-5.343z"
                    id="e"
                  />
                </defs>
                <g fill="none" fillRule="evenodd" opacity=".9">
                  <g transform="rotate(65 416.452 409.167)">
                    <use fill="#000" filter="url(#a)" xlinkHref="#b" />
                    <use fill="url(#c)" xlinkHref="#b" />
                  </g>
                  <g transform="rotate(29 421.929 414.496)">
                    <use fill="#000" filter="url(#d)" xlinkHref="#e" />
                    <use fill="url(#f)" xlinkHref="#e" />
                  </g>
                </g>
              </svg>
            </div>
            <div
              id="nav-mobile-btn"
              className="absolute top-0 right-0 z-50 block w-6 mt-8 mr-10 cursor-pointer select-none md:hidden sm:mt-10"
            >
              <span className="block w-full h-1 mt-2 duration-200 transform bg-gray-800 rounded-full sm:mt-1" />
              <span className="block w-full h-1 mt-1 duration-200 transform bg-gray-800 rounded-full" />
            </div>
          </div>
        </header>
        {/* End Header Section*/}
        {/* BEGIN HERO SECTION */}
        <div className=" items-center justify-center w-full overflow-x-hidden lg:pt-40 lg:pb-40 xl:pt-40 xl:pb-64">
          <div className="container flex flex-col items-center justify-between h-full max-w-8xl px-8 mx-auto -mt-32 lg:flex-row xl:px-0">
            <div className="z-30 flex flex-col items-center w-full max-w-xl pt-48 text-center lg:items-start lg:w-1/2 lg:pt-20 xl:pt-30 lg:text-left">
              <h1 className="relative mb-1 text-5xl font-black leading-tight text-gray-900 sm:text-6xl xl:mb-4">
              LaunchPad
              </h1>
              <h1 className="relative mb-1 text-xl font-black leading-tight text-gray-900 sm:text-4xl xl:mb-4">
                Where groundbreaking ideas meet strategic investment!!
              </h1>
              <p className="pr-0 mb-8 text-base text-gray-600 sm:text-lg xl:text-xl lg:pr-20">
                "Welcome to LaunchPad, your gateway to a thriving
                entrepreneurial ecosystem. Whether you're looking to launch your
                startup or seeking investment opportunities, our platform is designed
                to connect you with the right resources and networks. Join us and turn
                your ideas into reality!"
              </p>
              <button
              onClick={()=>{router.push("/register")}}
              className="relative self-start inline-block w-auto px-8 py-4 mx-auto mt-0 text-base font-bold text-white bg-indigo-600 border-t border-gray-200 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0"
              >
                Signup Today!
              </button>
              {/* Integrates with section */}
              <svg
                className="absolute left-0 max-w-md mt-24 -ml-64 left-svg"
                viewBox="0 0 423 423"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <defs>
                  <linearGradient
                    x1="100%"
                    y1="0%"
                    x2="4.48%"
                    y2="0%"
                    id="linearGradient-1"
                  >
                    <stop stopColor="#5C54DB" offset="0%" />
                    <stop stopColor="#6A82E7" offset="100%" />
                  </linearGradient>
                  <filter
                    x="-9.3%"
                    y="-6.7%"
                    width="118.7%"
                    height="118.7%"
                    filterUnits="objectBoundingBox"
                    id="filter-3"
                  >
                    <feOffset dy={8} in="SourceAlpha" result="shadowOffsetOuter1" />
                    <feGaussianBlur
                      stdDeviation={8}
                      in="shadowOffsetOuter1"
                      result="shadowBlurOuter1"
                    />
                    <feColorMatrix
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                      in="shadowBlurOuter1"
                    />
                  </filter>
                  <rect id="path-2" x={63} y={504} width={300} height={300} rx={40} />
                </defs>
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth={1}
                  fill="none"
                  fillRule="evenodd"
                  opacity=".9"
                >
                  <g id="Desktop-HD" transform="translate(-39 -531)">
                    <g id="Hero" transform="translate(43 83)">
                      <g id="Rectangle-6" transform="rotate(45 213 654)">
                        <use
                          fill="#000"
                          filter="url(#filter-3)"
                          xlinkHref="#path-2"
                        />
                        <use fill="url(#linearGradient-1)" xlinkHref="#path-2" />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div className="relative z-50 flex flex-col items-end justify-center w-full h-full lg:w-1/2 ms:pl-10">
              <div className="container relative left-0 w-full max-w-4xl lg:absolute xl:max-w-6xl lg:w-screen">
                <img
                  src="/images/removed-background.png"
                  className="w-full h-auto mt-20 mb-20 ml-0 lg:mt-24 xl:mt-40 lg:mb-0 lg:h-full lg:-ml-12"
                />
              </div>
            </div>
          </div>
        </div>
        {/* HERO SECTION END */}
        {/* BEGIN About us SECTION */}
        <div
          id="aboutus"
          className="relative w-full px-4 py-5 border-t border-gray-200 md:py-8 lg:py-10 xl:py-10 xl:px-0"
        >
          <div className="container flex flex-col items-left h-full max-w-8xl mx-auto">
            <h2 className="my-5 text-base font-black sm:text-xl xl:text-5xl tracking-tight text-indigo-500 uppercase">
              About Us
            </h2>
            <div className="flex flex-wrap justify-between items-left">
              <h3 className="max-w-xl px-4 mt-2 text-2xl font-black leading-tight text-gray-900 sm:mt-10 sm:px-0 sm:text-l">
                LaunchPad is dedicated to revolutionizing the entrepreneurial
                landscape. We provide a platform that seamlessly connects startups
                with investors while fostering innovation through collaborative idea
                exploration. Our mission is to support entrepreneurs in navigating the
                complexities of the startup ecosystem, empowering them to thrive.
              </h3>
              <img
                src="/images/about1.png"
                alt="Description"
                className="w-1/2 max-w-3xl h-1/2 ml-10 mt-5 sm:mt-0"
              />
            </div>
            <div className="flex flex-col w-full mt-0 lg:flex-row sm:mt-10 lg:mt-20">
              <div className="w-full max-w-md p-4 mx-auto mb-0 sm:mb-16 lg:mb-0 lg:w-1/3">
                <div className="relative flex flex-col items-center justify-center w-full h-full p-20 mr-5 rounded-lg">
                  <svg
                    className="absolute w-full h-full text-gray-100 fill-current"
                    viewBox="0 0 358 372"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <g>
                        <path d="M315.7 6.5c30.2 15.1 42.6 61.8 41.5 102.5-1.1 40.6-15.7 75.2-24.3 114.8-8.7 39.7-11.3 84.3-34.3 107.2-23 22.9-66.3 23.9-114.5 30.7-48.2 6.7-101.3 19.1-123.2-4.1-21.8-23.2-12.5-82.1-21.6-130.2C30.2 179.3 2.6 141.9.7 102c-2-39.9 21.7-82.2 57.4-95.6 35.7-13.5 83.3 2.1 131.2 1.7 47.9-.4 96.1-16.8 126.4-1.6z" />
                      </g>
                    </g>
                  </svg>
                  {/* FEATURE Icon 1 */}
                  <img
                    src="/images/logo1.png"
                    alt="CEO"
                    className="relative w-auto h-auto"
                  />
                  <h4 className="relative mt-6 text-lg font-bold">G Shreyesh Reddy</h4>
                  <p className="relative mt-2 text-base text-center text-gray-600">
                    Founder
                    <br />
                    LaunchPad
                  </p>
                </div>
              </div>
              <div className="w-full max-w-md p-4 mx-auto mb-0 sm:mb-16 lg:mb-0 lg:w-1/3">
                <div className="relative flex flex-col items-center justify-center w-full h-full p-20 mr-5 rounded-lg">
                  <svg
                    className="absolute w-full h-full text-gray-100 fill-current"
                    viewBox="0 0 358 372"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <g>
                        <path d="M315.7 6.5c30.2 15.1 42.6 61.8 41.5 102.5-1.1 40.6-15.7 75.2-24.3 114.8-8.7 39.7-11.3 84.3-34.3 107.2-23 22.9-66.3 23.9-114.5 30.7-48.2 6.7-101.3 19.1-123.2-4.1-21.8-23.2-12.5-82.1-21.6-130.2C30.2 179.3 2.6 141.9.7 102c-2-39.9 21.7-82.2 57.4-95.6 35.7-13.5 83.3 2.1 131.2 1.7 47.9-.4 96.1-16.8 126.4-1.6z" />
                      </g>
                    </g>
                  </svg>
                  {/* FEATURE Icon 2 */}
                  <img
                    src="/images/logo1.png"
                    alt="CEO"
                    className="relative w-auto h-auto"
                  />
                  <h4 className="relative mt-6 text-lg font-bold">
                    Bairi Vamshi
                  </h4>
                  <p className="relative mt-2 text-base text-center text-gray-600">
                    Co-Founder
                    <br />
                    LaunchPad
                  </p>
                </div>
              </div>
              <div className="w-full max-w-md p-4 mx-auto mb-16 lg:mb-0 lg:w-1/3">
                <div className="relative flex flex-col items-center justify-center w-full h-full p-20 mr-5 rounded-lg">
                  <svg
                    className="absolute w-full h-full text-gray-100 fill-current"
                    viewBox="0 0 358 372"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <g>
                        <path d="M315.7 6.5c30.2 15.1 42.6 61.8 41.5 102.5-1.1 40.6-15.7 75.2-24.3 114.8-8.7 39.7-11.3 84.3-34.3 107.2-23 22.9-66.3 23.9-114.5 30.7-48.2 6.7-101.3 19.1-123.2-4.1-21.8-23.2-12.5-82.1-21.6-130.2C30.2 179.3 2.6 141.9.7 102c-2-39.9 21.7-82.2 57.4-95.6 35.7-13.5 83.3 2.1 131.2 1.7 47.9-.4 96.1-16.8 126.4-1.6z" />
                      </g>
                    </g>
                  </svg>
                  {/* FEATURE Icon 3 */}
                  <img
                    src="/images/logo1.png"
                    alt="CEO"
                    className="relative w-auto h-auto"
                  />
                  <h4 className="relative mt-6 text-lg font-bold">Bhagyanagar Vishnu</h4>
                  <p className="relative mt-2 text-base text-center text-gray-600">
                    Co-Founder
                    <br />
                    LaunchPad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END About Us SECTION */}
        {/* For Investors Section */}
        <div
          id="forinvestors"
          className="relative w-full px-4 py-5 border-t border-gray-200 md:py-8 lg:py-10 xl:py-10 xl:px-0"
        ></div>
        <div className="relative w-full max-w-7xl mx-auto px-4 py-4">
          {/* About Investors */}
          <h2 className="my-5 text-base font-black sm:text-xl xl:text-5xl tracking-tight text-indigo-500 uppercase">
            Investors
          </h2>
          <div className="flex flex-wrap justify-between items-start">
            <h3 className="max-w-xl px-4 mt-4 text-2xl font-black leading-tight text-gray-900 sm:mt-10 sm:px-0 sm:text-l">
              At LaunchPad, we empower investors to discover promising startups and
              explore investment opportunities tailored to their interests. Our platform
              offers a comprehensive view of startups’ profiles, enabling investors to
              make informed decisions and contribute to the growth of innovative ideas.
            </h3>
            <img
              src="/images/investor.avif"
              alt="Investor Section Image"
              className="w-1/2 max-w-3xl h-1/2 ml-10 mt-5 sm:mt-0"
            />
          </div>
            <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#333', padding: '40px', backgroundColor: '#fff' }}>
          {/* What Can You Do Section */}
          <section>
            <h2 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '20px' }}>What can you do?</h2>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', marginBottom: '40px' }}>
              {/* Build your profile */}
              <div style={{ textAlign: 'left', width: '30%' }}>
                <div style={{ fontSize: '3rem', color: '#00a1a7' }}>👤</div>
                <h3 style={{ fontSize: '1.2rem', color: '#333', fontWeight: 'bold', marginTop: '10px' }}>Build your profile</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
                  Get instant visibility of Indian Startup ecosystem.
                </p>
                <a href="#" style={{ color: '#00a1a7', fontSize: '0.9rem', textDecoration: 'none' }}>
                  A quick guide on how to create investor profile
                </a>
              </div>

              {/* Create investment opportunities */}
              <div style={{ textAlign: 'left', width: '30%' }}>
                <div style={{ fontSize: '3rem', color: '#00a1a7' }}>💰</div>
                <h3 style={{ fontSize: '1.2rem', color: '#333', fontWeight: 'bold', marginTop: '10px' }}>Create investment opportunities</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
                  Identify matching startups based on your requirement.
                </p>
                <a href="#" style={{ color: '#00a1a7', fontSize: '0.9rem', textDecoration: 'none' }}>
                  A quick guide to create investment opportunity
                </a>
              </div>
            </div>

      </section>
      </div>
    </div>
        {/* End Investors Section */}
        {/* For Startups Section */}
        <div
          id="forstartups"
          className="relative w-full px-4 py-5 border-t border-gray-200 md:py-8 lg:py-10 xl:py-10 xl:px-0"
        ></div>
         <div className="relative w-full max-w-7xl mx-auto px-4 py-4">
            <div style={{ textAlign: 'left', fontFamily: 'Arial, sans-serif', color: '#333' }}>
          {/* How Does It Work Section */}
          {/* About Startups */}
          <h2 className="my-5 text-base font-black sm:text-xl xl:text-5xl tracking-tight text-indigo-500 uppercase">
            Startups
          </h2>
          <div className="flex flex-wrap justify-between items-start">
            <h3 className="max-w-xl px-4 mt-2 text-2xl font-black leading-tight text-gray-900 sm:mt-10 sm:px-0 sm:text-l">
              For startups, LaunchPad serves as a launchpad to reach potential
              investors and gain visibility within the Indian startup ecosystem. We support
              startups in building robust profiles and presenting their unique value
              propositions, helping them connect with investors who share their vision and
              can fuel their journey toward success.
            </h3>
            <img
              src="/images/startup.jpg"
              alt="Startup Section Image"
              className="w-1/2 max-w-3xl h-1/2 ml-10 mt-5 sm:mt-0"
            />
          </div>
          <section style={{ padding: '40px', backgroundColor: '#f5f5f5' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '10px' }}>How does it work?</h2>
            <p style={{ fontSize: '1rem', color: '#666', marginBottom: '30px' }}>
              We know all great innovations need a big voice to stand out from the noise and be spotted by the right
              audience. So we offer you even more opportunities to get noticed.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
              {/* Step 1 */}
              <div
                style={{
                  backgroundColor: '#e0f7fa',
                  padding: '20px',
                  borderRadius: '10px',
                  width: '30%',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{ fontSize: '1.5rem', color: '#00c0ff', fontWeight: 'bold' }}>1</div>
                <h3 style={{ color: '#333', fontSize: '1.2rem', marginTop: '10px' }}>Create your profile</h3>
                <p style={{ fontSize: '0.9rem', color: '#555' }}>
                  Get instant visibility on our platform. Just so you know, you control what is, and what isn’t visible to
                  your profile visitors.
                </p>
              </div>

              {/* Step 2 */}
              <div
                style={{
                  backgroundColor: '#e0f7fa',
                  padding: '20px',
                  borderRadius: '10px',
                  width: '30%',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{ fontSize: '1.5rem', color: '#00c0ff', fontWeight: 'bold' }}>2</div>
                <h3 style={{ color: '#333', fontSize: '1.2rem', marginTop: '10px' }}>Apply for Investments</h3>
                <p style={{ fontSize: '0.9rem', color: '#555' }}>
                  Search for the right investment partner, suitable for your business needs. Apply to meet the investment
                  requirements of investors.
                </p>
              </div>

              {/* Step 3 */}
              <div
                style={{
                  backgroundColor: '#e0f7fa',
                  padding: '20px',
                  borderRadius: '10px',
                  width: '30%',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{ fontSize: '1.5rem', color: '#00c0ff', fontWeight: 'bold' }}>3</div>
                <h3 style={{ color: '#333', fontSize: '1.2rem', marginTop: '10px' }}>Start unlocking investment opportunities</h3>
                <p style={{ fontSize: '0.9rem', color: '#555' }}>
                  Once your profile is validated, corporate investors and VCs seeking your innovation will be able to
                  connect with you.
                </p>
              </div>
            </div>
      </section>
      </div>
    </div>
        {/* End Startups Section */}
        <footer className="px-4 pt-12 pb-8 text-white bg-white border-t border-gray-200">
          <div className="container flex flex-col justify-between max-w-6xl px-4 mx-auto overflow-hidden lg:flex-row">
            <div className="w-full pl-12 mr-4 text-left lg:w-1/4 sm:text-center sm:pl-0 lg:text-left">
              <a
                href="/"
                className="flex justify-start block text-left sm:text-center lg:text-left sm:justify-center lg:justify-start"
              >
                <span className="flex items-start sm:items-center">
                  <img src="/images/logo.png" alt="Logo" className="w-15 h-10" />
                </span>
              </a>
              <p className="mt-6 mr-4 text-base text-gray-500">
                Crafting the next-level of user experience and engagement.
              </p>
            </div>
            <div className="block w-full pl-10 mt-6 text-sm lg:w-3/4 sm:flex lg:mt-0">
              <ul className="flex flex-col w-full p-0 font-medium text-left text-gray-700 list-none">
                <li className="inline-block px-3 py-2 mt-5 font-bold tracking-wide text-gray-800 uppercase md:mt-0">
                LaunchPad
                </li>
                <li>
                  <a
                    href="#aboutus"
                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#forinvestors"
                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
                  >
                    Investors
                  </a>
                </li>
                <li>
                  <a
                    href="#forstartups"
                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
                  />
                </li>
                <li>
                  <a
                    href="#_"
                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
              <ul className="flex flex-col w-full p-0 font-medium text-left text-gray-700 list-none">
                <li className="inline-block px-3 py-2 mt-5 font-bold tracking-wide text-gray-800 uppercase md:mt-0">
                  Company
                </li>
                <li>
                  <a
                    href="#_"
                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#_"
                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-4 pt-6 mt-10 text-center text-gray-500 border-t border-gray-100">
            © 2024 LaunchPad. All rights reserved.
          </div>
          <div className="pt-2 pt-4 mt-2 text-center text-gray-600 border-t border-gray-100">
            Distributed By{" "}
            <Link href="https://www.cvr.ac.in/">CVR COLLEGE OF ENGINEERING</Link>
          </div>
        </footer>
        {/* a little JS for the mobile nav button */}
      </div>
    );
}