export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string; // emoji stand-in for a logo
  location: string;
  remote: boolean;
  type: JobType;
  salary: string;
  postedDaysAgo: number;
  tags: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export const JOBS: Job[] = [
  {
    id: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    company: "Nimbus Labs",
    logo: "☁️",
    location: "Bengaluru, IN",
    remote: true,
    type: "Full-time",
    salary: "₹35L – ₹50L",
    postedDaysAgo: 2,
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    description:
      "We're looking for a Senior Frontend Engineer to lead the development of our customer-facing web platform used by thousands of teams every day.",
    responsibilities: [
      "Own and ship features across our Next.js application end to end.",
      "Collaborate with design to build accessible, polished interfaces.",
      "Mentor mid-level engineers and drive frontend best practices.",
    ],
    requirements: [
      "5+ years building production web applications.",
      "Deep expertise in React, TypeScript and modern CSS.",
      "Experience with performance optimization and testing.",
    ],
  },
  {
    id: "backend-dotnet-developer",
    title: "Backend Developer (.NET)",
    company: "Helix Systems",
    logo: "🧬",
    location: "Pune, IN",
    remote: false,
    type: "Full-time",
    salary: "₹25L – ₹38L",
    postedDaysAgo: 5,
    tags: [".NET", "C#", "MongoDB", "REST"],
    description:
      "Join our backend team building scalable APIs that power financial workflows for enterprise customers.",
    responsibilities: [
      "Design and build RESTful services with ASP.NET Core.",
      "Model data and optimize queries against MongoDB.",
      "Ensure services are secure, observable and well-tested.",
    ],
    requirements: [
      "4+ years with C# and ASP.NET Core.",
      "Solid understanding of database design and indexing.",
      "Familiarity with cloud deployment and CI/CD.",
    ],
  },
  {
    id: "product-designer",
    title: "Product Designer",
    company: "Lumen",
    logo: "💡",
    location: "Remote",
    remote: true,
    type: "Contract",
    salary: "₹18L – ₹28L",
    postedDaysAgo: 1,
    tags: ["Figma", "UX", "Design Systems"],
    description:
      "We need a product designer to shape the experience of our next-generation analytics dashboard.",
    responsibilities: [
      "Translate complex problems into simple, elegant flows.",
      "Build and maintain our component-based design system.",
      "Partner closely with engineering through delivery.",
    ],
    requirements: [
      "3+ years designing digital products.",
      "Strong portfolio demonstrating end-to-end work.",
      "Fluency in Figma and prototyping tools.",
    ],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    company: "Atlas Cloud",
    logo: "🛰️",
    location: "Hyderabad, IN",
    remote: true,
    type: "Full-time",
    salary: "₹30L – ₹45L",
    postedDaysAgo: 8,
    tags: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
    description:
      "Help us scale our infrastructure and make deployments boringly reliable across multiple regions.",
    responsibilities: [
      "Own infrastructure-as-code with Terraform.",
      "Maintain and improve our Kubernetes clusters.",
      "Build self-service tooling for product teams.",
    ],
    requirements: [
      "4+ years in DevOps / SRE roles.",
      "Hands-on AWS and Kubernetes experience.",
      "Strong scripting and automation skills.",
    ],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    company: "Quanta",
    logo: "📊",
    location: "Mumbai, IN",
    remote: false,
    type: "Full-time",
    salary: "₹14L – ₹22L",
    postedDaysAgo: 3,
    tags: ["SQL", "Python", "Dashboards"],
    description:
      "Turn raw product and business data into insights that guide our company strategy.",
    responsibilities: [
      "Build dashboards and self-serve reporting.",
      "Partner with teams to define and track KPIs.",
      "Run deep-dive analyses on user behavior.",
    ],
    requirements: [
      "2+ years in analytics or BI.",
      "Strong SQL and a scripting language.",
      "Clear communicator of data stories.",
    ],
  },
  {
    id: "ai-engineer-intern",
    title: "AI Engineer (Intern)",
    company: "Nimbus Labs",
    logo: "☁️",
    location: "Remote",
    remote: true,
    type: "Internship",
    salary: "₹50k / month",
    postedDaysAgo: 0,
    tags: ["Python", "LLMs", "Agents"],
    description:
      "A 6-month internship working on agentic AI features alongside our applied-research team.",
    responsibilities: [
      "Prototype LLM-powered features and tools.",
      "Build evaluation harnesses for agent quality.",
      "Document findings and ship experiments.",
    ],
    requirements: [
      "Final-year student or recent graduate.",
      "Comfortable with Python and APIs.",
      "Curiosity about LLMs and agents.",
    ],
  },
];

export function getJob(id: string): Job | undefined {
  return JOBS.find((j) => j.id === id);
}

export const JOB_TYPES: JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];
