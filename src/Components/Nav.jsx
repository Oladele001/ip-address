import React, { useEffect, useState } from "react";
import axios from "axios";
import mobile from "../assets/pattern-bg-mobile.png";
import desktop from "../assets/pattern-bg-desktop.png";
import icon from "../assets/icon-arrow.svg";

const Nav = () => {
  const [posts, setPosts] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch IP data
  const fetchData = async (ip = "8.8.8.8") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_2VwRfEuEjfvV2aEz03jv3EomzddwX&ipAddress=${ip}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Unable to find the IP or domain. Try another one.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch default IP on first load
  useEffect(() => {
    fetchData();
  }, []);

  // Handle button click
  const handleSearch = () => {
    if (searchInput.trim() === "") {
      alert("Please enter an IP address or domain.");
      return;
    }
    fetchData(searchInput);
  };

  return (
    <div className="relative">
      {/* Background */}
      <div className="w-[100vw] h-48 md:h-64 bg-black absolute top-0 z-10">
        <img
          src={mobile}
          alt="Background"
          className="w-full h-full object-cover md:hidden"
        />
        <img
          src={desktop}
          alt="Background"
          className="w-[100vw] h-full object-cover hidden md:block"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-96 md:h-[500px] px-4">
        <h1 className="text-white mt-36 md:mt-0 text-2xl md:text-4xl font-bold mb-8 text-center">
          IP Address Tracker
        </h1>

        {/* Search bar */}
        <div className="flex w-full max-w-md md:max-w-lg mb-8">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for any IP address or domain"
            className="flex-1 px-4 py-3 bg-black rounded-l-lg border-0 outline-none text-white text-sm md:text-base"
          />
          <button
            onClick={handleSearch}
            className="bg-black px-4 py-3 rounded-r-lg hover:bg-gray-800 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6">
              <path
                fill-rule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clip-rule="evenodd"
              />
            </svg>

            {/* <img src={icon} alt="Search" className="w-5 h-5" /> */}
          </button>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {loading ? (
            <p className="col-span-4 text-center text-gray-500">Loading...</p>
          ) : (
            <>
              <div className="text-center md:text-center">
                <h4 className="text-gray-500 text-xs md:text-sm uppercase tracking-wide">
                  IP Address
                </h4>
                <p className="text-black font-bold text-base md:text-lg break-all">
                  {posts.ip || "N/A"}
                </p>
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-gray-500 text-xs md:text-sm uppercase tracking-wide">
                  Location
                </h4>
                <p className="text-black font-bold text-base md:text-lg">
                  {posts.location
                    ? `${posts.location.city}, ${posts.location.country}`
                    : "N/A"}
                </p>
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-gray-500 text-xs md:text-sm uppercase tracking-wide">
                  Timezone
                </h4>
                <p className="text-black font-bold text-base md:text-lg">
                  {posts.location ? posts.location.timezone : "N/A"}
                </p>
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-gray-500 text-xs md:text-sm uppercase tracking-wide">
                  ISP
                </h4>
                <p className="text-black font-bold text-base md:text-lg">
                  {posts.isp || "N/A"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
