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
  Smart: number;
  Trustworthy: number;
};

const Statistic = () => {
  const { surveyId } = useParams();
  const [data, setData] = useState<Data[]>([]);

  async function getStatistics(surveyId: string) {
    try {
      const queries = [
        { relationship: "Single", category: "Category1", key: "Beautiful" },
        { relationship: "Single", category: "Category2", key: "Smart" },
        { relationship: "Single", category: "Category3", key: "Trustworthy" },
        { relationship: "Engaged", category: "Category1", key: "Beautiful" },
        { relationship: "Engaged", category: "Category2", key: "Smart" },
        { relationship: "Engaged", category: "Category3", key: "Trustworthy" },
      ];

      const counts = await Promise.all(
        queries.map(({ relationship, category, key }) =>
          supabase
            .from("Voters")
            .select("*", { count: "exact", head: true })
            .eq("Survey", surveyId)
            .eq("Relationship", relationship)
            .eq(category, key)
            .then(({ count, error }) => {
              if (error) throw error;
              return { relationship, key, count: count ?? 0 };
            })
        )
      );

      const grouped = counts.reduce(
        (acc, { relationship, key, count }) => {
          if (!acc[relationship])
            acc[relationship] = {
              name: relationship,
              Beautiful: 0,
              Smart: 0,
              Trustworthy: 0,
            };
          if (key === "Beautiful") acc[relationship].Beautiful = count;
          else if (key === "Smart") acc[relationship].Smart = count;
          else if (key === "Trustworthy") acc[relationship].Trustworthy = count;
          return acc;
        },
        {} as Record<string, Data>
      );

      setData(Object.values(grouped));
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  }

  useEffect(() => {
    if (surveyId) {
      getStatistics(surveyId);
    }
  }, [surveyId]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-indigo-50 to-pink-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 sm:p-12">
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-10 tracking-wide">
          Survey Statistics
        </h2>

        {/* Contenitore con max-w e responsività */}
        <div className="w-full max-w-[700px] h-[320px] sm:h-[420px] mx-auto">
          {data.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Loading data...</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 25, right: 30, left: 20, bottom: 25 }}
                barCategoryGap="25%"
              >
                <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#4b5563", fontWeight: "600" }}
                  tickLine={false}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "#4b5563", fontWeight: "600" }}
                  tickLine={false}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9fafb",
                    borderRadius: 8,
                    borderColor: "#ddd",
                  }}
                  itemStyle={{ color: "#4f46e5", fontWeight: "700" }}
                />
                <Legend
                  verticalAlign="top"
                  wrapperStyle={{
                    fontWeight: "700",
                    color: "#4b5563",
                    marginBottom: 16,
                  }}
                />
                <Bar dataKey="Beautiful" fill="#6366f1" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Smart" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Trustworthy" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistic;
