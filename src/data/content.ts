// All site copy lives here — replace the placeholders with your own content.
// Wrap a word in *asterisks* to render it as the italic accent highlight.

// Public assets are resolved against Vite's base, so the site works at "/" or a sub-path (GitHub Pages).
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

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
  // Several images cycle through like screens of the app
  image: string | string[];
  // Image aspect ratio as CSS, e.g. "40 / 21". Defaults to 16:10
  ratio?: string;
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
  portrait: asset("portrait.webp"),
  email: "pawelzajk@outlook.com",
  socials: [
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
    "Before that I was at Sony, where I came up with the idea of automating competitor price tracking, so we could react to market changes much faster.",
    "Off the clock, I’m usually on a plane to somewhere I haven’t been yet, training for my next race, or tinkering with a side project.",
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
      "A custom headless Shopify storefront for a jewelry brand rooted in 30+ years of family craft. Shoppers build their own bracelet from live charms, order pieces engraved from their own photo, and save favourites to their account.",
    image: [
      asset("projects/pola-jewelry-1.webp"),
      asset("projects/pola-jewelry-2.webp"),
      asset("projects/pola-jewelry-3.webp"),
      asset("projects/pola-jewelry-4.webp"),
      asset("projects/pola-jewelry-5.webp"),
    ],
    ratio: "40 / 21",
    href: "https://polajewelry.pl",
    frame: "mac",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Shopify Storefront API",
      "GraphQL",
      "Instagram Graph API",
    ],
  },
  {
    title: "E-Ink Smart Calendar",
    description:
      'A Google Calendar on a 7.5" e-paper panel, driven by a Raspberry Pi Zero. Set up entirely from a phone: scan a QR code, pick Wi-Fi, link Google with a code from the screen, then change views and themes in a local web app. I also designed and built its product page, with a live demo of the real screens.',
    image: [
      asset("projects/eink-calendar-desk.jpg"),
      asset("projects/eink-calendar-page-1.webp"),
      asset("projects/eink-calendar-page-2.webp"),
      asset("projects/eink-calendar-page-3.webp"),
      asset("projects/eink-calendar-page-4.webp"),
    ],
    href: "https://paweloo.github.io/eink-calendar/",
    tags: [
      "Python",
      "Raspberry Pi",
      "E-ink",
      "IoT",
      "Linux",
      "Google Calendar API",
      "Flask",
    ],
  },
  {
    title: "Price Tracker",
    description:
      "Built at Sony Poland to monitor competitors’ prices: a cloud-hosted scraping pipeline that tracks pricing in real time, fires automated alerts, and compiles the findings into an Excel report.",
    image: asset("projects/price-tracker.svg"),
    tags: ["Python", "Flask", "Selenium", "AWS"],
  },
  {
    title: "Valdek",
    description:
      "Payment reconciliation for a local theatre’s classes. It reads bank statement PDFs, fuzzy-matches each transfer to a participant by name and month, flags partial and overpayments, and writes the confirmed results back to the Google Sheet.",
    image: [
      asset("projects/valdek-1.webp"),
      asset("projects/valdek-2.webp"),
      asset("projects/valdek-3.webp"),
      asset("projects/valdek-4.webp"),
    ],
    frame: "mac",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Google Sheets API",
      "PDF.js",
      "SheetJS",
      "Vercel",
    ],
  },
  {
    // Placeholder name and image — update once the details are in
    title: "D&D Character Tracker",
    description:
      "A D&D 5e character sheet for the table: tap any skill or save to roll it with advantage or disadvantage, and modifiers, temp HP, death saves and rests follow the rules automatically. Saves in the browser, exports to JSON.",
    image: asset("projects/dnd-tracker.svg"),
    tags: ["React", "TypeScript", "Vite", "CSS"],
  },
];
