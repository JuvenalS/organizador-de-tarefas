import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/normalize.css";
import { StoreProvider } from "@/stores/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Organizador de Tarefas",
  description: "Uma aplicação para gerenciar tarefas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`bg-slate-100 ${inter.className}`}>
        <StoreProvider>
          <main className="container">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
