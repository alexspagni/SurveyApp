"use client";

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams } from "react-router-dom"
import supabase from "../supabaseClient"


type Data = {
  name: string; // Nome della categoria
  Beautiful: number; // Valore per la categoria "Beautiful"
  Smart: number; // Valore per la categoria "Intelligent"
  Trustworthy: number; // Valore per la categoria "Trustworthy"
};

const Statistic = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])
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
        Smart: countSSmart ?? 0,
        Trustworthy: countSTrustworthy ?? 0,
      },
      {
        name: "Engaged",
        Beautiful: countEBeautiful ?? 0,
        Smart: countESmart ?? 0,
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
 <div className="container mx-auto py-4 px-2">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Statistics</h1>
      <Card className="w-full">
        <CardHeader className="py-3">
          <CardTitle className="text-lg md:text-xl text-center">Relationship Status</CardTitle>
          <CardDescription className="text-sm text-center">
            Categories comparison across relationship statuses
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 md:p-4">
          <div className="w-full" style={{ height: isMobile ? "300px" : "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: isMobile ? 0 : 10,
                  bottom: isMobile ? 60 : 40,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: isMobile ? 12 : 14 }} />
                <YAxis tick={{ fontSize: isMobile ? 12 : 14 }} width={isMobile ? 30 : 40} />
                <Tooltip />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{
                    paddingTop: isMobile ? "10px" : "20px",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                />
                <Bar dataKey="Beautiful" name="Beautiful" fill="#8884d8" barSize={isMobile ? 15 : 30} />
                <Bar dataKey="Smart" name="Smart" fill="#82ca9d" barSize={isMobile ? 15 : 30} />
                <Bar dataKey="Trustworthy" name="Trustworthy" fill="#ffc658" barSize={isMobile ? 15 : 30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
);
};


export default Statistic;
