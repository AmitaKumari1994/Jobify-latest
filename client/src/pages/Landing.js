import React from 'react'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main-alternative.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo/>
        </nav>
        <div className='container page'>
            <div className='info'>
                <h1>
                    Job <span> tracking </span> app
                </h1>
                <p>I'm baby gluten-free irony synth hoodie. Marfa sustainable deep v hashtag artisan asymmetrical. Fanny pack meh prism, fashion axe bruh locavore cronut. Biodiesel put a bird on it 3 wolf moon fixie, cliche marfa tacos meditation.</p>
                <Link to='/Register' className='btn btn-hero' >Login/Register</Link>
            </div>
            <img src={main} alt ='job-hunt' className='img main-img'></img>
        </div>
    </Wrapper>
  )
}



export default Landing
