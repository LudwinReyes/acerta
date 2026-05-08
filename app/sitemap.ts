import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://acentraperu.com';

  // Define your routes here
  const routes = [
    '',
    '/nosotros',
    '/contabilidad',
    '/rrhh',
    '/software',
    '/contacto',
    '/herramientas',
    '/herramientas/calculadora-nominas',
    '/herramientas/calculadora-tributaria',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
