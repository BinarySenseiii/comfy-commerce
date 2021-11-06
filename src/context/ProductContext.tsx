import axios from 'axios'
import React from 'react'
import {createContext, useContext, useReducer} from 'react'
import { useQuery } from 'react-query'
import {products_url} from '../utils/Constants'


import {ACTIONS} from '../constants/Actions'
import {products, productsType} from '../types'

interface IState {
  isSideBarOpen: boolean
  products: productsType
  featuredProducts: products[]
}

type IActions =
  | {type: ACTIONS.SIDEBAR_OPEN | ACTIONS.SIDEBAR_CLOSE}
  | {type: ACTIONS.GET_PRODUCTS_BEGIN; payload: productsType}
  | {type: ACTIONS.GET_FEATURED_PRODUCTS}

const initialState: IState = {
  isSideBarOpen: false,
  products: {} as productsType,
  featuredProducts: [],
}

interface IContextModel {
  state: IState
  dispatch: React.Dispatch<IActions>
}

const ProductsContext = createContext({} as IContextModel)

const reducer = (state: IState, action: IActions): IState => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS_BEGIN:
      return {
        ...state,
        products: action.payload,
      }
    case ACTIONS.GET_FEATURED_PRODUCTS:
      return {
        ...state,
        featuredProducts: state.products.data?.filter(
          product => product.featured === true,
        )!,
      }
    case ACTIONS.SIDEBAR_OPEN:
      return {
        ...state,
        isSideBarOpen: true,
      }
    case ACTIONS.SIDEBAR_CLOSE:
      return {
        ...state,
        isSideBarOpen: false,
      }

    default:
      return state
  }
}

export const ProductsProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

    // Queries
    const {data, isLoading, isError} = useQuery<products[], Error>(
      'products',
      () => axios.get(products_url).then(response => response.data)
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
    <ProductsContext.Provider value={{state, dispatch}}>
      {children}
    </ProductsContext.Provider>
  )
}

// make sure use
export const useProductsContext = () => useContext(ProductsContext)
