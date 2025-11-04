'use client'

import Image from "next/image";
import Logo from "@/public/logo.png"
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { UserTypeSelection } from "./UserTypeForm";
import { CompanyForm } from "./CompanyForm";
import { JobSeekerForm } from "./JobSeeker";

type UserType = "company" | "jobSeeker" | null;

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType>(null);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserTypeSelection onSelect={handleUserTypeSelect} />;
      case 2:
        return userType === "company" ? <CompanyForm /> : <JobSeekerForm />;
      default:
        return null;
    }
  };


    return (
        <>
            <div className="flex items-center gap-4 mb-10">
                <Image src={Logo} alt="Logo" width={50} height={50} />
                <h1 className="text-4xl font-bold">Balkan<span className="text-primary">Bridge</span></h1>
            </div>

            <Card className="max-w-lg w-full">
                <CardContent className="p-6 ">
                 {renderStep ()}
                </CardContent>
            </Card>
        </>
    )
}