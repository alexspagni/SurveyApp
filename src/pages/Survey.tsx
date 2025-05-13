"use client";

import { useState } from "react";

export default function SurveyPage() {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

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
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-2">Sondaggio</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Seleziona fino a due opzioni. Se ne selezioni una terza, una delle
          precedenti verrà deselezionata casualmente.
        </p>

        <div className="space-y-5">
          {[1, 2, 3].map((optionId) => (
            <div
              key={optionId}
              className="flex items-center justify-between sm:justify-start sm:space-x-4"
            >
              <label className="flex items-center space-x-3 cursor-pointer w-full">
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

        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-700">
            Opzioni selezionate: {selectedOptions.length}/2
          </p>
        </div>
      </div>
    </div>
  );
}
