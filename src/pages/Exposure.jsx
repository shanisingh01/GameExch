import React from "react";
import { Link } from "react-router-dom";

const dummyData = [
  {
    match: "Mumbai Indians vs CSK",
    stake: "1000",
    rate: "1.85",
    type: "Back",
    time: "04/04/2026 10:30 AM",
    market: "Match Odds",
  },
  {
    match: "RCB vs KKR",
    stake: "500",
    rate: "2.10",
    type: "Lay",
    time: "04/04/2026 11:15 AM",
    market: "Session",
  },
  {
    match: "India vs Australia",
    stake: "2000",
    rate: "1.65",
    type: "Back",
    time: "04/04/2026 12:00 PM",
    market: "Match Odds",
  },
];

const Exposure = () => {
  return (
    <div className="bg-[#eae9e9] min-h-screen py-10">
      <div className="max-w-[100%] md:max-w-[80%] px-1 md:px-4 text-xs mx-auto">

        {/* Header */}
        <div className="main-color text-white text-center py-2 font-semibold text-[13px]">
          PENDING BETS
        </div>

        {/* Table */}
        <div className="mt-2 border border-gray-300 overflow-auto">
          <table className="w-full statement-table border-collapse text-[13px] min-w-[700px]">

            {/* Header */}
            <thead>
              <tr className="text-white">
                {["Match", "Stake", "Rate", "Type", "Time", "Market Type"].map(
                  (item, i) => (
                    <th
                      key={i}
                      className="bg-gradient-to-b from-[#1f67b3] via-[#0b3c6d] to-[#001a33] py-3 border-r border-gray-300 text-center font-semibold"
                    >
                      {item}
                    </th>
                  )
                )}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {dummyData.map((bet, i) => (
                <tr
                  key={i}
                  className="bg-[#dcdcdc] border-t border-gray-300 text-center"
                >
                  <td className="py-3 border-r">{bet.match}</td>
                  <td className="py-3 border-r">{bet.stake}</td>
                  <td className="py-3 border-r">{bet.rate}</td>

                  {/* Type color */}
                  <td
                    className={`py-3 border-r font-semibold ${
                      bet.type === "Back"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {bet.type}
                  </td>

                  <td className="py-3 border-r">{bet.time}</td>
                  <td className="py-3">{bet.market}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Footer Button */}
        <div className="mt-10">
          <Link to="/client"><button  className="w-full main-color cursor-pointer  hover:bg-[#030303] text-white py-2 text-[14px] font-semibold">
            BACK TO MAIN MENU
          </button></Link>
        </div>

      </div>
    </div>
  );
};



export default Exposure