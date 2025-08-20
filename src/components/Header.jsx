// import React, { useEffect, useState } from "react";
// import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { TiThList } from "react-icons/ti";
// import logo from "../assets/app_logo.jpg"

// const Header = () => {
//   const [searchInput, setSearchInput] = useState("");
//   const watchlist = useSelector((state) => state.favorite.watchlist);
//   const navigate = useNavigate();
  
//   const navigationTabs = [
//     {
//       label: "Movies",
//       href: "movie",
//     },
//     {
//       label: "TV Show",
//       href: "tv",
//     },
//      {
//       label: "AI Movie Recommendation",
//       href: "movieRecommendation",
//     },
//   ];
// console.log(logo)
//   useEffect(() => {
//     if (searchInput) {
//       navigate(`/search?q=${searchInput}`);
//     }
//   }, [searchInput]);
//   return (
//     <>
//       <div className="header fixed top-0 w-full h-[10vh] z-40 flex items-center justify-between bg-gradient-to-b from-black/100 to-transparent">
//         <div className="w-[20%] h-[10vh] flex items-center gap-4 text-white font-medium">

        
//           <NavLink to="/" className="h-full w-full flex items-center ml-2">
//             <img src={logo} alt="App Logo" className="h-12 w-12 rounded-xl"  />
//             <span className="ml-12 font-bold text-lg"></span>
//           </NavLink>

//           {navigationTabs.map((tab) => {
//             return (
//               <NavLink
//                 key={tab.label}
//                 to={tab.href}
//                 className={({ isActive }) =>
//                   `text-white font-medium ${isActive && "text-blue-600"}`
//                 }
//               >
//                 {tab.label}
//               </NavLink>
//             );
//           })}
//         </div>
//         <div className="flex items-center gap-4">
//           {/* <form
//             className="flex"
//             onSubmit={(e) => {
//               e.preventDefault();
//               //navigate("search");
//             }}
//           > */}
//             {/* <input
//               type="text"
//               id="simple-search"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder="Search here..."
//               value={searchInput}
//               onChange={(e) => {
//                 setSearchInput(e.target.value);
//               }}
//             /> */}
//             <button
//               type="button"
//               className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               onClick={() => navigate(`/search`)}
//             >
//               <svg
//                 className="w-4 h-4"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                 />
//               </svg>
//               <span className="sr-only">Search</span>
//             </button>
         

//           <NavLink
//             to="/watchlist"
//             className={({ isActive }) =>
//               `items-center p-1.5 text-lg font-medium text-center text-white rounded-lg border ${
//                 isActive && "bg-blue-700"
//               }`
//             }
//           >
//             <TiThList className="" />
//             <span className="absolute top-1 right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900 ">
//               {watchlist.length}
//             </span>
//           </NavLink>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;



import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TiThList } from "react-icons/ti";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../assets/app_logo.jpg";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // for sidebar
  const watchlist = useSelector((state) => state.favorite.watchlist);
  const navigate = useNavigate();

  const navigationTabs = [
    // { label: "Home", href: "/" },
    { label: "Movies", href: "/movie" },
    { label: "TV Show", href: "/tv" },
    { label: "AI Recommendation", href: "/movieRecommendation" },
  ];

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  return (
    <>
      {/* Header */}
      <div className="header fixed top-0 w-full h-[10vh] z-40 flex items-center justify-between px-4 bg-gradient-to-b from-black/100 to-transparent">
        {/* Left Section */}
        <div className="flex items-center gap-4 text-white font-medium">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img src={logo} alt="App Logo" className="h-12 w-12 rounded-xl" />
          </NavLink>

          {/* Nav tabs (hidden on mobile) */}
          <div className="hidden md:flex gap-6 ml-6">
            {navigationTabs.map((tab) => (
              <NavLink
                key={tab.label}
                to={tab.href}
                className={({ isActive }) =>
                  `hover:text-blue-400 ${isActive ? "text-blue-500" : "text-white"}`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-2"
            onClick={() => navigate(`/search`)}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>

          {/* Watchlist */}
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `relative p-2 text-lg font-medium text-center text-white rounded-lg border ${
                isActive && "bg-blue-700"
              }`
            }
          >
            <TiThList />
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 border-2 border-white rounded-full">
              {watchlist.length}
            </span>
          </NavLink>

          {/* Hamburger menu (only on mobile) */}
          <button
            className="text-white text-2xl md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <AiOutlineMenu />
          </button>
        </div>
      </div>

      {/* Sidebar Menu (mobile only) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black/95 z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-xl" />
          <button className="text-white text-2xl" onClick={() => setIsOpen(false)}>
            <AiOutlineClose />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-4 p-6 text-white">
          {navigationTabs.map((tab) => (
            <NavLink
              key={tab.label}
              to={tab.href}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg hover:text-blue-400 ${
                  isActive ? "text-blue-500" : "text-white"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
