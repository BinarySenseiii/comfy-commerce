import React, {memo} from 'react'
import styled from 'styled-components'
import {useFilterContext} from '../context/FiltersContext'
import {getUniqueValues, formatPrice} from '../utils/helpers'
import {FaCheck} from 'react-icons/fa'
import {ACTIONS} from '../constants/Actions'

const Filters = () => {
  const {state, dispatch} = useFilterContext()
  const {filters, all_products, sort} = state

  const clearFilters = () => {
    dispatch({type: ACTIONS.CLEAR_FILTERS})
  }

  const updateFilters = (e: any) => {
    let name = e.target.name
    let value = e.target.value

    switch (name) {
      case 'category':
        value = e.target.textContent
        break
      case 'colors':
        value = e.target.dataset.color
        break
      case 'price':
        value = Number(value)
        break
      case 'shipping':
        value = e.target.checked
        break
    }

    dispatch({type: ACTIONS.UPDATE_FILTERS, payload: {name, value}})
  }

  

  React.useEffect(() => {
    dispatch({type: ACTIONS.FILTER_PRODUCTS})
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, sort, filters ])

  const categories = getUniqueValues(all_products, 'category')
  const companies = getUniqueValues(all_products, 'company')
  const colors = getUniqueValues(all_products, 'colors')

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={e => e.preventDefault()}>
          {/* TODO: search Input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={filters.text}
              onChange={updateFilters}
            />
          </div>
          {/* TODO: categories */}
          <div className="form-control">
            <h5>Category</h5>
            <div>
              {categories.map((category: string, index: number) => (
                <button
                  onClick={updateFilters}
                  type="button"
                  name="category"
                  key={index}
                  className={`${filters.category === category && 'active'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {/* TODO: companies */}
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              onChange={updateFilters}
              value={filters.company}
              className="company"
            >
              {companies.map((company: string, index: number) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
          {/* TODO: colors */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((color: string, index: number) => {
                if (color === 'all') {
                  return (
                    <button
                      key={index}
                      name="colors"
                      data-color="all"
                      onClick={updateFilters}
                      className={` all-btn ${
                        filters.colors === 'all' && 'active'
                      }`}
                    >
                      all
                    </button>
                  )
                } else {
                  return (
                    <button
                      key={index}
                      name="colors"
                      data-color={color}
                      onClick={updateFilters}
                      style={{background: color}}
                      className={`${
                        filters.color === color
                          ? 'active color-btn'
                          : 'color-btn'
                      }`}
                    >
                      {filters.colors === color && <FaCheck />}
                    </button>
                  )
                }
              })}
            </div>
          </div>
          {/* TODO: price */}
          <div className="form-control">
            <h5>price</h5>
            <div className="price">{formatPrice(filters.price)}</div>
            <input
              min={filters.min_price}
              max={filters.max_price}
              type="range"
              name="price"
              value={filters.price}
              onChange={updateFilters}
            />
          </div>
          {/* TODO: shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              onChange={updateFilters}
              checked={filters.shipping}
              type="checkbox"
              name="shipping"
              id="shipping"
            />
          </div>
        </form>
        <button type="button" className='clear-btn' onClick={clearFilters}>
            clear filters
        </button>
      </div>
    </Wrapper>
    
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default memo(Filters)
