import { describe, expect, it } from "vitest";
import { experience, marquee, profile, projects, skills, socials } from "@/data/portfolio";

describe("verified portfolio constraints", () => {
  it("uses only the supplied skills", () => {
    expect(skills.flatMap((group) => group.items)).toEqual([
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "PHP",
      "Laravel",
      "Node.js",
      "Express.js",
      "Python",
      "Java",
      "SQL",
      "MySQL",
      "MongoDB",
      "Git",
      "GitHub",
    ]);
    expect(marquee).toEqual(skills.flatMap((group) => group.items));
  });
  it("records education with the supplied years and omits internship work", () => {
    expect(experience).toHaveLength(1);
    expect(experience[0]).toMatchObject({
      period: "2021–2025",
      title: "B.Tech in Computer Science Engineering",
      org: "St. Aloysius Institute of Technology, Jabalpur",
      kind: "education",
    });
    expect(
      experience.some((entry) => /shopify|camperclick|intern/i.test(`${entry.title} ${entry.org}`)),
    ).toBe(false);
  });
  it("features Blogify and Weather Report System without invented links", () => {
    expect(projects.map((project) => project.title)).toEqual(["Blogify", "Weather Report System"]);
    expect(projects.find((project) => project.title === "Blogify")?.stack).toEqual([
      "Node.js",
      "Express.js",
      "MongoDB",
    ]);
    expect(projects.find((project) => project.title === "Weather Report System")?.stack).toEqual([
      "HTML",
      "CSS",
      "JavaScript",
      "Weather API",
    ]);
    expect(projects.every((project) => !project.comingSoon)).toBe(true);
    expect(projects.some((project) => /hospital|camperclick/i.test(project.title))).toBe(false);
  });
  it("leaves unprovided project links and resume absent", () => {
    expect(projects.every((project) => !project.github && !project.live)).toBe(true);
    expect(profile.resumeUrl).toBe("");
  });
  it("keeps the existing contact destinations and Formspree endpoint", () => {
    expect(profile.email).toBe("devtiwarimp@gmail.com");
    expect(profile.formspreeEndpoint).toBe("");
    expect(socials.map((social) => social.url)).toEqual([
      "https://github.com/Dev-Tiwari-CS",
      "https://linkedin.com/in/dev-kumar-tiwari-44006724a",
    ]);
  });
  it("presents the Software Developer role", () => {
    expect(profile.roles).toEqual(["Software Developer"]);
  });
});
