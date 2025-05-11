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
  const [surveys, setSurveys] = useState<Survey[]>([]); // 👈 Array di Survey
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("surveyCategories")
        .select("id, surveyName, Description,partecipants");

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        console.log("Fetched categories:", data);
        setSurveys(data);
      }
    };

    fetchCategories();
  }, []);
  // Dati di esempio per i sondaggi

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">I Nostri Sondaggi</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Seleziona un sondaggio per partecipare, visualizzare le statistiche o
        lasciare le tue informazioni di contatto.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
