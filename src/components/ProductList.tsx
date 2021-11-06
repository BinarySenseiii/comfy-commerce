import {useFilterContext} from '../context/FiltersContext'
import {useProductsContext} from '../context/ProductContext'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {state} = useFilterContext()
  const {
    state: {
      products: {isLoading},
    },
  } = useProductsContext()

  const {Grid_view, filter_products} = state

  if (isLoading) {
    return (
      <h5 style={{textTransform: 'none'}}>
        please wait products is loading ...
      </h5>
    )
  }

  if (filter_products.length < 1) {
    return (
      <h5 style={{textTransform: 'none'}}>
        sorry, no products matched your search...
      </h5>
    )
  }

  if (Grid_view === false) {
    return <ListView products={filter_products} />
  }

  return <GridView products={filter_products} />
}

export default ProductList
