import React, { useEffect, useState } from 'react'
import IntroApp from '../../components/introApp/IntroApp'
import SplashScreen from '../../components/splashScreen/SplashScreen'

const LandingPage = () => {

    const [mode, setMode] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setMode(true)
        }, 3500);
        return () => clearTimeout(timer)
    }, [])
    return (
        <>
            {mode ? <IntroApp /> : <SplashScreen />}
        </>
    )
}

export default LandingPage