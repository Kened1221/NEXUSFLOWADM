import { Roboto } from 'next/font/google';
import './globals.css';
import { Providers } from './Providers';

const roboto = Roboto({
    weight: ['100', '300', '400', '700', '900', '500'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
    title: 'NEXUSFLOW',
    description: 'Sistema de gestión',
    manifest: '/manifest.json',
    metadataBase: new URL('https://nexusflow.vercel.app'),
    alternates: {
        canonical: '/',
        languages: {
            'es-ES': '/es-ES',
        },
    },
    openGraph: {
        title: 'GES NEXUSFLOW ADMIN',
        description: 'Sistema de gestión',
        url: 'https://nexusflow.vercel.app',
        siteName: 'NEXUSFLOW',
        images: [
            {
                url: 'https://res.cloudinary.com/dmr9ef5cl/image/upload/v1700070548/idgqef0paqq201le4mxe.jpg',
                width: 800,
                height: 600,
            },
            {
                url: 'https://res.cloudinary.com/dmr9ef5cl/image/upload/v1700070548/idgqef0paqq201le4mxe.jpg',
                width: 1800,
                height: 1600,
                alt: 'My custom alt',
            },
        ],
        locale: 'en_ES',
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body
                className={`${roboto.className} h-screen dark:text-white bg-gray-100 dark:bg-gray-900`}
            >
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}