import { createJobSeeker } from "@/app/actions"
import { jobSeekerSchema } from "@/app/utils/zodSchema"
import { UploadDropzone } from "@/components/general/UploadThingReexported"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { XIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import {z} from "zod"
import '@uploadthing/react/styles.css';
import PdfImage from '@/public/pdf.png'

export function JobSeekerForm(){
    const form = useForm<z.infer<typeof jobSeekerSchema>>({
        resolver: zodResolver(jobSeekerSchema),
        defaultValues: {
            about:"",
            name:"",
            resume:"",
        }
    })
        
    const [pending, setPending] = useState(false);

    async function onSubmit(values: z.infer<typeof jobSeekerSchema>) {
        try {
            setPending(true);
            await createJobSeeker(values);
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
                <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short in Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us about yourself..."
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
                    name="resume"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel>Resume (PDF)</FormLabel>
                            <FormControl>
                                <div>
                                    {field.value ? (
                                        <div className="relative w-fit">
                                            <Image
                                                src={PdfImage}
                                                alt="PDF RESUME"
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
                                            endpoint="resumeUploader"
                                            onClientUploadComplete={(res) => {
                                                field.onChange(res[0].url);
                                                toast.success("Logo uploaded successfully!");
                                            }}
                                            onUploadError={() => {
                                                toast.error("Something went wrong. Please try again.");
                                            }}
                                            className="
[&_button]:bg-primary!
[&_button]:text-white!
[&_button]:hover:bg-primary/90!
[&_button]:rounded-(--radius-md)!
[&_button]:border!
cursor-pointer
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
                    {pending ? 'Submitting...' : "Continu"}
                </Button>
            </form>
        </Form>
    )
}