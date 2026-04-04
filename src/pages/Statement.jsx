import React, { useState } from "react";
import { Link } from "react-router-dom";

const data = [
  {
    date: "29 Mar 26",
    desc: "Loss Mumbai Indians v Kolkata Knight Riders",
    credit: "0.00",
    debit: "0.00",
    balance: "-452",
    type: "pnl",
  },
  {
    date: "29 Mar 26",
    desc: "Won Lions v Titans",
    credit: "200.00",
    debit: "0.00",
    balance: "-452",
    type: "pnl",
  },
  {
    date: "29 Mar 26",
    desc: "Balance debited",
    credit: "0",
    debit: "10",
    balance: "-652",
    type: "account",
  },
  {
    date: "28 Mar 26",
    desc: "Balance credited",
    credit: "-651",
    debit: "0",
    balance: "-642",
    type: "account",
  },
  {
    date: "28 Mar 26",
    desc: "Balance debited",
    credit: "0",
    debit: "18840",
    balance: "9",
    type: "account",
  },
];

const Statement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [fromDate, setFromDate] = useState("2026-04-04");
  const [toDate, setToDate] = useState("2026-04-04");

  // 🔥 Filter Logic
  const filteredData =
    activeTab === "all" ? data : data.filter((item) => item.type === activeTab);

  return (
    <div className="bg-[#e9e9e9] min-h-screen">
      <div className="max-w-[100%] md:max-w-[80%] mx-auto px-1 md:px-4">
        {/* Header */}
        <div className="main-color text-white text-center py-2 mb-1 text-[15px] font-semibold">
          MY ACCOUNT STATEMENT (111)
        </div>

        {/* Top Row */}
        <div className="flex flex-col md:flex-row gap-2 mt-2 justify-between items-center mb-[12px]">
          {/* Date */}
          <div className="flex items-center gap-2 bg-[#e6e6e6] border border-gray-400 px-[10px] py-[4px] text-[14px]">
            {/* From Date */}
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="bg-transparent outline-none"
            />

            <span>-</span>

            {/* To Date */}
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="bg-transparent outline-none"
            />
          </div>

          {/* Tabs */}
          <div className="flex text-[14px] rounded overflow-hidden shadow-sm">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-[12px] py-[4px] ${
                activeTab === "all" ? "bg-[#0d6efd]" : "bg-[#1e73be]"
              } text-white`}
            >
              All
            </button>

            <button
              onClick={() => setActiveTab("pnl")}
              className={`px-[12px] py-[4px] border-l border-blue-300 ${
                activeTab === "pnl" ? "bg-[#0d6efd]" : "bg-[#1e73be]"
              } text-white`}
            >
              P&L
            </button>

            <button
              onClick={() => setActiveTab("account")}
              className={`px-[12px] py-[4px] border-l border-blue-300 ${
                activeTab === "account" ? "bg-[#0d6efd]" : "bg-[#1e73be]"
              } text-white`}
            >
              Account
            </button>
          </div>
        </div>

        {/* Table */}
        <div className=" w-full overflow-auto ">
          <table className="w-full statement-table border-collapse  text-[12px] md:text-[14px]">
            {/* Header */}
            <thead>
              <tr className="text-white font-semibold">
                {["DATE", "DESCRIPTION", "CREDIT", "DEBIT", "BALANCE"].map(
                  (item, i) => (
                    <th
                      key={i}
                      className="main-color px-2 py-2 md:py-[10px] border-r  border-gray-300 text-center"
                    >
                      {item}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, i) => (
                  <tr key={i} className="border-t border-gray-300 bg-[#e9e9e9]">
                    <td className="px-2 py-2 text-nowrap border-r border-gray-300">
                      {row.date}
                    </td>

                    <td className="px-2 md:px-[14px] py-2 md:py-[12px] whitespace-nowrap border-r border-gray-300">
                      {row.desc}
                    </td>

                    <td className="px-2 md:px-[10px] py-2 md:py-[12px] text-center text-blue-600 border-r border-gray-300">
                      {row.credit}
                    </td>

                    <td className="px-2 md:px-[10px] py-2 md:py-[12px] text-center text-red-600 border-r border-gray-300">
                      {row.debit}
                    </td>

                    <td className="px-2 md:px-[10px] py-2 md:py-[12px] text-center">
                      {row.balance}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-600">
                    No Data Found
                  </td>
                </tr>
              )}
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

export default Statement;
