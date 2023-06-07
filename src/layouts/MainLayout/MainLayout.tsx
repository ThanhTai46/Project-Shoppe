import Footer from '@/components/Footer'
import MainHeader from '@/components/MainHeader'

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <MainHeader />
      {children}
      <Footer />
    </>
  )
}
