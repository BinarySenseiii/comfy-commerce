import {useFilterContext} from '../context/FiltersContext'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {state} = useFilterContext()

  const {Grid_view, filter_products: products} = state

  if (products.length < 1) {
    return (
      <h5 style={{textTransform: 'none'}}>
        sorry, no products matched your search...
      </h5>
    )
  }

  if(Grid_view === false) {
    return <ListView products={products} />
  }

  return <GridView products={products} />
}

export default ProductList
