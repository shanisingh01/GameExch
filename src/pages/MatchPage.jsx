import React from "react";
import { FaCog } from "react-icons/fa";
import { useState } from "react";
import FancyBetPopup from "../components/FancyBetPopup";
import AllMatchesPopup from "../components/AllMatchesPopup";
import { IoInformationCircle } from "react-icons/io5";

import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BetPopup from "../components/BetPopup";

const MatchPage = () => {
  const { id } = useParams();
  const [on, setOn] = useState(true);
  const [openCompletedBets, setOpenCompletedBets] = useState(false);
  const [openAllMatches, setOpenAllMatches] = useState(false);

  const [openLagaiBet, setOpenLagaiBet] = useState(false);
  const [openKhaiBet, setOpenKhaiBet] = useState(false);
  const [openNotBet, setOpenNotBet] = useState(false);
  const [openYesBet, setOpenYesBet] = useState(false);

  const navigate = useNavigate();

  const teams = [{ name: "Lucknow Super Giants" }, { name: "Delhi Capitals" }];

  return (
    <div className="min-h-screen md:px-6 px-1 bg-[#dcdcdc]">
      {/* TOP BAR */}
      <div className="h-[35px] main-color flex justify-between items-center  text-white text-[14px]">
        <div className="flex items-center gap-3 font-semibold">
          <span className="font-bold bg-[#038fde] text-[14px] px-2 py-0.5">
            TV
          </span>
          <FaCog size={18} className="cursor-pointer"/>
        </div>

        <div className="flex items-center gap-1">
          <div
            onClick={() => setOn(!on)}
            className={`relative w-[55px] h-[22px] rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
              on ? "bg-green-600" : "bg-red-500"
            }`}
          >
            {/* TEXT */}
            <span
              className={`absolute pb-0.5 top-1/2 -translate-y-1/2 text-white text-[11px] font-bold transition-all duration-300 ${
                on ? "left-1.5" : "right-1.5"
              }`}
            >
              {on ? "ON" : "OFF"}
            </span>

            {/* CIRCLE */}
            <div
              className={`absolute top-[2px] left-[2px] w-[18px] h-[18px] bg-white rounded-full shadow transform transition-all duration-300 ${
                on ? "translate-x-[32px]" : "translate-x-0"
              }`}
            />
          </div>
          <span className="font-bold bg-[#038fde] text-[14px] px-2 py-0.5">
            FS
          </span>
        </div>
      </div>

      {/* VIDEO */}
      <div className="bg-[#121212] h-[230px] flex items-center justify-center">
        <span className="text-white text-[15px] font-semibold">
          MATCH NOT LIVE, WILL BE BACK SOON...
        </span>
      </div>

      {/* BOOKMAKER TABLE */}
      <table className="w-full border-collapse text-[14px]">
        <thead>
          <tr className="main-color text-white">
            {/* Bookmaker + Min/Max */}
            <th className="border border-black text-left px-3 py-2 w-[60%]">
              <div className="flex justify-between items-center">
                <span>BookMaker</span>
                <span className="text-[13px] ">Min : 100 Max : 50000</span>
              </div>
            </th>

            {/* Lagai */}
            <th className="border border-black text-center px-3 py-2 w-[20%]">
              Lagai
            </th>

            {/* Khai */}
            <th className="border border-black text-center px-3 py-2 w-[20%]">
              Khai
            </th>
          </tr>
        </thead>

        <tbody>
          {teams.map((team, i) => (
            <tr key={i} className="bg-[#dcdcdc]">
              {/* TEAM */}
              <td className="border border-black px-4 py-2">
                <div className="font-bold text-[17px]">{team.name}</div>
                <div className="text-red-600 font-bold text-[12px] mt-1">
                  0.00
                </div>
              </td>

              {/* LAGAI */}
              <td className="border border-black text-center text-blue-600 font-semibold">
                <span
                  onClick={() => setOpenLagaiBet(true)}
                  className="cursor-pointer"
                >
                  0.00
                </span>
              </td>
              <BetPopup
                isOpen={openLagaiBet}
                onClose={() => setOpenLagaiBet(false)}
                action="LAGAI"
              />

              {/* KHAI */}
              <td className="border border-black text-center text-red-500 font-semibold">
                <span
                  onClick={() => setOpenKhaiBet(true)}
                  className="cursor-pointer"
                >
                  0.00
                </span>
              </td>
              <BetPopup
                isOpen={openKhaiBet}
                onClose={() => setOpenKhaiBet(false)}
                action="KHAI"
              />
            </tr>
          ))}
        </tbody>
      </table>

      {/* SESSION HEADER */}
      <table className="w-full border-collapse text-[14px]">
        <thead>
          <tr className="main-color text-white text-center">
            <th className="border relative border-black py-2 w-[60%]">
              SESSION
              <div
                onClick={() => navigate("/client/rules")}
                className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-white"
              >
                <IoInformationCircle size={18} />
              </div>
            </th>
            <th className="border border-black py-2 w-[20%]">NOT</th>
            <th className="border border-black py-2 w-[20%]">YES</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-[#dcdcdc] font-bold text-center">
            <td className="border text-left px-4 border-black py-2">
              <div className="font-bold text-[14px]">6 Overs Run DC</div>
              <div className="font-bold text-[14px]">Sessino limit :100000</div>
            </td>
            <td
              onClick={() => setOpenNotBet(true)}
              className="border cursor-pointer border-black py-2 text-red-600 font-semibold"
            >
              <span className="block">54</span>
              <span>1.00</span>
            </td>
            <BetPopup
              isOpen={openNotBet}
              onClose={() => setOpenNotBet(false)}
              action="NOT"
            />
            <td
              onClick={() => setOpenYesBet(true)}
              className="border cursor-pointer border-black py-2 text-blue-500 font-semibold"
            >
              <span className="block">56</span>
              <span>1.00</span>
            </td>
            <BetPopup
              isOpen={openYesBet}
              onClose={() => setOpenYesBet(false)}
              action="YES"
            />
          </tr>
        </tbody>
      </table>

      {/* MATCH BETS */}
      <div className="bg-black text-white text-center py-2 text-[14px] font-bold">
        MATCH BETS
      </div>

      <table className="w-full border-collapse text-[14px]">
        <thead>
          <tr className="main-color text-white text-center">
            <th className="border border-black py-2 w-[25%]">TEAM</th>
            <th className="border border-black py-2 w-[25%]">RATE</th>
            <th className="border border-black py-2 w-[25%]">AMOUNT</th>
            <th className="border border-black py-2 w-[25%]">MODE</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-[#dcdcdc] font-bold text-center">
            <td className="border border-black py-2">Lucknow Super Giants</td>
            <td className="border border-black py-2 text-blue-600 font-semibold">
              0.00
            </td>
            <td className="border border-black py-2 text-red-500 font-semibold">
              0.00
            </td>
            <td className="border border-black  py-2">LAGAI</td>
          </tr>
        </tbody>
      </table>

      {/* FANCY BETS */}
      <div className="bg-black text-white text-center py-2 text-[14px] font-bold mt-9">
        FANCY BETS
      </div>

      <table className="w-full border-collapse text-[14px]">
        <thead>
          <tr className="main-color text-white text-center">
            <th className="border border-black py-2 w-[20%]">SESSION</th>
            <th className="border border-black py-2 w-[20%]">RUN</th>
            <th className="border border-black py-2 w-[20%]">RATE</th>
            <th className="border border-black py-2 w-[20%]">AMOUNT</th>
            <th className="border border-black py-2 w-[20%]">MODE</th>
          </tr>
        </thead>

        <tbody>
          <tr className="bg-[#dcdcdc] font-bold text-center">
            <td className="border border-black py-2">1st Innings Total Runs</td>
            <td className="border border-black py-2">0-5</td>
            <td className="border border-black py-2 text-blue-600 font-semibold">
              0.00
            </td>
            <td className="border border-black py-2 text-red-500 font-semibold">
              0.00
            </td>
            <td className="border border-black py-2">LAGAI</td>
          </tr>
        </tbody>
      </table>
      <div className="bg-[#dcdcdc] py-10 flex flex-col items-center gap-6">
        {/* COMPLETED BETS */}
        <button
          onClick={() => setOpenCompletedBets(true)}
          className="px-5 cursor-pointer py-2 rounded-md text-white font-bold text-[14px] main-color tracking-wide"
        >
          COMPLETED BETS
        </button>
        <FancyBetPopup
          isOpen={openCompletedBets}
          onClose={() => setOpenCompletedBets(false)}
        />

        {/* ALL MATCHES */}
        <button
          onClick={() => setOpenAllMatches(true)}
          className="px-5 cursor-pointer py-2 rounded-md text-white font-bold text-[14px] main-color tracking-wide"
        >
          ALL MATCHES
        </button>
        <AllMatchesPopup
          isOpen={openAllMatches}
          onClose={() => setOpenAllMatches(false)}
        />
      </div>
    </div>
  );
};

export default MatchPage;
