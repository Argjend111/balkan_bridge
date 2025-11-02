/* eslint-disable react/no-unescaped-entities */
import { CreateJobForm } from "@/components/forms/CreateJobForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ArcjetLogo from '@/public/arcjet.png'
import InngestLogo from '@/public/inngest.png'
import Image from "next/image";

const companies = [
    { id: 0, name: "arcjet", logo: ArcjetLogo },
    { id: 1, name: "inngest", logo: InngestLogo },
    { id: 2, name: "arcjet", logo: ArcjetLogo },
    { id: 3, name: "inngest", logo: InngestLogo },
    { id: 4, name: "arcjet", logo: ArcjetLogo },
    { id: 5, name: "inngest", logo: InngestLogo },
];

const testimonials = [
    {
        quote: "Our job application server connects top talent with opportunities seamlessly, making hiring faster, smarter, and more efficient for businesses of all sizes.",
        author: 'Sarah Chen',
        company: 'TechCorp'
    },
    {
        quote: "Thanks to this platform, we found the perfect candidates in record time. It’s like having a recruitment team in your pocket!",
        author: 'David Ortiz',
        company: 'HireWave'
    },
    {
        quote: "This server doesn’t just streamline applications—it transforms the entire hiring experience for both companies and job seekers.",
        author: 'Aisha Patel',
        company: 'NextGen Solutions'
    }
]

const stats = [
    { id: 0, value: '10k+', label: "Monthly active job seekers" },
    { id: 1, value: '1.2k+', label: "Jobs posted this month" },
    { id: 2, value: '500+', label: "Companies hiring now" },
    { id: 3, value: '95%', label: "Candidate placement success rate" },
    { id: 4, value: '50+', label: "Industries covered" },
    { id: 5, value: '24/7', label: "Support for employers and candidates" }
]

export default function PostJobPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
           <CreateJobForm/>

            <div className="col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Trusted by industry Leaders
                        </CardTitle>
                        <CardDescription>
                            Join thousands of copmanies hiring top talent
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                            {companies.map((company) => (
                                <div key={company.id} className="flex items-center justify-center">
                                    <Image src={company.logo} alt={company.name}
                                        width={80} height={80}
                                        className="rounded-lg opacity-75 transition-opacity
                                hover:opacity-100"/>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            {testimonials.map((testimonial, index) => {
                                return (
                                    <blockquote key={index} className="border-l-2
                                    border-primary pl-4">
                                        <p className="text-sm text-muted-foreground
                                        italic">"{testimonial.quote}"</p>
                                        <footer className="mt-2 text-sm font-medium">
                                            - {testimonial.author}, {testimonial.company}
                                        </footer>
                                    </blockquote>
                                )
                            })}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="rounded-lg bg-muted p-4">
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}