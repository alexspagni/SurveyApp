"use client";


import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import supabase from "../supabaseClient";

type Data = {
  name: string; // Nome della categoria
  Beautiful: number; // Valore per la categoria "Beautiful"
  Smart: number; // Valore per la categoria "Intelligent"
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
    <Card>
      <CardHeader>
        <CardTitle>Relationship Status Statistics</CardTitle>
        <CardDescription>Comparison of three categories across single and engaged individuals</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            category1: {
              label: "Beautiful",
              color: "hsl(var(--chart-1))",
            },
            category2: {
              label: "Smart",
              color: "hsl(var(--chart-2))",
            },
            category3: {
              label: "Trustworthy",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[400px]"
        >
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="Beautiful" fill="#ff6b6b" name="Beautiful" />
            <Bar dataKey="Smart" fill="#f0ad4e" name="Smart" />
            <Bar dataKey="Trustworthy" fill="#17a2b8" name="Trustworthy" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
};

export default Statistic;
