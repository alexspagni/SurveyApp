"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Survey() {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleOptionToggle = (optionId: number, checked: boolean) => {
    if (checked) {
      // Se l'utente sta selezionando l'opzione
      if (selectedOptions.length >= 2) {
        // Se ci sono già due opzioni selezionate, deseleziona casualmente una delle due
        const randomIndex = Math.floor(Math.random() * selectedOptions.length);
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions.splice(randomIndex, 1);
        setSelectedOptions([...newSelectedOptions, optionId]);
      } else {
        // Altrimenti, aggiungi semplicemente l'opzione selezionata
        setSelectedOptions([...selectedOptions, optionId]);
      }
    } else {
      // Se l'utente sta deselezionando l'opzione
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    }
  };

  const isSelected = (optionId: number) => selectedOptions.includes(optionId);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sondaggio</CardTitle>
          <CardDescription>
            Seleziona fino a due opzioni. Se ne selezioni una terza, una delle
            precedenti verrà deselezionata casualmente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              Quali sono le tue preferenze?
            </h3>
            <p className="text-sm text-gray-500">
              Seleziona massimo due opzioni
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <Label htmlFor="option1" className="text-base">
                Opzione 1
              </Label>
              <Switch
                id="option1"
                checked={isSelected(1)}
                onCheckedChange={(checked) => handleOptionToggle(1, checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="option2" className="text-base">
                Opzione 2
              </Label>
              <Switch
                id="option2"
                checked={isSelected(2)}
                onCheckedChange={(checked) => handleOptionToggle(2, checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="option3" className="text-base">
                Opzione 3
              </Label>
              <Switch
                id="option3"
                checked={isSelected(3)}
                onCheckedChange={(checked) => handleOptionToggle(3, checked)}
              />
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm font-medium">
              Opzioni selezionate: {selectedOptions.length}/2
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
