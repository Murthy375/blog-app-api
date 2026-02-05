import Content from "../components/Content"
import Footer from "../components/Footer"

import Header from "../components/Header"


const Layout = () => {
  return (
    <section className="text-neutral-50 bg-gray-950 min-w-screen min-h-screen">
        <Header />
        <Content />
        <Footer />
    </section>
  )
}

export default Layout