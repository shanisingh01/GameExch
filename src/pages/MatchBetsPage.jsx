import React from "react";

const fancyData = [
  {
    runner: "20 over run QG",
    date: "27-03-26 10:51:14 PM",
    rate: 1,
    run: 168,
    result: 167,
    amount: 1300,
    mode: "YES",
    pl: -1300,
  },
  {
    runner: "19 over run QG",
    date: "27-03-26 10:46:24 PM",
    rate: 1.75,
    run: 154,
    result: 152,
    amount: 635,
    mode: "YES",
    pl: -635,
  },
  {
    runner: "19 over run QG",
    date: "27-03-26 10:45:14 PM",
    rate: 1,
    run: 153,
    result: 152,
    amount: 635,
    mode: "YES",
    pl: -635,
  },
];

const matchBetsData = [
  {
    team: "Sri Lanka W",
    wonBy: "Sri Lanka W",
    date: "23-02-26 01:59:21 AM",
    rate: 0.3,
    amount: 2000,
    mode: "KHAI",
    pl: -600,
  },
  {
    team: "Sri Lanka W",
    wonBy: "Sri Lanka W",
    date: "23-02-26 01:26:29 AM",
    rate: 0.5,
    amount: 2000,
    mode: "KHAI",
    pl: -1000,
  },
];
const SectionBar = ({ title }) => (
  <div className="main-color text-white text-center py-1.5 font-semibold text-[14px]">
    {title}
  </div>
);

const ResultRow = ({ title, value, isLoss }) => (
  <>
    <SectionBar title={title} />
    <div
      className={`text-center py-1.5 bg-white text-[14px] font-semibold ${
        isLoss ? "text-red-500" : "text-[#52b5e1]"
      }`}
    >
      {value}
    </div>
  </>
);

const MatchBetsPage = () => {
  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="max-w-[88%] mx-auto">
        {/* MATCH BETS */}
        <div className="bg-[#5aa6c8] text-white text-center py-3 font-semibold text-[15px]">
          MATCH BETS
        </div>
        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full statement-table text-[13px] border">
            <thead>
              <tr className="bg-gradient-to-b from-[#1f6fb2] to-[#0b2f5b] text-white">
                {[
                  "TEAM",
                  "WON BY",
                  "DATE",
                  "RATE",
                  "AMOUNT",
                  "MODE",
                  "P&L",
                ].map((head, i) => (
                  <th key={i} className="py-2 px-2 border">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
               { matchBetsData.map((item, index) => (
                <tr key={index} className="bg-gray-100 text-center border">
                  <td className="border px-2 py-2 text-left">{item.team}</td>
                  <td className="border px-2 py-2 text-left">{item.wonBy}</td>
                  <td className="border px-2 py-2">{item.date}</td>
                  <td className="border px-2 py-2">{item.rate}</td>
                  <td className="border px-2 py-2">{item.amount}</td>
                  <td className="border px-2 py-2">{item.mode}</td>
                  <td className="border px-2 py-2 text-red-500">{item.pl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {matchBetsData.length === 0 && (
         <div className="bg-gray-100 text-center py-4 text-blue-400 text-[14px] font-bold ">
          NO ANY MATCH BET'S
        </div>
        )}

        {/* FANCY BETS HEADER */}
        <div className="bg-[#dc143c] text-white text-center py-2 font-semibold text-[14px] mt-3">
          FANCY BETS
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full statement-table  text-[13px] ">
            <thead>
              <tr className="main-color text-white">
                {[
                  "RUNNERs",
                  "DATE",
                  "RATE",
                  "RUN",
                  "RESULT",
                  "AMOUNT",
                  "MODE",
                  "P&L",
                ].map((head, i) => (
                  <th key={i} className="py-2 px-2 border">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {fancyData.map((item, index) => (
                <tr
                  key={index}
                  className="bg-gray-100 statement-table  text-center"
                >
                  <td className=" px-2 py-2 text-left">{item.runner}</td>
                  <td className="border px-2 py-2">{item.date}</td>
                  <td className="border px-2 py-2">{item.rate}</td>
                  <td className="border px-2 py-2">{item.run}</td>
                  <td className="border px-2 py-2">{item.result}</td>
                  <td className="border px-2 py-2">{item.amount}</td>
                  <td className="border px-2 py-2">{item.mode}</td>
                  <td className="border px-2 py-2 text-red-500">{item.pl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
                {fancyData.length === 0 && (
         <div className="bg-gray-100 text-center py-4 text-black text-[14px] font-bold ">
          NO ANY SESSION BET'S
        </div>
        )}

        {/* RESULT SECTIONS */}
        <div className="mt-4 ">
          <ResultRow title="Match Plus Minus" value="0/- Coins." />
          <ResultRow
            title="Fancy Plus Minus"
            value="You Lost 2570/- Coins."
            isLoss
          />
          <ResultRow title="Total Commission" value="0/- Coins." />
          <ResultRow title="Mob. App Charges" value="0/- Coins." isLoss />
          <ResultRow
            title="Net Plus Minus"
            value="You Lost 2570/- Coins."
            isLoss
          />
        </div>

        {/* BACK BUTTON */}
        <div className="main-color text-white text-center py-2 mt-2 text-[14px] cursor-pointer">
          BACK TO LIST
        </div>
      </div>
    </div>
  );
};

export default MatchBetsPage;
