"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import { useSearchParams } from "react-router-dom";

async function insertSurveyData(
  relationshipStatus: string,
  selectedOptions: number[],
  surveyId: string,
  email: string, phone: string, firstName: string, lastName: string,sex: string
) {
  let category1 = null;
  let category2 = null;
  let category3 = null;

  if (selectedOptions.includes(0)) category1 = "Beautiful";
  if (selectedOptions.includes(1)) category2 = "Smart";
  if (selectedOptions.includes(2)) category3 = "Trustworthy";

  const { data, error } = await supabase.from("Voters").insert([
    {
      Category1: category1,
      Category2: category2,
      Category3: category3,
      Relationship: relationshipStatus,
      Survey: surveyId,
      Email: email,
      Number: phone,
      Name: firstName,
      Surname: lastName,
      Sex:sex

      
    },
  ]);

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully:", data);
    updateParticipants(surveyId);
  }
}




async function updateParticipants(surveyId: string) {
  const { count, error: countError } = await supabase
    .from("Voters")
    .select("*", { count: "exact", head: true })
    .eq("Survey", surveyId);

  if (countError) {
    console.error("Error counting responses:", countError);
    return;
  }

  const { error: updateError } = await supabase
    .from("surveyCategories")
    .update({ partecipants: count })
    .eq("id", surveyId);

  if (updateError) {
    console.error("Error updating survey_stats:", updateError);
    return;
  }

  console.log(`Updated survey_stats with response count = ${count} for survey_id = ${surveyId}`);
}

export default function ContactFormPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const navigate = useNavigate();
  const [URLSearchParams] = useSearchParams();
  const surveyId = URLSearchParams.get("surveyId");
  const relationshipStatus = URLSearchParams.get("relationshipStatus") || "";
  const optionsSelected = URLSearchParams.get("selectedOptions") || "";
  const options = optionsSelected ? optionsSelected.split(",").map(Number) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setErrors(null);
    updateParticipants(surveyId || "");
    insertSurveyData(relationshipStatus, options, surveyId || "", email|| "", phone|| "", firstName|| "", lastName|| "" , gender || "");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center">Contacts Information</h2>

        {submitted ? (
          <p className="text-green-600 text-center">Data processed</p>
        ) : (
          <>
            {errors && <p className="text-red-500 text-sm text-center">{errors}</p>}

            {/* Email (non obbligatoria) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Numero di telefono */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Cognome */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Surname</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Sesso */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Gender</p>
              <div className="flex justify-center space-x-6">
                {["Male", "Female", "Other"].map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={gender === option}
                      onChange={() => setGender(gender === option ? null : option)}
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-10 text-center">
              <Button variant="outline" className="w-full py-4 text-lg font-semibold">
                Send
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
