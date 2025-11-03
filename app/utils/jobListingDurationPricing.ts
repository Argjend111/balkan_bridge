interface iAppProps {
  days: number;
  price: number;
  description: string;
}

export const jobListingDurationpPricing: iAppProps[] = [
  {
    days: 7,
    price: 39,
    description: "Basic listing (visible for 7 days)"
  },
  {
    days: 14,
    price: 59,
    description: "Extended listing (visible for 2 weeks)"
  },
  {
    days: 30,
    price: 99,
    description: "Standard listing (visible for 1 month)"
  },
  {
    days: 60,
    price: 159,
    description: "Premium listing (visible for 2 months, highlighted)"
  },
  {
    days: 90,
    price: 199,
    description: "Top placement listing (visible for 3 months, featured on homepage)"
  }
];
