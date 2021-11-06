import React from 'react'

import {Contact, Hero, Services, FeaturedProducts} from '../components'

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  )
}

export default Home
