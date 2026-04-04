import React from "react";
import { IoClose } from "react-icons/io5";

const AllMatchesPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  //  Dummy Data

  const matches = [
    {
      title: "Multan Sultans v Hyderabad Kingsmen",
      date: "Apr 01 2026",
      time: "07:30 PM",
    },
    {
      title: "Indian Premier League",
      date: "Mar 31 2025",
      time: "06:30 PM",
    },
  ];

  return (
    <div
      className="fixed inset-0  z-50 flex items-center justify-center "
      onClick={onClose}
    >
      {/* BOX */}
      <div
        className="md:w-[473px] shadow  w-[98vw] bg-[#dcdcdc] "
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="bg-black text-white px-[15px] py-[10px] flex justify-between items-center text-[16px] font-semibold tracking-wide">
          <span>ALL MATCHES</span>
          <button
            onClick={onClose}
            className="text-white text-[18px] cursor-pointer leading-none"
          >
            <IoClose />
          </button>
        </div>
        <div className="p-4 space-y-2 ">
          {matches.map((item, index) => (
            <div
              key={index}
              className="bg-black text-white rounded-[30px] py-2 px-6 text-center "
            >
              {/* TITLE */}
              <h2 className="text-[15px] font-semibold leading-tight">
                {item.title}
              </h2>

              {/* DATE & TIME */}
              <p className="text-[14px] mt-1 font-medium">
                {item.date} , {item.time}
              </p>
            </div>
          ))}
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

export default AllMatchesPopup;
