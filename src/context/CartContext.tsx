/* eslint-disable array-callback-return */
import React, {useContext, useReducer} from 'react'
import {ACTIONS} from '../constants/Actions'
import {product} from '../types'

interface Istate {
  cart: any
  total_items: number
  total_amount: number
  shipping_fee: number
}

type IActions =
  | {
      type: ACTIONS.ADD_TO_CART
      payload: {id: string; color: string; amount: number; product?: product}
    }
  | {type: ACTIONS.REMOVE_CART_ITEM; payload: string}
  | {
      type: ACTIONS.TOGGLE_CART_ITEM_AMOUNT
      payload: {id: string; value: string}
    }
  | {type: ACTIONS.CLEAR_CART}
  | {type: ACTIONS.COUNT_CART_TOTALS}

interface IContextModel {
  state: Istate
  dispatch: React.Dispatch<IActions>
}

const getLocalStorage = () => {
  let cart = window.localStorage.getItem('cart')

  if (cart) {
    return JSON.parse(cart)
  } else {
    return []
  }
}

const initialState: Istate = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
}

const CartContext = React.createContext({} as IContextModel)

const reducer = (state: Istate, action: IActions): Istate => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      const {id, color, amount, product} = action.payload
      const tempItem = state.cart?.find(
        (item: product) => item.id === id + color,
      )
      if (tempItem) {
        const tempCart = state.cart.map((cartItem: any) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max
            } else {
              return {
                ...cartItem,
                amount: newAmount,
              }
            }
          } else {
            return cartItem
          }
        })
        return {
          ...state,
          cart: tempCart,
        }
      } else {
        const newItem = {
          id: id + color,
          name: product?.name,
          color,
          amount,
          price: product?.price,
          max: product?.stock,
          image: product?.images[0].url,
        }
        return {...state, cart: [...state.cart, newItem]}
      }
    case ACTIONS.REMOVE_CART_ITEM:
      const tempCart = state.cart.filter(
        (item: product) => item.id !== action.payload,
      )
      return {
        ...state,
        cart: tempCart,
      }
    case ACTIONS.TOGGLE_CART_ITEM_AMOUNT:
      const {id: identity, value} = action.payload
      const tempCartz = state.cart.map((item: any) => {
        if (item.id === identity) {
          // increase Quantity
          if (value === 'inc') {
            let newAmount = item.amount + 1
            if (newAmount > item.max) {
              newAmount = item.max
            }

            return {
              ...item,
              amount: newAmount,
            }
          }

          // decrease Quantity
          if (value === 'dec') {
            let newAmount = item.amount - 1
            if (newAmount < 1) {
              newAmount = 1
            }

            return {
              ...item,
              amount: newAmount,
            }
          }
        } else {
          return item
        }
      })
      return {
        ...state,
        cart: tempCartz,
      }
    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: [],
      }
    case ACTIONS.COUNT_CART_TOTALS:
      const {total_items, total_amount} = state.cart.reduce(
        (total: any, cartItem: product) => {
          // @ts-ignore
          const {amount, price} = cartItem

          total.total_items += amount
          total.total_amount += price * amount

          return total
        },
        {
          total_items: 0,
          total_amount: 0,
        },
      )
      return {
        ...state,
        total_items,
        total_amount,
      }
    default:
      return state
  }
}

export const CartProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  React.useEffect(() => {
    dispatch({type: ACTIONS.COUNT_CART_TOTALS})
    window.localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])
  return (
    <CartContext.Provider value={{state, dispatch}}>
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
