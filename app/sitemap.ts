import type { MetadataRoute } from "next";
import { allProjects } from "@/data/projects";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: siteUrl, lastModified: new Date() }, ...allProjects.map((project) => ({ url: `${siteUrl}/work/${project.slug}`, lastModified: project.reviewedAt }))]; }
