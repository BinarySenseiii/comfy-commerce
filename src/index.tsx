import React from 'react'
import ReactDOM from 'react-dom'
import {ProductsProvider} from './context/ProductContext'
import Router from './router/Router'
import {QueryClient, QueryClientProvider} from 'react-query'

import './styles/index.css'

// Create a client
const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProductsProvider>
        <Router />
      </ProductsProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
