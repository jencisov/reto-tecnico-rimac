import type {Metadata} from 'next';
import './globals.css';
import '@rimac-seguros/ride-system-tokens/dist/css/index.css';

export const metadata: Metadata = {
  title: 'Reto Técnico',
  description: 'Reto Técnico con Ride System',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
    <body>
    {children}
    </body>
    </html>
  );
}
