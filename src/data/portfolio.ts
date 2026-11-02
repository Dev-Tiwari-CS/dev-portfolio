// ─────────────────────────────────────────────────────────────
// Edit everything about your portfolio here.
// Never put metrics, dates or links you can't verify here —
// leave a field undefined and the UI hides it.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Dev Kumar Tiwari",
  initials: "DT",
  roles: ["Software Developer"],
  headline: ["I", "build", "web", "applications", "with", "care", "and", "precision."],
  intro:
    "B.Tech Computer Science Engineering graduate from St. Aloysius Institute of Technology, Jabalpur (2025). Based in Pune, I craft web applications with React, Node.js, and SQL, focused on clean code and thoughtful user experiences.",
  location: "Pune, Maharashtra, India",
  available: true,
  email: "devtiwarimp@gmail.com",
  resumeUrl: "", // Hidden until a real resume is provided.
  // Contact form: create a free form at formspree.io and paste its endpoint,
  // e.g. "https://formspree.io/f/abcdwxyz". Empty = form shows a clear error.
  formspreeEndpoint: "",
};

export const about = {
  paragraphs: [
    "I'm a B.Tech Computer Science Engineering graduate from St. Aloysius Institute of Technology, Jabalpur (2021–2025), with a CGPA of 7.15/10.",
    "I work across the full web stack — HTML, CSS, JavaScript, and React on the frontend, with Node.js, Express.js, PHP, and Laravel on the backend.",
    "I'm proficient in Python, Java, SQL, MySQL, and MongoDB. I use Git and GitHub for version control and collaborative development.",
    "Originally from Jabalpur, I'm now based in Pune and actively seeking full-time Software Developer roles to apply my skills and grow with a professional team.",
  ],
  facts: [
    { label: "Location", value: "Pune, Maharashtra", note: "Originally from Jabalpur, Madhya Pradesh" },
    { label: "Focus", value: "Full-stack Web Development" },
    { label: "Availability", value: "Open to full-time opportunities" },
    {
      label: "Education",
      value: "B.Tech in Computer Science Engineering",
      note: "St. Aloysius Institute of Technology, Jabalpur (2021–2025) · CGPA 7.15 / 10",
    },
  ] as { label: string; value: string; note?: string }[],
  strengths: [
    "Problem-solving",
    "Attention to detail",
    "Quick learner",
    "Collaboration",
    "Ownership",
  ],
};

export type SkillGroup = "Database" | "Programming" | "Web" | "Quality & Process" | "Tools";

export const skills: { group: SkillGroup; items: string[] }[] = [
  { group: "Web", items: ["HTML", "CSS", "JavaScript", "React.js"] },
  { group: "Programming", items: ["PHP", "Laravel", "Node.js", "Express.js", "Python", "Java"] },
  { group: "Database", items: ["SQL", "MySQL", "MongoDB"] },
  { group: "Tools", items: ["Git", "GitHub"] },
];

export const marquee = skills.flatMap((g) => g.items);

export type Project = {
  title: string;
  tag: string;
  description?: string;
  stack: string[];
  live?: string | undefined; // leave undefined until you have a real URL
  github?: string | undefined;
  image?: string | undefined;
  comingSoon?: boolean;
};

export const projects: Project[] = [
  {
    title: "Blogify",
    tag: "Full-stack",
    description: "A blogging application built with Node.js, Express.js and MongoDB.",
    stack: ["Node.js", "Express.js", "MongoDB"],
  },
  {
    title: "Weather Report System",
    tag: "Frontend",
    description:
      "A weather report interface built with HTML, CSS and JavaScript that fetches data from a weather API.",
    stack: ["HTML", "CSS", "JavaScript", "Weather API"],
  },
];

export const process = [
  {
    n: "01",
    title: "Understand",
    body: "Analyse the requirements, users and constraints before writing code.",
  },
  {
    n: "02",
    title: "Break down",
    body: "Split the problem into smaller parts and plan the data and flows.",
  },
  {
    n: "03",
    title: "Build",
    body: "Implement features exactly as specified, in small, reviewable steps.",
  },
  {
    n: "04",
    title: "Test",
    body: "Verify across browsers and devices, report and fix bugs before delivery.",
  },
];

export const experience: {
  period?: string;
  title: string;
  org: string;
  bullets: string[];
  kind: string;
}[] = [
  {
    period: "2021–2025",
    title: "B.Tech in Computer Science Engineering",
    org: "St. Aloysius Institute of Technology, Jabalpur",
    kind: "education",
    bullets: ["CGPA 7.15 / 10"],
  },
];

export const github = {
  username: "Dev-Tiwari-CS",
  url: "https://github.com/Dev-Tiwari-CS",
};

// Only list achievements you can link to a proof (certificate URL etc.)
export const achievements: { title: string; issuer: string; url?: string | undefined }[] = [];

export const socials: { label: string; url: string }[] = [
  { label: "GitHub", url: "https://github.com/Dev-Tiwari-CS" },
  { label: "LinkedIn", url: "https://linkedin.com/in/dev-kumar-tiwari-44006724a" },
];

export const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "experience", label: "Experience" },
  { id: "proof", label: "Proof" },
  { id: "contact", label: "Contact" },
] as const;
