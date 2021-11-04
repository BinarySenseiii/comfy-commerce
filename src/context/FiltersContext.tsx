import React from 'react'
import {ACTIONS} from '../constants/Actions'
import {products} from '../types'
import {useProductsContext} from './ProductContext'

export type sortT = 'price-lowest' | 'price-highest' | 'name-a' | 'name-z'
interface IState {
  filter_products: products[]
  all_products: products[]
  Grid_view: boolean
  sort: sortT
  filters: any
}

type IActions =
  | {type: ACTIONS.LOAD_PRODUCTS; payload: products[]}
  | {type: ACTIONS.SORT_PRODUCTS}
  | {type: ACTIONS.FILTER_PRODUCTS}
  | {type: ACTIONS.CLEAR_FILTERS}
  | {type: ACTIONS.SET_GRID_VIEW | ACTIONS.SET_LIST_VIEW}
  | {
      type: ACTIONS.UPDATE_SORT
      payload: sortT
    }
  | {
      type: ACTIONS.UPDATE_FILTERS
      payload: {name: string; value: string}
    }

interface IContextModel {
  state: IState
  dispatch: React.Dispatch<IActions>
}

const initialState: IState = {
  filter_products: [],
  all_products: [],
  Grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    colors: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
}

const FilterContext = React.createContext({} as IContextModel)

const reducer = (state: IState, action: IActions) => {
  switch (action.type) {
    case ACTIONS.LOAD_PRODUCTS:
      let maxPrice = action.payload.map(p => p.price)
      // @ts-ignore
      maxPrice = Math.max(...maxPrice)
      return {
        ...state,
        all_products: [...action.payload],
        filter_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
        },
      }
    case ACTIONS.UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      }
    case ACTIONS.CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          colors: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      }
    case ACTIONS.SORT_PRODUCTS:
      const {sort, filter_products} = state
      let tempProducts = [...filter_products]
      // sort nested Switch
      switch (sort) {
        case 'price-lowest':
          tempProducts = tempProducts.sort((a, b) => a.price - b.price)
          break
        case 'price-highest':
          tempProducts = tempProducts.sort((a, b) => b.price - a.price)
          break
        case 'name-a':
          tempProducts = tempProducts.sort((a, b) => {
            return a.name.localeCompare(b.name)
          })
          break
        case 'name-z':
          tempProducts = tempProducts.sort((a, b) => {
            return b.name.localeCompare(a.name)
          })
          break
      }
      return {
        ...state,
        filter_products: tempProducts,
      } // end Sort nested Switch
    case ACTIONS.UPDATE_FILTERS:
      const {name, value} = action.payload
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      }
    case ACTIONS.FILTER_PRODUCTS:
      const {all_products} = state
      const {text, category, company, colors, shipping, price} = state.filters
      let tempProducs = [...all_products]
      // filtering
      //Text
      if (text) {
        tempProducs = tempProducs.filter(products =>
          products.name.toLowerCase().startsWith(text),
        )
      }
      // category
      if (category !== 'all') {
        tempProducs = tempProducs.filter(
          products => products.category === category,
        )
      }
      // category
      if (company !== 'all') {
        tempProducs = tempProducs.filter(
          products => products.company === company,
        )
      }

      // colors
      if (colors !== 'all') {
        tempProducs = tempProducs.filter(product => {
          return product.colors.find(color => color === colors)
        })
      }

      // shipping
      if (shipping) {
        tempProducs = tempProducs.filter(products => products.shipping === true)
      }

      // price
      tempProducs = tempProducs.filter(products => products.price <= price)

      return {
        ...state,
        filter_products: tempProducs,
      }
    case ACTIONS.SET_GRID_VIEW:
      return {
        ...state,
        Grid_view: true,
      }
    case ACTIONS.SET_LIST_VIEW:
      return {
        ...state,
        Grid_view: false,
      }
    default:
      return state
  }
}

export const FilterProvider: React.FC = ({children}) => {
  const {state: productState} = useProductsContext()
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const products = productState.products?.data

  React.useEffect(() => {
    if (products !== undefined) {
      dispatch({type: ACTIONS.LOAD_PRODUCTS, payload: products})
    }
  }, [products])

  return (
    <FilterContext.Provider value={{state, dispatch}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return React.useContext(FilterContext)
}
