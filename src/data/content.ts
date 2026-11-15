// All site copy lives here — replace the placeholders with your own content.
// Wrap a word in *asterisks* to render it as the italic accent highlight.

export type Social = {
  label: string;
  href: string;
  icon: "github" | "linkedin";
};

export type Role = {
  title: string;
  start: string;
  end: string;
  bullets: { label: string; text: string }[];
};

export type Experience = {
  company: string;
  start: string;
  end: string;
  url?: string;
  // Optional headline sentence, shown larger above the summary
  lead?: string;
  summary: string;
  highlights?: { value: string; label: string }[];
  awards?: string[];
  roles: Role[];
  tech: string[];
};

export type Project = {
  title: string;
  year?: string;
  description: string;
  image: string;
  tags: string[];
  // Without a link the tile is not clickable
  href?: string;
  // "mac" shows the image inside a macOS browser window
  frame?: "mac";
};

export const profile = {
  name: "Pawel",
  role: "Software Engineer",
  headline: "Hey there,\nI’m *Pawel*!",
  taglines: [
    "I believe impossible doesn't exist.",
    "I address real-world problems with code.",
    "I turn ideas into interfaces.",
    "I combine programming skills with sales experience.",
  ],
  status: "Senior Software Engineer",
  // Swap for your photo (e.g. /portrait.jpg). A cut-out on a dark/transparent background works best.
  portrait: "/portrait.webp",
  email: "pawelzajk@outlook.com",
  resume: "/Pawel-Zajk-CV.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/pawel-zajk/",
      icon: "linkedin",
    },
  ] satisfies Social[],
};

export const about = {
  statement:
    "Between building *BI software* at Strategy and small projects for friends and local communities, I’m trying to tire out *my cat* enough that it stops biting my cables.",
  paragraphs: [
    "Day to day I’m a tech lead at Strategy, building BI software that helps people make sense of massive data models. The role goes well beyond code: I work closely with product managers and customers to shape what we build, not just how we build it.",
    "Before that I was at Sony, where I came up with the idea of automating competitor price tracking, so we could react to market changes much faster. Outside of work, you’ll find me training for my next race or tinkering with side projects.",
  ],
  facts: [
    { label: "Based in", value: "Gdynia, Warsaw, Poland, Remote" },
    { label: "Focus", value: "Frontend & product engineering" },
    { label: "Experience", value: "5+ years" },
  ],
  stack: [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "Motion",
    "React Query",
    "GraphQL",
    "Vitest",
    "Playwright",
    "Figma",
  ],
};

export const experience: Experience[] = [
  {
    company: "Strategy",
    start: "2021",
    end: "Now",
    url: "https://www.strategy.com",
    lead: "Where I grew from associate engineer to tech lead in under three years.",
    summary:
      "Formerly MicroStrategy. I build the add-ins that bring Strategy’s enterprise BI straight into Microsoft Office and Google Sheets, so people can work with live data in the tools they already use.",
    highlights: [
      { value: "5×", label: "Employee of the Month" },
      { value: "2×", label: "Employee of the Quarter" },
    ],
    awards: [
      "Q3 2025 — for leading the architecture and delivery of the Google Sheets add-on, which opened a new acquisition channel for business clients.",
      "Q2 2023 — for shipping several concurrent feature launches on schedule, directly securing new business accounts.",
    ],
    roles: [
      {
        title: "Senior Software Engineer / Team Lead",
        start: "Jan 2024",
        end: "Present",
        bullets: [
          {
            label: "Leadership & architecture",
            text: "Lead development of React-based add-ins for Microsoft Office and Google Workspace, coordinating engineers across Poland, the US and China, owning architecture decisions end to end.",
          },
          {
            label: "Customers & product",
            text: "Partner directly with enterprise customers, turning their use cases and defect reports into high-priority requirements, and shape roadmaps with PMs.",
          },
          {
            label: "AI workflows",
            text: "Pioneered internal GitHub Copilot spec kits that speed up development and keep architecture consistent across multiple large global repositories.",
          },
        ],
      },
      {
        title: "Software Engineer",
        start: "Oct 2022",
        end: "Dec 2023",
        bullets: [
          {
            label: "Data parsing",
            text: "Designed algorithms that translate Strategy data formats directly into Office.js structures, working within tight product constraints.",
          },
          {
            label: "Test automation",
            text: "Built automated testing and workflow pipelines with Python and Selenium, cutting testing effort from days to hours and speeding up release cycles.",
          },
          {
            label: "Feature design",
            text: "Authored software design documents and built UI and authentication components, taking features from concept to production with PMs and UX designers.",
          },
        ],
      },
      {
        title: "Software Engineer Associate",
        start: "Jun 2021",
        end: "Sep 2022",
        bullets: [
          {
            label: "Cloud apps",
            text: "Developed core features of the Strategy Workstation app for managing resources across cloud environments.",
          },
          {
            label: "Subscriptions",
            text: "Built customized email subscriptions that deliver BI content straight to users’ inboxes.",
          },
          {
            label: "Frontend & APIs",
            text: "Implemented custom React grid views that fetch and parse complex API data into interactive UI components.",
          },
        ],
      },
    ],
    tech: [
      "React",
      "TypeScript",
      "Redux",
      "Node.js",
      "Office.js",
      "Google Apps Script",
      "Google Workspace API",
      "Jest",
      "Cucumber.js",
      "WebdriverIO",
      "Python",
      "Selenium",
      "Jenkins",
      "GitHub",
      "Jira",
      "Rally",
    ],
  },
  {
    company: "Sony",
    start: "2018",
    end: "2021",
    lead: "Where I went from the sales floor to writing my first production software.",
    summary:
      "Working directly with customers taught me to see things from their perspective, which I now use to design software that solves real problems and fits customers’ needs.",
    roles: [
      {
        title: "Team Mentor",
        start: "May 2019",
        end: "May 2021",
        bullets: [
          {
            label: "Python initiative",
            text: "On my own initiative, built a Python web app for analyzing competitors’ promotional campaigns, working with marketing and analytics to fit it to company needs. It let Sony react to competing promotions faster and adjust product prices to stay competitive.",
          },
          {
            label: "Team leadership",
            text: "Tracked team performance metrics and ran end-to-end interviewing and onboarding for new hires.",
          },
        ],
      },
      {
        title: "Sales Advisor",
        start: "Feb 2018",
        end: "May 2019",
        bullets: [
          {
            label: "Reporting & training",
            text: "Wrote weekly cross-store sales reports, drove product promotions and ran sales and product training for staff.",
          },
        ],
      },
    ],
    tech: ["Python", "Flask", "Selenium", "AWS"],
  },
];

export const projects: Project[] = [
  // Tile size follows the order: wide, narrow, narrow, wide (repeating).
  // Images work best at 16:10. A last tile left alone in its row gets centered.
  {
    title: "Pola Jewelry",
    description:
      "A custom headless storefront for a family jewelry brand, with a build-your-own bracelet and charms configurator — server-side rendered for speed and SEO, with Shopify running the backend.",
    image: "/projects/pola-jewelry.webp",
    href: "https://polajewelry.pl",
    frame: "mac",
    tags: ["Next.js", "React", "Shopify Storefront API", "SSR"],
  },
  {
    title: "E-Ink Smart Calendar",
    description:
      "A physical, always-on dashboard: a Raspberry Pi drives an e-ink display that stays in sync with Google Calendar in real time.",
    image: "/projects/eink-calendar.webp",
    tags: ["Raspberry Pi", "Google Calendar API", "E-ink", "IoT"],
  },
  {
    title: "Price Tracker",
    description:
      "Built at Sony Poland: a cloud-hosted scraping and monitoring pipeline that tracks pricing data in real time and fires automated alerts.",
    image: "/projects/price-tracker.svg",
    tags: ["Python", "Flask", "Selenium", "AWS"],
  },
  {
    title: "Valdek",
    description:
      "A payment checker for a local theatre’s classes: it reads the attendee list from Google Sheets, takes the bank statement PDF and shows who has — and hasn’t — paid.",
    image: "/projects/valdek.webp",
    tags: ["Next.js", "Google Drive API", "Google Apps Script"],
  },
  {
    // Placeholder name, image and tags — update once the details are in
    title: "D&D Character Tracker",
    description:
      "A companion for tabletop sessions that keeps track of a player’s character during a D&D game — so nobody has to dig through paper sheets mid-fight.",
    image: "/projects/dnd-tracker.svg",
    tags: [],
  },
];
