import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import links from '../utils/links'
import  NavLinks  from './NavLinks.js'
import Logo from './Logo'

const SmallSidebar = () => {
  const {showSidebar ,toggleSidebar} = useAppContext();
  return (
    <Wrapper>
      <div className={showSidebar?'sidebar-container show-sidebar':'sidebar-container'}>
        <div className='content'>
          <button
          type='button'
          className='close-btn'
          onClick={toggleSidebar}> 
          <FaTimes/>
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar}/>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar
