import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/global/Navigation';
import CustomCursor from '@/components/global/CustomCursor';
import SmoothScroll from '@/components/global/SmoothScroll';
import Preloader from '@/components/global/Preloader';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://acertaperu.com'),
  title: {
    default: 'Acerta - Soluciones Corporativas de Élite',
    template: '%s | Acerta'
  },
  description: 'Especialistas en Contabilidad NIIF, Software a Medida con IA y Gestión de Planillas para empresas que buscan escala y cumplimiento impecable.',
  keywords: ['contabilidad niif', 'software a medida', 'recursos humanos', 'outsourcing contable', 'acerta peru'],
  authors: [{ name: 'Acerta Solutions' }],
  creator: 'Acerta Solutions',
  publisher: 'Acerta Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Acerta - Soluciones Corporativas de Élite',
    description: 'Optimizamos y escalamos empresas con soluciones corporativas de élite.',
    url: 'https://acertaperu.com',
    siteName: 'Acerta',
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acerta - Soluciones Corporativas de Élite',
    description: 'Optimizamos y escalamos empresas con soluciones corporativas de élite.',
  },
  icons: {
    icon: '/img/acerta/preloader.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="font-sans antialiased bg-background-light min-h-screen text-slate-900" suppressHydrationWarning>
        <Preloader />
        <SmoothScroll>
          <CustomCursor />
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
