export const metadata = {
  title: 'Who is the Best?',
  description: 'Vote and decide who is the best!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
