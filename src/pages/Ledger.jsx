import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../main";

const Ledger = () => {
  const user = useSelector((state) => state.user.user);

  const [ledgerData, setLedgerData] = useState([]); // ✅ always array
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch API
  const fetchData = async () => {
    try {
      setLoading(true);

      if (!user) return;

      const res = await axios.post(
        `${BASE_URL}/api-v1/Client/ledger`,
        {
          client_id: user.client_id,
          auth_key: user.auth_key,
        }
      );

      setLedgerData(res?.data?.data || []); // ✅ safe fallback
    } catch (error) {
      console.log(error);
      setLedgerData([]); // ✅ prevent crash
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Call API when user available
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  // ✅ SAFE DATA
  const safeData = Array.isArray(ledgerData) ? ledgerData : [];

  // ✅ Summary Calculation
  const lena = safeData.reduce(
    (acc, cur) => acc + Number(cur?.won || 0),
    0
  );

  const dena = safeData.reduce(
    (acc, cur) => acc + Number(cur?.lost || 0),
    0
  );

  const balance = safeData.reduce(
    (acc, cur) => acc + Number(cur?.balance || 0),
    0
  );

  // ⏳ Loading UI
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#f0f0f0] text-xs min-h-screen py-6">
      <div className="max-w-[100%] md:max-w-[80%] mx-auto">

        {/* Header */}
        <div className="main-color text-white text-center py-2 font-bold">
          MY LEDGER
        </div>

        {/* Summary */}
        <div className="flex font-semibold border-4 border-[#eae8e8] justify-between text-center bg-[#eae8e8] py-6 px-4">
          <div>
            Lena: <span className="text-green-600">{lena.toFixed(2)}</span>
          </div>
          <div>
            Dena: <span className="text-red-600">{dena.toFixed(2)}</span>
          </div>
          <div>
            Balance:{" "}
            <span className={balance < 0 ? "text-red-600" : "text-green-600"}>
              {balance.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-auto">
          <table className="w-full statement-table border-collapse">
            
            {/* Header */}
            <thead>
              <tr className="text-white">
                {["DESCRIPTION", "WON BY", "WON", "LOST", "HISAB"].map(
                  (item, i) => (
                    <th key={i} className="main-color px-8 py-3 text-center">
                      {item}
                    </th>
                  )
                )}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {safeData.length > 0 ? (
                safeData.map((row, i) => {
                  const won = Number(row?.won || 0);
                  const lost = Number(row?.lost || 0);
                  const bal = Number(row?.balance || 0);

                  return (
                    <tr
                      key={i}
                      className="bg-[#dcdcdc] border-t border-gray-300 font-medium"
                    >
                      {/* Description */}
                      <td className="px-3 text-nowrap cursor-pointer hover:text-[#146cc4] py-4 border-r border-gray-300 text-blue-600">
                        {row?.title || "-"} ({row?.added_at || "-"})
                      </td>

                      {/* Won By */}
                      <td className="px-3 py-4 text-nowrap border-r border-gray-300 text-center">
                        {row?.won_by_team_name || "-"}
                      </td>

                      {/* Won */}
                      <td
                        className={`px-3 py-4 border-r border-gray-300 text-center ${
                          won > 0 ? "text-green-600" : ""
                        }`}
                      >
                        {won.toFixed(2)}
                      </td>

                      {/* Lost */}
                      <td className="px-3 py-4 border-r border-gray-300 text-center">
                        {lost.toFixed(2)}
                      </td>

                      {/* Balance */}
                      <td
                        className={`px-3 py-4 text-center ${
                          bal < 0 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {bal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-600">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-10">
          <Link to="/client">
            <button className="w-full main-color hover:bg-black text-white py-2 text-[14px] font-semibold">
              BACK TO MAIN MENU
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Ledger;