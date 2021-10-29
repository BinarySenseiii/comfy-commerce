import styled from 'styled-components'
import {PageHero} from '../components'

const CheckoutPage = () => {
  return (
    <>
      <PageHero title={'checkout'} />
      <Wrapper className="page">
        <h1>Checkout here.</h1>
      </Wrapper>
    </>
  )
}
const Wrapper = styled.div``
export default CheckoutPage
