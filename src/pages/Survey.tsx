"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import supabase from "../supabaseClient";
import { useParams } from "react-router-dom";
async function insertSurveyData(
  relationshipStatus: string,
  selectedOptions: number[],
  surveyId: string
) {
  const { data, error } = await supabase.from("Voters").insert([
    {
      Category1: selectedOptions[0],
      Category2: selectedOptions[1],
      Category3: selectedOptions[2],
      Relationship: relationshipStatus,
      SurveyId: surveyId,
    },
  ]);

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully:", data);
  }
}
export default function SurveyPage() {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [relationshipStatus, setRelationshipStatus] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const { surveyId } = useParams();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Example: send form data somewhere
    const data = {
      relationshipStatus,
      selectedOptions,
    };

    console.log("Submitted data:", data);

    setSubmitted(true);
    insertSurveyData(relationshipStatus, selectedOptions, surveyId);
    // Optionally, send to backend or navigate elsewhere
    // fetch('/api/survey', { method: 'POST', body: JSON.stringify(data) })
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Survey</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Select the best two options that suit best your boyfriend or
          girlfriend
        </p>

        {/* Relationship Status */}
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
                      relationshipStatus === status ? " " : status
                    )
                  }
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-base font-medium">{status}</span>
              </label>
            ))}
          </div>
        </div>

        <hr className="w-full my-6 border-gray-200" />

        {/* Perfect Match Section */}
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
                    Option {optionId}
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

        <Button variant="outline" className="w-full py-4 text-lg font-semibold">
          Invia
        </Button>

        {submitted && (
          <p className="text-green-600 text-sm mt-4">Survey submitted!</p>
        )}
      </form>
    </div>
  );
}
