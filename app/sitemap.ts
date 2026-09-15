import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: siteUrl, lastModified: new Date() }, ...projects.map((project) => ({ url: `${siteUrl}/work/${project.slug}`, lastModified: new Date() }))]; }
