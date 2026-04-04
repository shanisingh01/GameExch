import React from "react";
import inplay from "../assets/inplay.png";
import casino from "../assets/diamond-casino.png";
import matka from "../assets/mataka.png";
import trading from "../assets/trading.png";
import statement from "../assets/statement.png";
import password from "../assets/password.png";
import freegames from "../assets/free-games.png";
import rules from "../assets/rules.png";
import ledger from "../assets/ledger.png";
import profile from "../assets/profile.png";
import { Link } from "react-router-dom";
import chat from "../assets/chat.gif";
// import support from "../assets/support.png";

const Home = () => {
  const items = [
    { title: "IN PLAY", img: inplay ,path:"/client/inplay"},
    { title: "CASINO", img: casino },
    { title: "MATKA", img: matka },
    { title: "TRADING", img: trading },
    { title: "STATEMENT", img: statement,path:"/client/statement_details" },
    { title: "CHANGE PASSWORD", img: password ,path:"/client/change_password"},
    { title: "FREE GAMES", img: freegames },
    { title: "RULES", img: rules ,path:"/client/rules"},
    { title: "MY LEDGER", img: ledger ,path:"/client/ledger"},
    { title: "PROFILE", img: profile,path:"/client/profile" },
  ];

  return (
    <div className="min-h-screen relative bg-[#edecec] flex  justify-center relative">
      
      {/* Main Grid */}
      <div className="grid py-2.5 grid-cols-2 w-full md:max-w-[90%] max-w-[100%]  md:px-6 px-0">
        
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center py-2"
          >
            
            {/* Circle */}
            <Link to={item.path} className="md:w-[110px] md:h-[110px] w-[100px] h-[100px] rounded-full main-color flex items-center justify-center ">
              
              {/* Icon Image (IMPORTANT for exact UI) */}
              <img
                src={item.img}
                alt={item.title}
                className="w-[80px] object-contain"
              />
            </Link>

            {/* Title */}
            <p className="mt-0 text-[14px] font-bold text-black tracking-wide">
              {item.title}
            </p>
          </div>
        ))}
      </div>
      <div className="fixed  cursor-pointer  bottom-5 right-5">
        <img src={chat} className="h-20 p-2 rounded-[50%]"  alt="" />
      </div>

    </div>
  );
};


export default Home