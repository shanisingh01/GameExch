import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../main";
import { toast } from "react-toastify";
import useFetchUserInfo from "../costumHooks/useFetchUserInfo";

const ProfilePage = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const user = useSelector((state) => state.user.user);

  const [betOn, setBetOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refetch, loading: userInfoLoading } = useFetchUserInfo(); // custom hook for refetching user info after update

  useEffect(() => {
    refetch(); //  ALWAYS run on load
  }, [betOn]);

  const navigate = useNavigate();

  //  Run only once to initialize
  const initialized = useRef(false);

  useEffect(() => {
    if (userInfoLoading) return;
    if (userInfo && !initialized.current) {
      setBetOn(userInfo?.bet_modal == 1); // handle string/number
      initialized.current = true;
    }
  }, [userInfo]);

  //  Toggle Handler (ONLY place API is called)
  const handleToggle = async () => {
    if (loading) return; // prevent multiple clicks

    const newValue = !betOn;
    setBetOn(newValue); // optimistic UI

    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/api-v1/Client/update_bet_modal`,
        {
          client_id: user.client_id,
          auth_key: user.auth_key,
          bet_modal: newValue ? 1 : 0, //  correct value
        },
      );

      if (res.data.status === false) {
        toast.error(res.data.message);
        setBetOn(!newValue); // rollback
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setBetOn(!newValue); // rollback on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#e8e4e4] min-h-screen">
      <div className="md:w-[88%] w-[95%] mx-auto text-xs font-semibold text-[#686565]">
        {/* RATE INFORMATION */}
        <div className="main-color text-white text-xs text-center py-2 font-semibold border-b border-black">
          RATE INFORMATION
        </div>

        {/* RATE ROW */}
        <div className="grid grid-cols-12 border border-[#b5b5b5]">
          <div className="bg-[#f1eeee] col-span-6 px-2 py-2 border-r border-[#b5b5b5]">
            Rate Difference :
          </div>

          <div className="bg-[#f1eeee] flex col-span-3 items-center justify-center border-r border-[#b5b5b5]">
            <select className="border border-[#999] px-1 py-1 text-[13px]">
              <option>0</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <div className="bg-[#f1eeee] col-span-3 flex items-center justify-center">
            <button className="bg-[#008000] cursor-pointer text-white font-bold w-full py-1.5 m-1">
              UPDATE
            </button>
          </div>
        </div>

        {/* BET MODAL */}
        <div className="text-center flex items-center justify-between font-bold py-3">
          <div className="text-black text-[15px]">Bet Modal On/Off</div>

          <div
            onClick={() => {
              if (!loading) handleToggle();
            }}
            className={`relative w-[60px] h-[24px] rounded-full transition-all duration-300
              ${betOn ? "bg-[#008000]" : "bg-red-500"}
              ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            {/* TEXT */}
            <span
              className={`absolute top-1/2 -translate-y-1/2 text-white text-[12px] font-bold ${
                betOn ? "left-2" : "right-2"
              }`}
            >
              {loading ? "..." : betOn ? "ON" : "OFF"}
            </span>

            {/* CIRCLE */}
            <div
              className={`absolute top-[3px] left-[3px]  w-[18px] h-[18px] bg-white rounded-full transition-all duration-300 ${
                betOn ? "translate-x-[35px]" : "translate-x-0"
              }`}
            />
          </div>
        </div>

        {/* PERSONAL INFO */}
        <div className="main-color text-white text-center py-2 font-semibold text-xs border-b border-black">
          PERSONAL INFORMATION
        </div>

        <div className="border border-[#b5b5b5]">
          {[
            ["Client Code", userInfo?.username],
            ["Client Name", userInfo?.name],
            [
              "Chips",
              Number(userInfo?.main_wallet) +
                Number(userInfo?.curr_wallet) -
                Number(userInfo?.used_wallet),
            ],
            ["Contact No", userInfo?.contact],
            ["Date Of Joining", userInfo?.created_at],
            ["Address", "India"],
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-2 border-t border-[#c9c9c9]">
              <div className="bg-[#f1eeee] px-2 py-2 border-r border-[#c9c9c9]">
                {row[0]} :
              </div>
              <div className="bg-[#f1eeee] px-2 py-2 text-[#555]">{row[1]}</div>
            </div>
          ))}
        </div>
        {/* COMPANY INFO */}
        <div className="main-color text-white text-center py-2 font-semibold text-xs border-b border-black mt-1">
          COMPANY INFORMATION
        </div>

        <div className="grid grid-cols-2 border border-[#b5b5b5]">
          <div className="bg-[#f1eeee] px-[10px] py-[10px] border-r border-[#c9c9c9]">
            HELP LINE NO :
          </div>
          <div className="bg-[#f1eeee] px-[10px] py-[10px] text-[#555]">
            +91-1234567890
          </div>
        </div>

        {/* BACK BUTTON */}
        <div className="mt-5">
          <button
            onClick={() => navigate("/client")}
            className="w-full cursor-pointer main-color text-white py-[8px] font-bold border border-black"
          >
            BACK TO MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
