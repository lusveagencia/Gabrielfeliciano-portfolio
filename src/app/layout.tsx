import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { NoiseBackground } from '@/components/NoiseBackground'

export const metadata: Metadata = {
  title: 'Gabriel Feliciano — Digital Designer',
  description:
    'Portfolio of Gabriel Feliciano — Digital Designer crafting bold, purposeful experiences across brand, UI/UX, and motion.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body min-h-screen bg-bg text-text-primary antialiased">
        <ThemeProvider>
          <NoiseBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
