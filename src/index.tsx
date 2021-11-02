import React from 'react'
import ReactDOM from 'react-dom'
import {ProductsProvider} from './context/ProductContext'
import {FilterProvider} from './context/FiltersContext'
import Router from './router/Router'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

import './styles/index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

// Create a client
const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProductsProvider>
        <FilterProvider>
          <Router />
        </FilterProvider>
      </ProductsProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
