import React from 'react'
import loader from '../assets/loader.gif'
import styled from 'styled-components'

function Loading() {
  return (
    <>
      <Container>
        <img src={loader} alt="" className="loader" />
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: transparent;
  height: 100%;
  width: 100%;
  .loader {
    max-inline-size: 100%;
  }
`

export default Loading