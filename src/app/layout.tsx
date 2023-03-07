import 'antd/dist/reset.css'
import '../styles/global.scss'
import RootClientLayout from '@/components/layouts/RootClientLayout'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pt-br'>
      <body>
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  )
}
