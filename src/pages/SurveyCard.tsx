import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Users } from "lucide-react";

type Survey = {
  id: number;
  surveyName: string;
  Description: string;
  partecipants: number;
};

export function SurveyCard({
  survey,
  partecipants,
}: {
  survey: Survey;
  partecipants: number;
}) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{survey.surveyName}</CardTitle>
        <CardDescription>{survey.Description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Users className="h-4 w-4" />
          <span>{partecipants} Participants</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button asChild className="w-full">
          <Link to={`/survey/${survey.id}`}>Join the survey</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/statistics/${survey.id}`}>
            <BarChart3 className="h-4 w-4 mr-2" />
            View Statistics
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
