import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Accordion({ accordionData }) {
  const [selectedId, setSelectedId] = useState(null);



  const toggleAccordion = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto p-5">


      <div className="space-y-4">
        {accordionData.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleAccordion(item.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium hover:bg-gray-50"
            >
              <span>{item.question}</span>

              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${selectedId === item.id ? "rotate-180" : ""
                  }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${selectedId === item.id
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr]"
                }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-gray-600">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}