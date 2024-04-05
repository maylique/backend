import React, { useContext } from 'react'
import Youtube from 'react-youtube'
import { mainContext } from '../../context/mainProvider'
import './trailer.css'
import Nav from '../../components/nav/Nav'
import { useNavigate } from 'react-router-dom'
// import Detail from '../detail/Detail'

const Trailer = () => {

    const { trailer, detail } = useContext(mainContext)

    const navigate = useNavigate()

    const opts = {
        height: window.innerHeight * 0.8,
        width: window.innerWidth,
        playerVars: {
            autoplay: 1
        }
    }

    const goBack = () => {
        navigate(-1)
    }
    console.log(detail?.original_title);
    trailer ? console.log(trailer[0]) : null;
    detail ? console.log(detail) : null;

    return (
        <>
            <main>
                <header className='headerTrailer'>
                    <div>
                        <button onClick={goBack}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="14" viewBox="" fill="none">
                                <path d="M4.15882 6.858H22.1258M7.85782 11.7156L3 6.85782L7.85782 2" stroke="black" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </button></div>
                    <h1>Trailer of {detail?.original_title}</h1>
                </header>

                <section className='scTrailer'>
                    {
                        trailer ? (
                            <>
                                <Youtube videoId={trailer[0]?.key} opts={opts} />
                            </>
                        ) : null
                    }
                </section>
            </main>
            <Nav />
        </>
    )
}

export default Trailer