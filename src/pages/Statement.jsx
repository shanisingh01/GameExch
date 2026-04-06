import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../main";
import { useSelector } from "react-redux";
import DateRangePicker from "../components/DateRangePicker";
import dayjs from "dayjs";

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
  const user = useSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [show, setShow] = useState(false);
  const [statementData, setStatementData] = useState([]);

  useEffect(() => {
  const today = dayjs();
  const oneMonthAgo = dayjs().subtract(1, "month");

  setStartDate(oneMonthAgo);
  setEndDate(today);
}, []);
  // 🔥 Filter Logic
const filteredData =
  activeTab === "all"
    ? statementData
    : statementData.filter(
        (item) => item.filter?.toLowerCase() === activeTab.toLowerCase(),
      );

  const fetchData = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api-v1/Client/statement_details`,
        {
          client_id: user.client_id,
          auth_key: user.auth_key,
          start_date: startDate?.format("YYYY-MM-DD"),
          end_date: endDate?.format("YYYY-MM-DD"),
        },
      );
      setStatementData(res.data.data.statement);
    } catch (error) {
      console.log(error);
    }
  };
useEffect(() => {
  if (startDate && endDate) {
    fetchData();
  }
}, [startDate, endDate]);
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
          <DateRangePicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            show={show}
            setShow={setShow}
            onApply={fetchData}
          />

          {/* Tabs */}
          <div className="flex text-[14px] rounded overflow-hidden shadow-sm">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-[12px] py-[4px] cursor-pointer ${
                activeTab === "all" ? "bg-[#0d6efd]" : "bg-[#1e73be]"
              } text-white`}
            >
              All
            </button>

            <button
              onClick={() => setActiveTab("p&l")}
              className={`px-[12px] py-[4px] border-l cursor-pointer border-blue-300 ${
                activeTab === "p&l" ? "bg-[#0d6efd]" : "bg-[#1e73be]"
              } text-white`}
            >
              P&L
            </button>

            <button
              onClick={() => setActiveTab("account")}
              className={`px-[12px] py-[4px] border-l cursor-pointer border-blue-300 ${
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
        
        {/* DATE */}
        <td className="px-2 py-2 text-nowrap border-r border-gray-300">
          {dayjs(row.added_at).format("DD MMM YY")}
        </td>

        {/* DESCRIPTION */}
        <td className="px-2 md:px-[14px] py-2 md:py-[12px] whitespace-nowrap border-r border-gray-300">
          {row.description}
        </td>

        {/* CREDIT */}
        <td className="px-2 md:px-[10px] py-2 md:py-[12px] text-center text-blue-600 border-r border-gray-300">
          {row.credit}
        </td>

        {/* DEBIT */}
        <td className="px-2 md:px-[10px] py-2 md:py-[12px] text-center text-red-600 border-r border-gray-300">
          {row.debit}
        </td>

        {/* BALANCE */}
        <td className="px-2 md:px-[10px] py-2 md:py-[12px] text-center">
          {row.total}
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
