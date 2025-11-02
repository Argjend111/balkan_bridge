"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema } from "@/app/utils/zodSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countryList } from "@/app/utils/countriesList";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/components/general/UploadThingReexported";
import { createCompany } from "@/app/actions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import z from "zod";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import '@uploadthing/react/styles.css';

export function CompanyForm() {
    const form = useForm<z.infer<typeof companySchema>>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            name: "",
            about: "",
            location: "",
            logo: "",
            website: "",
            xAccount: "",
        },
    });

    const [pending, setPending] = useState(false);

    async function onSubmit(values: z.infer<typeof companySchema>) {
        try {
            setPending(true);
            await createCompany(values);
        } catch (error) {
            console.log(error);
            if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setPending(false);
        }
    }

    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter company name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Location</FormLabel>
                                <Select onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Location" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>WorldWide</SelectLabel>
                                            <SelectItem value="worldwide">
                                                <span></span>
                                                <span>Worldwide / Remote</span>
                                            </SelectItem>
                                        </SelectGroup>
                                        <SelectGroup>
                                            <SelectLabel>Location</SelectLabel>
                                            {countryList.map((country) => (
                                                <SelectItem value={country.name} key={country.code}>
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://your-company.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="xAccount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>X (Twitter) Account</FormLabel>
                                <FormControl>
                                    <Input placeholder="@yourcompany" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>About</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us about your company..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel>Company Logo</FormLabel>
                            <FormControl>
                                <div>
                                    {field.value ? (
                                        <div className="relative w-fit">
                                            <Image
                                                src={field.value}
                                                alt="Company Logo"
                                                width={100}
                                                height={100}
                                                className="rounded-lg"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute -top-2 -right-2 "
                                                onClick={() => field.onChange("")}
                                            >
                                                <XIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <UploadDropzone
                                            endpoint="imageUploader"
                                            onClientUploadComplete={(res) => {
                                                field.onChange(res[0].url);
                                                toast.success("Logo uploaded successfully!");
                                            }}
                                            onUploadError={() => {
                                                toast.error("Something went wrong. Please try again.");
                                            }}
                                            className="[&_button]:cursor-pointer  
[&_button]:bg-primary!
[&_button]:text-white!
[&_button]:hover:bg-primary/90!
[&_button]:rounded-(--radius-md)!
[&_button]:border!
[&_button]:border-(--color-border)!
[&_label]:hover:text-primary!
[&_svg]:h-15!
[&_svg]:w-15!
border-primary!
"

                                        />

                                    )}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full cursor-pointer" disabled={pending}>
                    {pending ? "Submitting..." : "Continue"}
                </Button>
            </form>
        </Form>
    );
}
