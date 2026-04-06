import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";

const DateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  show,
  setShow,
  onApply,
}) => {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today);
  const pickerRef = useRef();

  // ✅ Outside click close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
  const today = dayjs();
  const oneMonthAgo = dayjs().subtract(1, "month");

  setStartDate(oneMonthAgo);
  setEndDate(today);
}, []);
  const generateMonth = (month) => {
    const startDay = month.startOf("month").day();
    const daysInMonth = month.endOf("month").date();

    let days = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(month.date(i));

    return days;
  };

  const handleDateClick = (date) => {
    if (!startDate || endDate) {
      setStartDate(date);
      setEndDate(null);
    } else {
      date.isBefore(startDate) ? setStartDate(date) : setEndDate(date);
    }
  };

  const isInRange = (date) => {
    return startDate && endDate && date.isAfter(startDate) && date.isBefore(endDate);
  };

  const formatDisplay = (date) =>
    date ? date.format("DD/MM/YYYY") : "";

  return (
    <div ref={pickerRef} className="p-1 relative">
      {/* Input */}
      <div
        className="bg-white px-4 py-2 w-[250px] cursor-pointer"
        onClick={() => setShow(!show)}
      >
        {formatDisplay(startDate)} - {formatDisplay(endDate)}
      </div>

      {/* Calendar */}
      {show && (
        <div className="bg-white absolute top-11 shadow-lg mt-2 md:w-[450px] w-[250px] rounded">
          <div className="flex flex-col md:flex-row">
            {[0, 1].map((offset) => {
              const month = currentMonth.add(offset, "month");
              const days = generateMonth(month);

              return (
                <div key={offset} className="md:w-1/2 w-full p-2">
                  <div className="flex justify-between items-center mb-3">
                    <button onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}>◀</button>
                    <h2 className="font-semibold text-xs">{month.format("MMM YYYY")}</h2>
                    <button onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}>▶</button>
                  </div>

                  <div className="grid grid-cols-7 text-center text-xs font-semibold mb-2">
                    {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => <div key={d}>{d}</div>)}
                  </div>

                  <div className="grid grid-cols-7 text-xs gap-1 text-center">
                    {days.map((date, i) => {
                      if (!date) return <div key={i}></div>;

                      const isStart = startDate && date.isSame(startDate, "day");
                      const isEnd = endDate && date.isSame(endDate, "day");

                      return (
                        <div
                          key={i}
                          onClick={() => handleDateClick(date)}
                          className={`p-1 cursor-pointer rounded
                            ${isStart || isEnd ? "bg-blue-500 text-white" : ""}
                            ${isInRange(date) ? "bg-blue-200" : ""}
                          `}
                        >
                          {date.date()}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex justify-between cursor-pointer text-xs items-center border-t md:p-4 p-2">
            <div>
              {formatDisplay(startDate)} - {formatDisplay(endDate)}
            </div>

            <div className="flex gap-3">
              <button
                className="text-gray-600"
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                  setShow(false);
                }}
              >
                Cancel
              </button>

              <button
                className="bg-black cursor-pointer text-white px-4 py-1 rounded"
                onClick={() => {
                  onApply && onApply(); // ✅ send to parent
                  setShow(false);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;