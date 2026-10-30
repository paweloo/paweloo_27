// All site copy lives here — replace the placeholders with your own content.
// Wrap a word in *asterisks* to render it as the italic accent highlight.

export type Social = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "x";
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
};

export const profile = {
  name: "Pawel",
  role: "Software Engineer",
  headline: "Hey there, I’m *Pawel*!",
  taglines: [
    "I build React apps that feel fast.",
    "I sweat the small interactions.",
    "I turn ideas into interfaces.",
    "I ship accessible, typed UI.",
  ],
  status: "Senior Software Engineer",
  // Swap for your photo (e.g. /portrait.jpg). A cut-out on a dark/transparent background works best.
  portrait: "/portrait.webp",
  email: "pawelzajk@outlook.com",
  resume: "#",
  socials: [
    { label: "GitHub", href: "https://github.com/", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/pawel-zajk/",
      icon: "linkedin",
    },
    { label: "X", href: "https://x.com/", icon: "x" },
  ] satisfies Social[],
};

export const about = {
  statement:
    "Between building *BI software* at Strategy and small projects for friends and local communities, I’m trying to tire out *my cat* enough that it stops biting my cables.",
  paragraphs: [
    "Day to day I’m a tech lead at Strategy, building BI software that helps people make sense of massive data models. The role goes well beyond writing code — I work closely with product and customers to shape what we build, not just how we build it.",
    "Before that I was at Sony, where I built software for tracking competitors’ promotional campaigns. Off the clock I’m usually automating something around my house — if it can be scripted, it probably already is.",
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
    summary:
      "Formerly MicroStrategy. I build the add-ins that bring enterprise BI into Microsoft Office and Google Workspace.",
    highlights: [
      { value: "5×", label: "Employee of the Month" },
      { value: "2×", label: "Employee of the Quarter" },
    ],
    awards: [
      "Q3 2025 — led the architecture and delivery of the Google Sheets add-on, opening a new acquisition channel for business clients.",
      "Q2 2023 — managed concurrent feature launches on schedule, directly securing new business accounts.",
    ],
    roles: [
      {
        title: "Senior Software Engineer / Team Lead",
        start: "Jan 2024",
        end: "Present",
        bullets: [
          {
            label: "Leadership & architecture",
            text: "Lead development of React-based add-ins for Office and Google Workspace, coordinating teams across Poland, the US and China.",
          },
          {
            label: "Customers & product",
            text: "Partner directly with enterprise customers, turning use cases and defect reports into high-priority requirements and shaping roadmaps with PMs.",
          },
          {
            label: "AI workflows",
            text: "Pioneered internal AI spec kits that standardize and speed up development across multiple large global repositories.",
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
            text: "Designed algorithms that translate Strategy data formats directly into Microsoft Office API structures within tight product constraints.",
          },
          {
            label: "Automation",
            text: "Built Python testing and workflow pipelines that cut testing effort from days to hours.",
          },
          {
            label: "Feature design",
            text: "Authored design docs and built UI and authentication components with PMs and UX designers, from concept to production.",
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
            text: "Developed core features of Strategy Workstation for managing resources across cloud environments, including customized email subscriptions.",
          },
          {
            label: "Frontend & APIs",
            text: "Implemented custom grid views that fetch and parse complex API data into interactive UI components.",
          },
        ],
      },
    ],
    tech: [
      "React",
      "TypeScript",
      "Office API",
      "Google Workspace API",
      "Python",
      "Jest",
      "WebdriverIO",
      "Jenkins",
    ],
  },
  {
    company: "Sony",
    start: "2018",
    end: "2021",
    summary:
      "Where I went from the sales floor to writing my first production software.",
    roles: [
      {
        title: "Team Mentor",
        start: "May 2019",
        end: "May 2021",
        bullets: [
          {
            label: "Python initiative",
            text: "On my own initiative, built a Python web app for analyzing promotional campaigns, working with marketing and analytics to fit it to company needs.",
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
