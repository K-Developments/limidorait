
import type { MetadataRoute } from 'next';
import { getProjects, getServices } from '@/services/firestore';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://limidora.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // Fetch dynamic routes
  const projects = await getProjects();
  const services = await getServices();

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}${project.link}`,
    lastModified,
  }));

  const serviceUrls: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}${service.link}`,
    lastModified,
  }));

  // Define static routes
  const staticRoutes = [
    '/',
    '/about',
    '/portfolio',
    '/services',
    '/faq',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ];

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
  }));

  return [...staticUrls, ...projectUrls, ...serviceUrls];
}
