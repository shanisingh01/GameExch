import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

function RulesPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
      onClick={() => setOpen(false)} //  outside click
    >
      {/* MODAL BOX */}
      <div
        className="w-[600px] max-w-[95%] bg-white rounded shadow-lg overflow-hidden transform transition-all duration-300 scale-100 animate-scaleIn"
        onClick={(e) => e.stopPropagation()} //  prevent close inside click
      >
        {/* HEADER */}
        <div className="bg-gradient-to-b from-[#1c5fa8] to-[#000814] text-white px-4 py-3 flex justify-between items-center">
          <h2 className="text-[18px] font-semibold">Gameexch Rules</h2>

          <button
            onClick={() => setOpen(false)}
            className="text-white cursor-pointer text-xl font-bold"
          >
            <IoClose />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 bg-[#f5f5f5] text-gray-600">
          <h3 className="text-[20px] font-bold mb-2 text-black">
            प्रिय ग्राहक,
          </h3>

          <p className="text-[16px] font-bold mb-4">
            आपने अनुरोध है हमारी कोई डुप्लीकेट साइट नहीं है हमारी आधिकारिक साइट
            'gameexch.in' से लॉगिन करें। लॉगिन करने से पहले साइट का नाम जरूर देख
            लें। आपके समर्थन के लिए धन्यवाद। टीम gameexch.
          </p>

          <h3 className="text-[18px] font-bold mb-2 text-black">
            Dear Client,
          </h3>

          <p className="text-[16px] font-bold">
            We don't have any duplicate site, You are requested to login with
            our official site gameexch.in only. Please check the site name
            before you login. Thanks for your support. Team gameexch
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={() => setOpen(false)}
            className="bg-[#2172c2] text-white cursor-pointer px-4 py-1.5 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default RulesPopup;
