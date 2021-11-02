import React from 'react'
import {ACTIONS} from '../constants/Actions'
import {products} from '../types'
import {useProductsContext} from './ProductContext'

interface IState {
  filter_products: products[]
  all_products: products[],
  Grid_view: boolean
}

type IActions = {type: ACTIONS.LOAD_PRODUCTS; payload: products[]}

interface IContextModel {
  state: IState
  dispatch: React.Dispatch<IActions>
}

const initialState: IState = {
  filter_products: [],
  all_products: [],
  Grid_view: true
}

const FilterContext = React.createContext({} as IContextModel)

const reducer = (state: IState, action: IActions) => {
  switch (action.type) {
    case ACTIONS.LOAD_PRODUCTS:
      return {
        ...state,
        all_products: [...action.payload],
        filter_products: [...action.payload],
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
