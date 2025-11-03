"use client";

import { ControllerRenderProps } from "react-hook-form";
import { RadioGroup } from "../ui/radio-group";
import { jobListingDurationpPricing } from "@/app/utils/jobListingDurationPricing";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { FormControl } from "../ui/form";

interface iAppProps { field: ControllerRenderProps; }

export function JobListingDurationSelector({field}: iAppProps){
  return (
    <FormControl>    
    <RadioGroup
      onValueChange={(value) => field.onChange(parseInt(value))}
      value={field.value?.toString()}
      className="flex flex-col gap-4 "
    >
      {jobListingDurationpPricing.map((duration) => (
        <div key={duration.days} className="relative ">
          <RadioGroupItem
            value={duration.days.toString()}
            id={duration.days.toString()}
            className="peer sr-only"
          />
          <Label htmlFor={duration.days.toString()} className="cursor-pointer ">
            <Card
              className={`w-full p-4 border-2 transition-all ${
                field.value === duration.days
                  ? "border-primary bg-primary/10"
                  : "hover:bg-secondary/50"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{duration.days} Days</p>
                  <p className="text-sm text-muted-foreground">
                    {duration.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl">${duration.price}</p>
                  <p className="text-sm text-muted-foreground">
                    ${(duration.price / duration.days).toFixed(2)}/day
                  </p>
                </div>
              </div>
            </Card>
          </Label>
        </div>
      ))}
    </RadioGroup>
    </FormControl>
  );
}
