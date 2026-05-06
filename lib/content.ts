import { projects } from '@/content/projects';
import { properties } from '@/content/properties';
import type { Project, Property } from './types';

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 4): Project[] {
  return projects.filter((p) => p.featured).slice(0, limit);
}

export function getFeaturedProperties(limit = 6): Property[] {
  return properties.filter((p) => p.featured).slice(0, limit);
}

export function getRelatedProperties(projectSlug: string, limit = 6): Property[] {
  return properties.filter((p) => p.projectSlug === projectSlug).slice(0, limit);
}

export function allProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function allPropertySlugs(): string[] {
  return properties.map((p) => p.slug);
}

export { projects, properties };
