import { Control } from "react-hook-form";
import { Slider } from "../ui/slider";

interface iAppProps {
    control: Control
    minSalary:number;
    maxSalary:number;
    step:number;
    currency:string;
}

export function SalaryRangeSelector({control,currency,maxSalary,minSalary,step}: iAppProps){
  return (
      <div className="w-full space-y-4">
            <Slider max={100} step={1}/>
    </div>
  )
}