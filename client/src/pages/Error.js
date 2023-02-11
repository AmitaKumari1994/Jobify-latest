import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
import img from '../assets/images/not-found.svg'

const Error = () => {
  return (
    <Wrapper className='full-page'>
        <div>
            <img src={img} alt='Page not found'/>
            <h3>Unable to find what you are looking for</h3>
            <p>Please click the below button to return to the home page</p>
            <Link to ='/' >Back home </Link>
        </div>

    </Wrapper>
  )
}

export default Error
