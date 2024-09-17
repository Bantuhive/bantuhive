import '../styles/globals.css';
import { Oswald, Poppins } from '@next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Providers from './Providers';

const oswald = Oswald({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald',
});

const popins = Poppins({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-popins',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head />
      <body className="bg-gradient-to-r from-green-50 to-green-200 dark:bg-gradient-to-t dark:from-[#242933] dark:to-[#2A303C] mx-auto transition-all duration-150">
        <Providers>
          <Navbar />
          <div className="max-w-7xl mx-auto h-screen">
            <div className={`${oswald.variable} ${popins.variable}`}>
              <main>{children}</main>
            </div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}