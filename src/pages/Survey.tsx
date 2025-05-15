"use client";
import { useState } from "react";

export default function SurveyPage() {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [relationshipStatus, setRelationshipStatus] = useState<string | null>(
    null
  );

  const handleOptionToggle = (optionId: number, checked: boolean) => {
    if (checked) {
      if (selectedOptions.length >= 2) {
        const randomIndex = Math.floor(Math.random() * selectedOptions.length);
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions.splice(randomIndex, 1);
        setSelectedOptions([...newSelectedOptions, optionId]);
      } else {
        setSelectedOptions([...selectedOptions, optionId]);
      }
    } else {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    }
  };

  const isSelected = (optionId: number) => selectedOptions.includes(optionId);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-2">Survey</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          select the best two options that suit best yout boyfriend or
          girlfriend
        </p>

        {/* Stato relazionale */}
        <div className="mb-8 w-full text-center">
          <p className="text-base font-semibold mb-4">Relationship status</p>
          <div className="flex justify-center space-x-6">
            {["Single", "Engaged"].map((status) => (
              <label
                key={status}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={relationshipStatus === status}
                  onChange={() =>
                    setRelationshipStatus(
                      relationshipStatus === status ? null : status
                    )
                  }
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-base font-medium">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="w-full my-6 border-gray-200" />

        {/* Sezione Perfect Match */}
        <div className="w-full text-center">
          <p className="text-base font-semibold mb-4">Perfect Match</p>
          <div className="space-y-5">
            {[1, 2, 3].map((optionId) => (
              <div key={optionId} className="flex justify-center">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSelected(optionId)}
                    onChange={(e) =>
                      handleOptionToggle(optionId, e.target.checked)
                    }
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-base sm:text-lg font-medium">
                    Opzione {optionId}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-700">
            Selected Options: {selectedOptions.length}/2
          </p>
        </div>
      </div>
    </div>
  );
}
