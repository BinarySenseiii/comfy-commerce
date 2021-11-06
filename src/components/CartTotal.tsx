import styled from 'styled-components'
import {useCartContext} from '../context/CartContext'
import {formatPrice} from '../utils/helpers'
import {useAuth0} from '@auth0/auth0-react'

const CartTotals = () => {
  const {
    state: {total_amount, shipping_fee},
  } = useCartContext()
  const {isAuthenticated, loginWithPopup} = useAuth0()

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal: <span>{formatPrice(total_amount)}</span>
          </h5>
          <p>
            shipping fee: <span>{formatPrice(shipping_fee)}</span>
          </p>
          <h4>
            order total: <span>{formatPrice(total_amount + shipping_fee)}</span>
          </h4>
        </article>
        {isAuthenticated ? (
          <a href="https://buy.stripe.com/test_28o4gHerKe9W4JWeUU" className="btn">
            proceed to checkout
          </a>
        ) : (
          <button
            type="button"
            className="btn"
            onClick={() => loginWithPopup()}
          >
            login to checkout
          </button>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`

export default CartTotals
