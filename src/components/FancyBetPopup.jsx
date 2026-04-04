import React from "react";
import { IoClose } from "react-icons/io5";

const FancyBetPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // 🔹 Dummy Data
  const data = [
    {
      runner: "India",
      date: "02 Apr 2026",
      run: "120",
      rate: "1.85",
      result: "Win",
      amount: "₹1000",
      mode: "Back",
      pnl: "+₹850",
    },
    {
      runner: "Australia",
      date: "02 Apr 2026",
      run: "98",
      rate: "2.10",
      result: "Lose",
      amount: "₹500",
      mode: "Lay",
      pnl: "-₹500",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center "
      onClick={onClose}
    >
      {/* BOX */}
      <div
        className="md:w-[493px] shadow  w-[98vw] bg-[#dcdcdc] "
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="bg-black text-white px-[15px] py-[10px] flex justify-between items-center text-[16px] font-semibold tracking-wide">
          <span>COMPLETED FANCY BETS</span>
          <button
            onClick={onClose}
            className="text-white text-[18px] cursor-pointer leading-none"
          >
            <IoClose />
          </button>
        </div>
        <div className="p-3">
          {/* SUB HEADER */}
          <div className="bg-black text-white  px-[15px] py-2 flex justify-between items-center text-[15px] font-semibold border-t border-[#333]">
            <span>COMPLETED FANCY BETS</span>
            <span className="pr-[5px]">{data.length}</span>
          </div>

          {/* TABLE */}
          <div className="border-t  overflow-x-auto border-black">
            <table className=" w-[100%] text-[12px] overflow-x-auto text-center border-collapse">
              {/* THEAD */}
              <thead className="main-color text-white">
                <tr>
                  {[
                    "RUNNER",
                    "DATE",
                    "RUN",
                    "RATE",
                    "RESULT",
                    "AMOUNT",
                    "MODE",
                    "P&L",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className="py-[4px] px-2 border-r border-black last:border-r-0 font-bold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* TBODY */}
              <tbody className="bg-[#dcdcdc]">
                {data.map((item, i) => (
                  <tr key={i} className="border-t border-gray-400">
                    <td className="py-2 border-r border-gray-400">
                      {item.runner}
                    </td>
                    <td className="py-2 text-nowrap px-1 border-r border-gray-400">
                      {item.date}
                    </td>
                    <td className="py-2 border-r border-gray-400">
                      {item.run}
                    </td>
                    <td className="py-2 border-r border-gray-400">
                      {item.rate}
                    </td>
                    <td className="py-2 border-r border-gray-400">
                      {item.result}
                    </td>
                    <td className="py-2 border-r border-gray-400">
                      {item.amount}
                    </td>
                    <td className="py-2 border-r border-gray-400">
                      {item.mode}
                    </td>
                    <td
                      className={`py-2 ${
                        item.pnl.includes("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.pnl}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* FOOTER */}
        <div className="flex justify-end px-[15px] py-[7px]">
          <button
            onClick={onClose}
            className="bg-black cursor-pointer text-white px-[14px] py-[4px] text-[13px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FancyBetPopup;
