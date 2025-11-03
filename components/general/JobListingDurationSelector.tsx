import { ControllerRenderProps } from "react-hook-form";
import { RadioGroup } from "../ui/radio-group";

interface iAppProps {
  field: ControllerRenderProps;
}

export function JobListingDurationSelector({field}: iAppProps){
    return(
        <RadioGroup 
        onValueChange={(value) => field.onChange(parseInt(value))}
        value={field.value?.toString()}>

        </RadioGroup>
    )
}