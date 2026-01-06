// import "@/shared/styles/globals.css";
import "@/shared/styles/tail.css";
import { Providers } from "@/shared/providers";
import { LayoutWrapper } from "@/components/LayoutWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="antialiased bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex flex-col min-h-screen">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
