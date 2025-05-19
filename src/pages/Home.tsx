import { SurveyCard } from "./SurveyCard";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

type Survey = {
  id: number;
  surveyName: string;
  Description: string;
  partecipants: number;
};

export default function Home() {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("surveyCategories")
        .select("id, surveyName, Description, partecipants");

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setSurveys(data);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Surveys</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Select a survey to participate or view statistics.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {surveys.map((survey) => (
          <SurveyCard
            key={survey.id}
            survey={survey}
            partecipants={survey.partecipants}
          />
        ))}
      </div>
    </main>
  );
}
