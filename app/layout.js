import { Inter } from 'next/font/google';
import './globals.css';
import NavbarComponent from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppProvider from './context/AppProvider';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Rick and Morty',
  description: 'Rick and Morty App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} tw-bg-slate-50`}>
        <AppProvider>
          <NavbarComponent />
          <Container className="tw-min-h-screen">{children}</Container>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
