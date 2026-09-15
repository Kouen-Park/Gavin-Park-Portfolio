const configuredUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
export const siteUrl = configuredUrl
  ? configuredUrl.startsWith("http") ? configuredUrl : `https://${configuredUrl}`
  : "http://localhost:3000";

export const siteDescription = "Gavin Park builds dependable software systems and makes the work legible through decisions, implementation, and verification.";
