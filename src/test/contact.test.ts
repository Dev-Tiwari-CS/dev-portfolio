import { describe, expect, it, vi } from "vitest";
import { submitContact, validateContact } from "@/lib/contact";

describe("contact form rules", () => {
  it("rejects an invalid email", () => {
    expect(validateContact({ name: "Ann", email: "nope", message: "hello there!" }).email).toBeDefined();
  });
  it("accepts valid input", () => {
    expect(validateContact({ name: "Ann", email: "a@b.co", message: "hello there!" })).toEqual({});
  });
  it("never reports success when no endpoint is configured", async () => {
    await expect(submitContact("", { name: "Ann", email: "a@b.co", message: "hello there!" })).rejects.toThrow();
  });
  it("throws when the backend responds with an error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("x", { status: 500 })));
    await expect(submitContact("https://x.test", { name: "Ann", email: "a@b.co", message: "hello there!" })).rejects.toThrow();
    vi.unstubAllGlobals();
  });
});
