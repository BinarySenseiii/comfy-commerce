import axios from 'axios'
import {products_url as url} from '../utils/Constants'
import React from 'react'
import {useQuery} from 'react-query'
import {Contact, Hero, Services, FeaturedProducts} from '../components'
import {ACTIONS} from '../constants/Actions'
import {useProductsContext} from '../context/ProductContext'
import {products} from '../types'

const Home: React.FC = () => {
  const {dispatch} = useProductsContext()

  // Queries
  const {data, isLoading, isError} = useQuery<products[], Error>(
    'products',
    () => axios.get(url).then(response => response.data)
  )

  React.useEffect(() => {
    dispatch({
      type: ACTIONS.GET_PRODUCTS_BEGIN,
      payload: {
        data,
        isLoading,
        isError,
      },
    })

    dispatch({
      type: ACTIONS.GET_FEATURED_PRODUCTS,
    })
  }, [data, dispatch, isError, isLoading])

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
