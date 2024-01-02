import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Uses } from "@/components/useCase"
import { Form } from "@/components/form"
import { Services } from "@/components/services"
import { Footer } from "@/components/footer"



export default function Home() {
  return (
    <div className="header">
      <Header/>
      <Hero/>
      <div className='grid lg:grid-cols-2 pt-8 gap-3 px-2 lg:px-32'>
        <div className='lg:mt-10'><Uses/></div>
        <div className=''><Form/></div>
      </div>
      <Services/>
      <Footer/>
    </div>
  )
}
