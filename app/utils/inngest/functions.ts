import { inngest } from "./client";
import { prisma } from "../db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const handleJobExpiration = inngest.createFunction(
  { id: "job-expiration" },
  { event: "job/created" },
  async ({ event, step }) => {
    const { jobId, expirationDays } = event.data;

    await step.sleep("wait-for-expiration", `${expirationDays}d`);

    await step.run("update-job-status", async () => {
      await prisma.jobPost.update({
        where: { id: jobId },
        data: { status: "EXPIRED" },
      });
    });

    return { jobId, message: "Job marked as expired" };
  }
);

export const sendPeriodicJobListings = inngest.createFunction(
  { id: "send-job-listings" },
  { event: "jobseeker/created" },
  async ({ event, step }) => {
    const { email } = event.data;

    const totalDays = 30;
    const intervalDays = 2;
    let currentDay = 0;

    while (currentDay < totalDays) {
      await step.sleep("wait-interval", `${intervalDays}d`);
      currentDay += intervalDays;

      const recentJobs = await step.run("fetch-recent-jobs", async () => {
        return await prisma.jobPost.findMany({
          where: { status: "ACTIVE" },
          orderBy: { createdAt: "desc" },
          take: 10,
          include: {
            company: { select: { name: true } },
          },
        });
      });

      if (recentJobs.length > 0) {
        await step.run("send-email", async () => {
          const jobListHtml = recentJobs
            .map(
              (job) => `
              <li>
                <strong>${job.jobTitle}</strong><br>
                Company: ${job.company.name}<br>
                Location: ${job.location}<br>
                Salary: ${job.salaryFrom.toLocaleString()} - ${job.salaryTo.toLocaleString()}
              </li>`
            )
            .join("");

          await resend.emails.send({
            from: "no-reply@yourdomain.com",
            to: email,
            subject: "Latest Job Listings",
            html: `<p>Here are the latest job listings for you:</p><ul>${jobListHtml}</ul>`,
          });
        });
      }
    }
  }
);
