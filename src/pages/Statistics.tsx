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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Data = {
  name: string;
  Beautiful: number;
  Intelligent: number;
  Trustworthy: number;
};

const Statistic = () => {
  const { surveyId } = useParams();
  const [data, setData] = useState<Data[]>([]);

  async function getStatistics(surveyId: string) {
    const { count: countSBeautiful } = await supabase
      .from("Voters")
      .select("*", { count: "exact", head: true })
      .eq("Survey", surveyId)
      .eq("Relationship", "Single")
      .eq("Category1", "Beautiful");

    const { count: countSSmart } = await supabase
      .from("Voters")
      .select("*", { count: "exact", head: true })
      .eq("Survey", surveyId)
      .eq("Relationship", "Single")
      .eq("Category2", "Smart");

    const { count: countSTrustworthy } = await supabase
      .from("Voters")
      .select("*", { count: "exact", head: true })
      .eq("Survey", surveyId)
      .eq("Relationship", "Single")
      .eq("Category3", "Trustworthy");

    const { count: countEBeautiful } = await supabase
      .from("Voters")
      .select("*", { count: "exact", head: true })
      .eq("Survey", surveyId)
      .eq("Relationship", "Engaged")
      .eq("Category1", "Beautiful");

    const { count: countESmart } = await supabase
      .from("Voters")
      .select("*", { count: "exact", head: true })
      .eq("Survey", surveyId)
      .eq("Relationship", "Engaged")
      .eq("Category2", "Smart");

    const { count: countETrustworthy } = await supabase
      .from("Voters")
      .select("*", { count: "exact", head: true })
      .eq("Survey", surveyId)
      .eq("Relationship", "Engaged")
      .eq("Category3", "Trustworthy");

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
  }

  useEffect(() => {
    if (surveyId) {
      getStatistics(surveyId);
    }
  }, [surveyId]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-white">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 sm:mb-4">
        Survey Statistics
      </h2>
      <div className="w-full h-full px-2 pb-4 sm:px-8 sm:pb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              interval={0}
              angle={-45}
              textAnchor="end"
              height={70}
              tick={{ fontSize: 12 }}
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
