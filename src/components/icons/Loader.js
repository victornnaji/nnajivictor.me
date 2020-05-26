import React from 'react'
import styled from 'styled-components'

const LoaderIcon = () => {

    return (
      <LoaderBox>
        <h4 className="ml4">
          <span className="letters letters-1">Ready</span>
          <span className="letters letters-2">Set</span>
          <span className="letters letters-3">Go!</span>
        </h4>
      </LoaderBox>
    )
}

const LoaderBox = styled.div`
  
`

export default LoaderIcon
