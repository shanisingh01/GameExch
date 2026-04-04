import React from "react";
import { Link } from "react-router-dom";

const data = [
  {
    desc: "Mumbai Indians v Kolkata Knight Riders (Series) (29-03-2026)",
    wonBy: "Mumbai Indians",
    won: 0,
    lost: 0,
    hisab: -451,
  },
  {
    desc: "Lions v Titans (Series) (29-03-2026)",
    wonBy: "Titans",
    won: 200,
    lost: 0,
    hisab: -451,
  },
  {
    desc: "Quetta Gladiators v Hyderabad Kingsmen (Series) (29-03-2026)",
    wonBy: "Quetta Gladiators",
    won: 0,
    lost: 0,
    hisab: -651,
  },
  {
    desc: "Peshawar Zalmi v Rawalpindi Pindiz (Series) (28-03-2026)",
    wonBy: "Peshawar Zalmi",
    won: 0,
    lost: 0,
    hisab: -651,
  },
  {
    desc: "Quetta Gladiators v Karachi Kings (Series) (27-03-2026)",
    wonBy: "Karachi Kings",
    won: 100,
    lost: 0,
    hisab: -651,
  },
];

const Ledger = () => {
  return (
    <div className="bg-[#f0f0f0] text-xs min-h-screen py-6">
      <div className="max-w-[100%]  md:max-w-[80%] mx-auto">
        {/* Header */}
        <div className="main-color text-white text-center py-2 font-bold">
          MY LEDGER
        </div>

        {/* Summary */}
        <div className="flex font-semibold border-4 border-[#eae8e8] justify-between text-center bg-[#eae8e8] py-6 px-4">
          <div>
            Lena: <span className="text-green-600 font-semibold">706.00</span>
          </div>
          <div>
            Dena: <span className="text-red-600 font-semibold">1,157.00</span>
          </div>
          <div>
            Balance: <span className="text-red-600 font-semibold">-451.00</span>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6  overflow-auto ">
          <table className="w-full  statement-table overflow-auto border-collapse">
            {/* Header */}
            <thead>
              <tr className="text-white ">
                {["DESCRIPTION", "WON BY", "WON", "LOST", "HISAB"].map(
                  (item, i) => (
                    <th key={i} className="main-color px-8 py-3  text-center">
                      {item}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={i}
                  className="bg-[#dcdcdc] border-t border-gray-300 font-medium"
                >
                  {/* Description */}
                  <td className="px-3 text-nowrap cursor-pointer hover:text-[#146cc4] py-4 border-r border-gray-300 text-blue-600">
                    {row.desc}
                  </td>

                  {/* Won By */}
                  <td className="px-3 py-4 text-nowrap border-r border-gray-300 text-center">
                    {row.wonBy}
                  </td>

                  {/* Won */}
                  <td
                    className={`px-3 py-4 border-r border-gray-300 text-center ${
                      row.won > 0 ? "text-green-600" : ""
                    }`}
                  >
                    {row.won.toFixed(2)}
                  </td>

                  {/* Lost */}
                  <td className="px-3 py-4 border-r border-gray-300 text-center">
                    {row.lost.toFixed(2)}
                  </td>

                  {/* Hisab */}
                  <td className="px-3 py-4 text-center text-red-600">
                    {row.hisab.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Footer Button */}
        <div className="mt-10">
          <Link to="/client">
            <button className="w-full main-color cursor-pointer  hover:bg-[#030303] text-white py-2 text-[14px] font-semibold">
              BACK TO MAIN MENU
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Ledger;
