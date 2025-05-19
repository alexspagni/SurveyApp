"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import supabase from "../supabaseClient";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SurvupdatyPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [relationshipStatus, setRelationshipStatus] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const { surveyId } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("surveyCategories")
        .select("category1, category2, category3");

      if (error) {
        console.error("Error fetching categories:", error);
      } else if (data && data.length > 0) {
        const { category1, category2, category3 } = data[0];
        setCategories([category1, category2, category3].filter(Boolean));
      }
    };

    fetchCategories();
  }, []);

  const handleOptionToggle = (optionId: number, checked: boolean) => {
    if (checked) {
      if (selectedOptions.length >= 2) {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions.shift(); // rimuove il primo selezionato
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
    setSubmitted(true);

    if (!surveyId) {
      console.error("Survey ID is undefined.");
      return;
    }

    const query = new URLSearchParams({
      selectedOptions: selectedOptions.join(","),
      relationshipStatus: relationshipStatus,
      surveyId: surveyId,
    }).toString();

    navigate(`/contact?${query}`);
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
          girlfriend and your relationship status.
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
                      relationshipStatus === status ? "" : status
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

        {/* Perfect Match */}
        <div className="w-full text-center">
          <p className="text-base font-semibold mb-4">Perfect Match</p>
          <div className="flex flex-wrap justify-center gap-6">
  {categories.map((categoryName, index) => (
    <label
      key={categoryName}
      className="flex items-center space-x-2 cursor-pointer"
    >
      <input
        type="checkbox"
        checked={isSelected(index)}
        onChange={(e) => handleOptionToggle(index, e.target.checked)}
        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span className="text-base sm:text-lg font-medium">
        {categoryName}
      </span>
    </label>
  ))}
</div>

        </div>

        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-700">
            Selected Options: {selectedOptions.length}/2
          </p>
        </div>

        <Button variant="outline" className="w-full py-4 text-lg font-semibold">
          Send
        </Button>

        {submitted && (
          <p className="text-green-600 text-sm mt-4">Survey submitted!</p>
        )}
      </form>
    </div>
  );
}
