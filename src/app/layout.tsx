import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar/navbar";

const poppins = Poppins({
  subsets: ["latin"], // Ensures language support
  weight: ["300", "400", "500", "600", "700"], // Select only required weights
  style: ["normal", "italic"], // Choose styles
  display: "swap", // Improves loading behavior
  variable: "--font-poppins", // Custom CSS variable
});

export const metadata: Metadata = {
  title: "QuizzyNest - Interactive Learning Platform",
  description: "Engage in interactive quizzes and learn through fun challenges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
