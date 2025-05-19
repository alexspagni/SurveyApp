"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import supabase from "../supabaseClient";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

type Data = {
  name: string; // Nome della categoria
  Beautiful: number; // Valore per la categoria "Beautiful"
  Intelligent: number; // Valore per la categoria "Intelligent"
  Trustworthy: number; // Valore per la categoria "Trustworthy"
};

const Statistic = () => {
  const { surveyId } = useParams();

  const [data, setData] = useState<Data[]>([]);

  async function getStatistics(surveyId: string) {
    const { count: countSBeautiful, error: countBeautifulError } = await supabase
      .from("Voters")
      .select("*", { count: "exact", head: true })
      .eq("Survey", surveyId)
      .eq("Relationship", "Single")
      .eq("Category1", "Beautiful");

    if (countBeautifulError) {
      console.error("Error counting Beautiful responses:", countBeautifulError);
      return;
    }

    const { count: countSSmart, error: countSmartError } = await supabase
      .from("Voters")
      .select("*", { count: "exact", head: true })
      .eq("Survey", surveyId)
      .eq("Relationship", "Single")
      .eq("Category2", "Smart");

    if (countSmartError) {
      console.error("Error counting Intelligent responses:", countSmartError);
      return;
    }

    const { count: countSTrustworthy, error: countTrustworthyError } = await supabase
      .from("Voters")
      .select("*", { count: "exact", head: true })
      .eq("Survey", surveyId)
      .eq("Relationship", "Single")
      .eq("Category3", "Trustworthy");

    if (countTrustworthyError) {
      console.error("Error counting Intelligent responses:", countTrustworthyError);
      return;
    }

    const { count: countEBeautiful, error: countBeautifulError2 } = await supabase
      .from("Voters")
      .select("*", { count: "exact", head: true })
      .eq("Survey", surveyId)
      .eq("Relationship", "Engaged")
      .eq("Category1", "Beautiful");

    if (countBeautifulError2) {
      console.error("Error counting Beautiful responses:", countBeautifulError2);
      return;
    }

    const { count: countESmart, error: countSmartError2 } = await supabase
      .from("Voters")
      .select("*", { count: "exact", head: true })
      .eq("Survey", surveyId)
      .eq("Relationship", "Engaged")
      .eq("Category2", "Smart");

    if (countSmartError2) {
      console.error("Error counting Intelligent responses:", countSmartError2);
      return;
    }

    const { count: countETrustworthy, error: countTrustworthyError2 } = await supabase
      .from("Voters")
      .select("*", { count: "exact", head: true })
      .eq("Survey", surveyId)
      .eq("Relationship", "Engaged")
      .eq("Category3", "Trustworthy");

    if (countTrustworthyError2) {
      console.error("Error counting Trustworthy responses:", countTrustworthyError2);
      return;
    }

    const aggregatedData = [
      {
        name: "Single",
        Beautiful: countSBeautiful ?? 0,
        Intelligent: countSSmart ?? 0,
        Trustworthy: countSTrustworthy ?? 0,
      },
      {
        name: "Engaged",
        Beautiful: countEBeautiful ?? 0,
        Intelligent: countESmart ?? 0,
        Trustworthy: countETrustworthy ?? 0,
      },
    ];
    setData(aggregatedData);
    console.log(aggregatedData);
  }

  useEffect(() => {
    if (surveyId) {
      getStatistics(surveyId);
    }
  }, [surveyId]);

 return (
  <div>
    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
      Survey Statistics
    </h2>

    <div className="w-[300px] h-[300px] sm:h-[700px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            textAnchor="middle"
            tick={{ fontSize: 14 }}
            height={40}
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Beautiful" fill="#6366f1" />
          <Bar dataKey="Intelligent" fill="#10b981" />
          <Bar dataKey="Trustworthy" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
};

export default Statistic;
