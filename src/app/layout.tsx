import './globals.css';
import '../styles/header.css';
import Header from '../components/Header';

export const metadata = {
  title: 'Database Schema Validator/Converter',
  description: 'My Next.js Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header /> {/* 공통 헤더 */}
        <main className="container mx-auto py-6">{children}</main>
      </body>
    </html>
  );
}
