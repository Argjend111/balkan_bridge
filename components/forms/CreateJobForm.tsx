"use client"

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "@/app/utils/zodSchema";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import z from "zod";
import { countryList } from "@/app/utils/countriesList";
import { SalaryRangeSelector } from "../general/SalaryRangeSelector";
import JobDescriptionEditor from "../richTextEditor.tsx/JobDescriptionEditor";



interface CreateJobFormProps {
    companyName: string;
    companyLocation: string;
    companyAbout: string;
    companyLogo: string;
    companyXAccount: string | null;
    companyWebsite: string;
}

export function CreateJobForm({
    companyAbout,
    companyLocation,
    companyLogo,
    companyXAccount,
    companyName,
    companyWebsite,
}: CreateJobFormProps) {
    const form = useForm<z.infer<typeof jobSchema>>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            benefits: [],
            companyDescription: companyAbout,
            companyLocation: companyLocation,
            companyName: companyName,
            companyWebsite: companyWebsite,
            companyXAccount: companyXAccount || "",
            employmentType: "",
            jobDescription: "",
            jobTitle: "",
            location: "",
            salaryFrom: 0,
            salaryTo: 0,
            companyLogo: companyLogo,
            listingDuration: 30,
        },
    });

    return (
        <Form {...form}>
            <form className="col-span-1   lg:col-span-2  flex flex-col gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Job Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="jobTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Job Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="employmentType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Employment Type</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full" >
                                                <SelectValue placeholder="Select Employment Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Employment Type</SelectLabel>
                                                    <SelectItem value="full-time">Full Time</SelectItem>
                                                    <SelectItem value="part-time">Part Time</SelectItem>
                                                    <SelectItem value="contract">Contract</SelectItem>
                                                    <SelectItem value="internship">Internship</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Location</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full" >
                                                <SelectValue placeholder="Select Location" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>WorldWide</SelectLabel>
                                                    <SelectItem value="worldwide">
                                                        <span>🌍</span>
                                                        <span className="pl-2">WorldWide / Remote</span>
                                                    </SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Location</SelectLabel>
                                                    {countryList.map((country) => (
                                                        <SelectItem key={country.code} value={country.name}>
                                                            <span>{country.flagEmoji}</span>
                                                            <span className="pl-2">{country.name}</span>
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>

                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormItem>
                                <FormLabel>Salary Range</FormLabel>
                                <FormControl>
                                    <SalaryRangeSelector 
                                    control={form.control}
                                    minSalary={1000}
                                    maxSalary={300000}
                                    currency="USD"
                                    step={2000}
                                    />
                                </FormControl>
                            </FormItem>
                        </div>

                        <FormField 
                        control={form.control}
                        name="jobDescription"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Job Description</FormLabel>
                                <FormControl>
                                    <JobDescriptionEditor field={field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}
