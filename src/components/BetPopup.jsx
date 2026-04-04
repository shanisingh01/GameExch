import React, { useState, useEffect } from "react";

const BetPopup = ({ isOpen, onClose ,action}) => {
  const [amount, setAmount] = useState("");
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(6);



  useEffect(() => {
  if (!isOpen) return;

  setTimer(6); // reset when popup opens

  const interval = setInterval(() => {
    setTimer((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        onClose();
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [isOpen]);

  if (!isOpen) return null;


  const amounts = [
    100, 500, 1000, 2000, 5000,
    10000, 25000, 50000, 100000, 200000,
  ];

  // Handle amount click
  const handleSelect = (amt) => {
    setAmount(amt);
    setSelected(amt);
    setError("");
  };

  // Handle input change
  const handleChange = (e) => {
    setAmount(e.target.value);
    setSelected(null);
    setError("");
  };

  // Clear input
  const handleClear = () => {
    setAmount("");
    setSelected(null);
    setError("");
  };

  // Submit
  const handleSubmit = () => {
    if (!amount || Number(amount) <= 0) {
      return setError("Enter valid amount");
    }

    console.log("Bet Amount:", amount);
    alert("Bet placed successfully!");

    handleClear();
    onClose();
  };


  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      
      {/* Modal */}
      <div className="bg-[#e9e9e9] w-[620px] rounded-[4px] mx-2 shadow-lg relative">
        
        {/* Header */}
        <div className="flex justify-end px-3 py-2 ">
          <button onClick={onClose} className="text-[20px] font-bold">×</button>
        </div>

        {/* Content */}
        <div className="px-3 mx-3 border border-[#d4a017] rounded-sm mb-2 py-2">
          
          {/* Title */}
          <div className="flex justify-between items-center mb-[10px]">
            <h2 className="text-[20px] text-[#333]">
              ODDS : LUCKNOW SUPER GIANTS Rate: [0.90]
              <span className="text-[#1e73be] ml-1">({action})</span>
            </h2>
            <div className="w-[38px] h-[38px] bg-black text-white flex items-center justify-center rounded-full text-[18px] font-bold">
              <span>{timer}</span>
            </div>
          </div>

          {/* Inner Box */}
          <div className=" ">
            
            {/* Amount */}
            <div className="flex items-center gap-3 mb-[10px]">
              <span className="w-[70px] font-bold text-[16px]">Amount</span>

              <input
                value={amount}
                onChange={handleChange}
                className="flex-1 h-[36px] px-3 bg-[#e6e6e6] border border-gray-300 rounded-[4px] outline-none text-[14px]"
              />

              <button
                onClick={handleClear}
                className="bg-[#d32f2f] cursor-pointer text-white px-[14px] h-[36px] rounded-[4px] text-[14px] font-semibold"
              >
                CLEAR
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-[13px] mb-2">{error}</p>
            )}

            {/* Amount Buttons */}
            <div className="grid grid-cols-5 gap-[14px] mb-[18px]">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleSelect(amt)}
                  className={`h-[33px] rounded-[6px] cursor-pointer text-[15px] font-semibold transition
                    ${
                      selected === amt
                        ? "bg-[#1e88c7] text-white"
                        : "bg-black text-white"
                    }`}
                >
                  {amt}
                </button>
              ))}
            </div>

            {/* Bottom Buttons */}
            <div className="flex justify-between gap-4">
              <button
                onClick={onClose}
                className="flex-1 h-[35px] cursor-pointer bg-[#e3342f] text-white rounded-[6px] text-[16px] font-semibold"
              >
                CLOSE
              </button>

              <button
                onClick={handleSubmit}
                className="flex-1 h-[35px] cursor-pointer bg-[#1e88c7] text-white rounded-[6px] text-[16px] font-semibold"
              >
                DONE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Close */}
        <div className="flex justify-end px-4 pb-4">
          <button onClick={onClose} className="bg-black cursor-pointer text-white px-[18px] py-[6px] text-[14px]">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetPopup;