import React from 'react'
import { useNavigate } from 'react-router-dom'
import './introApp.css'
import LandingImg from '../../../src/assets/EyeCatcher.png'



const IntroApp = () => {

    const navigate = useNavigate()
    const goToHome = () => {
        navigate('/home')
    }

    return (
        <>
            <main className='bodyIntro'>
                <section className='scEyeCatcher'>
                    <img src={LandingImg} alt="" />
                </section>
                <section className='scIntroDescription'>
                    <div className='divIntroDescription'>
                        <h2>Enjoy Your Movie, Watch Everywhere.</h2>
                        <p>Stream unlimited movies and TV shows on your phone,tablet, laptop, and TV.</p>
                        <button
                            onClick={goToHome}
                        >Get Started</button>
                    </div>
                </section>
            </main>
        </>
    )
}

export default IntroApp