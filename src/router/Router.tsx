import React, {Suspense} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Navbar, Sidebar, Footer} from '../components'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

// Pages
const Home = React.lazy(() => import('../pages/HomePage'))
const About = React.lazy(() => import('../pages/AboutPage'))
const Error = React.lazy(() => import('../pages/ErrorPage'))
const Checkout = React.lazy(() => import('../pages/CheckoutPage'))
const SingleProduct = React.lazy(() => import('../pages/SingleProduct'))
const Products = React.lazy(() => import('../pages/ProductsPage'))

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Wrapper>
            <Loader
              type="Oval"
              color="#AB7B60"
              height={50}
              width={50}
            />
          </Wrapper>
        }
      >
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/:id" component={SingleProduct} />
          <Route path="*" component={Error} />
        </Switch>
        <Footer />
      </Suspense>
    </BrowserRouter>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
export default Router
