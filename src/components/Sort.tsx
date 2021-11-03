import React from 'react'
import {sortT, useFilterContext} from '../context/FiltersContext'
import {BsFillGridFill, BsList} from 'react-icons/bs'
import {ACTIONS} from '../constants/Actions'
import styled from 'styled-components'

const Sort = () => {
  const {state, dispatch} = useFilterContext()
  const {Grid_view, filter_products: products, sort} = state

  const updateSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // const name = e.target.name
    const value = e.target.value

    dispatch({type: ACTIONS.UPDATE_SORT, payload: (value) as sortT})
  }

  React.useEffect(() => {
    dispatch({type: ACTIONS.SORT_PRODUCTS})

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort])

  return (
    <Wrapper>
      <div className="btn-container">
        <button
          type="button"
          className={`${Grid_view && 'active'}`}
          onClick={() => dispatch({type: ACTIONS.SET_GRID_VIEW})}
        >
          <BsFillGridFill />
        </button>
        <button
          type="button"
          className={`${!Grid_view && 'active'}`}
          onClick={() => dispatch({type: ACTIONS.SET_LIST_VIEW})}
        >
          <BsList />
        </button>
      </div>
      <p>{products.length} products found</p>
      <hr />
      <form>
        <label htmlFor="sort">sort by </label>
        <select name="sort" id="sort" value={sort} onChange={updateSort}>
          <option value="price-lowest">price (lowest)</option>
          <option value="price-highest">price (highest)</option>
          <option value="name-a">name (a-z)</option>
          <option value="name-z">name (z-a)</option>
        </select>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`

export default Sort
