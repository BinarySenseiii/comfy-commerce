import styled from 'styled-components'
import {useCartContext} from '../context/CartContext'
import {Link} from 'react-router-dom'
import CartColumns from './CartColumn'
import CartItem from './CartItem'
import CartTotals from './CartTotal'
import {ACTIONS} from '../constants/Actions'

const CartContent = () => {
  const {state, dispatch} = useCartContext()

  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {state.cart.map((item: any) => (
        <CartItem key={item.id} {...item} />
      ))}
      <hr />
      <div className="link-container">
        <Link to="/products" className="link-btn">
          continue shopping
        </Link>
        <button
          onClick={() => dispatch({type: ACTIONS.CLEAR_CART})}
          type={'button'}
          className="link-btn clear-btn"
        >
          Clear shopping cart
        </button>
      </div>
      <CartTotals />
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`
export default CartContent
