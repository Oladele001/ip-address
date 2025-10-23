import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import mobile from "../assets/pattern-bg-mobile.png";
import desktop from "../assets/pattern-bg-desktop.png";
import icon from "../assets/icon-arrow.svg";

const Nav = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data when the component loads
    axios
      .get(
        "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_2VwRfEuEjfvV2aEz03jv3EomzddwX&ipAddress=8.8.8.8"
      )
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className="relative">
      <div className=" w-[100vw] h-48 md:h-64 bg-black absolute top-0 z-10">
        <img
          src={mobile}
          alt="Background"
          className="w-full h-full object-cover md:hidden"
        />
        <img
          src={desktop}
          alt="Background"
          className="w-[100vw] border-2 border-black h-full object-cover hidden md:block"
        />
      </div>
      <div className="relative z-20 flex flex-col items-center justify-center h-96 md:h-[500px] px-4">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-8 text-center">
          IP Address Tracker
        </h1>
        <div className="flex w-full max-w-md md:max-w-lg mb-8">
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            className="flex-1 px-4 py-3 rounded-l-lg border-0 outline-none text-gray-700 text-sm md:text-base"
          />
          <button className="bg-black px-4 py-3 rounded-r-lg hover:bg-gray-800 transition-colors">
            <img src={icon} alt="Search" className="w-5 h-5" />
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-gray-500 text-xs md:text-sm uppercase tracking-wide">
              IP Address
            </h4>
            <p className="text-black font-bold text-base md:text-lg break-all">
              {posts.ip}
            </p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-gray-500 text-xs md:text-sm uppercase tracking-wide">
              Location
            </h4>
            <p className="text-black font-bold text-base md:text-lg">
              {posts.location?.city}, {posts.location?.country}
            </p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-gray-500 text-xs md:text-sm uppercase tracking-wide">
              Timezone
            </h4>
            <p className="text-black font-bold text-base md:text-lg">
              {posts.location?.timezone}
            </p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-gray-500 text-xs md:text-sm uppercase tracking-wide">
              ISP
            </h4>
            <p className="text-black font-bold text-base md:text-lg">
              {posts.isp}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
