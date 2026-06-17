import type { Metadata } from 'next'
import '../globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { NoiseBackground } from '@/components/NoiseBackground'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Gabriel Feliciano — Digital Designer',
  description:
    'Portfolio of Gabriel Feliciano — Digital Designer crafting bold, purposeful experiences across brand, UI/UX, and motion.',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'pt' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="font-body min-h-screen bg-bg text-text-primary antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <NoiseBackground />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
