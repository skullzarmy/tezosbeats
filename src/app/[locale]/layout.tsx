import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";
import { AppProvider } from "@/contexts/AppContext";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "TezosBeats - NFT Music Player",
  description: "Discover and play your Tezos music NFTs",
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  
  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <ToastProvider>
            <AppProvider>
              {children}
            </AppProvider>
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}