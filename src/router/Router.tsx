import React, {Suspense} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Navbar, Sidebar, Footer} from '../components'

// Pages
const Home = React.lazy(() => import('../pages/HomePage'))
const About = React.lazy(() => import('../pages/AboutPage'))
const Error = React.lazy(() => import('../pages/ErrorPage'))
const Checkout = React.lazy(() => import('../pages/CheckoutPage'))


const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/checkout" component={Checkout} />
          <Route path="*" component={Error} />
        </Switch>
        <Footer />
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
