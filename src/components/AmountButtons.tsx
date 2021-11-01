import React from 'react'
import styled from 'styled-components'
import {FaPlus, FaMinus} from 'react-icons/fa'

interface Iprops {
  quantity: number
  increaseHandler: () => void
  decreaseHandler: () => void
}

const AmountButtons: React.FC<Iprops> = ({
  quantity,
  increaseHandler,
  decreaseHandler,
}) => {
  return (
    <Wrapper className="amount-btsn">
      <button className="amount-btn" type="button" onClick={decreaseHandler}>
        <FaMinus />
      </button>
      <h2 className="amount">{quantity}</h2>
      <button className="amount-btn" type="button" onClick={increaseHandler}>
        <FaPlus />
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`

export default AmountButtons
