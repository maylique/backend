import React, { useContext, useState } from 'react'
import './detail.css'
import { useParams, useNavigate } from 'react-router-dom'
import { mainContext } from '../../context/mainProvider'
import Nav from '../../components/nav/Nav'

const Detail = () => {

    const { id } = useParams()
    const { detail, setDetail, backPath } = useContext(mainContext)
    const [seeMore, setSeeMore] = useState(true)

    const navigate = useNavigate()                                      //Navigations
    const goBack = () => { navigate(-1) }                      //-back   
    const goToTrailer = () => { navigate('/trailer') }                    //-trialer

    const imgUrl = `https://image.tmdb.org/t/p/w342${detail.poster_path}`//IMG URL

    const ranking = (Math.ceil(detail.vote_average * 20) / 20).toFixed(1)// ranking

    const overviewFull = detail.overview

    const overview = detail?.overview?.slice(0, 100)                       //overview

    const genres = []                                                   //genres
    detail?.genres?.map((e) => {
        if (genres.length > 0) { genres.push(", ") }
        genres.push(e.name)
    })

    const lanuages = []                                                 //lanuages
    detail?.spoken_languages?.map((e) => {
        if (lanuages.length > 0) { lanuages.push(", ") }
        lanuages.push(e.english_name)
    })

    const prodComp = []                                                 //production Companies
    detail?.production_companies?.map((e) => {
        if (prodComp.length > 0) { prodComp.push(", ") }
        prodComp.push(e.name)
    })

    const prodCountry = []                                              //production Countries
    detail?.production_countries?.map((e) => {
        if (prodCountry.length > 0) { prodCountry.push(", ") }
        prodCountry.push(e.name)
    })

    let hours = `${Math.ceil(detail.runtime / 60)}h ${Math.ceil(detail.runtime % 60)}min`      //runtime

    const formattedBudget = `${new Intl.NumberFormat('de-DE').format(detail.budget)}$`         //Budget

    const formattedRevenue = `${new Intl.NumberFormat('de-DE').format(detail.revenue)}$`       //Revenue

    return (
        <>
            <main>
                <div id='detail'>
                    <div id="detailImgBox" style={{ backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${imgUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <button id='backArrow' onClick={() => goBack()}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="14" viewBox="0 0 25 14" fill="none">
                            <path d="M4.15882 6.858H22.1258M7.85782 11.7156L3 6.85782L7.85782 2" stroke="black" strokeWidth="4" strokeLinecap="round" />
                        </svg></button>
                        <div id='title'>
                            <p className='movieDetailTitle'>Movie Details</p>
                            <h1>{detail.title}</h1>
                        </div>
                    </div>
                    <div id="detailCard">
                        <ul>
                            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M7.12425 0.529761C7.20804 0.369913 7.33375 0.236078 7.48781 0.142713C7.64186 0.0493477 7.81841 0 7.99838 0C8.17834 0 8.35489 0.0493477 8.50894 0.142713C8.663 0.236078 8.78871 0.369913 8.87251 0.529761L10.7136 4.04591C10.7817 4.17612 10.8779 4.28949 10.9951 4.37779C11.1123 4.46609 11.2476 4.52711 11.3912 4.55643L15.2087 5.33262C15.3789 5.36729 15.537 5.44639 15.6671 5.56195C15.7971 5.67751 15.8945 5.82544 15.9494 5.99082C16.0043 6.1562 16.0147 6.33318 15.9797 6.50392C15.9447 6.67466 15.8655 6.83312 15.75 6.96331L13.0357 10.0175C12.943 10.1222 12.8733 10.2454 12.8315 10.379C12.7896 10.5126 12.7764 10.6536 12.7928 10.7927L13.2748 14.8917C13.2957 15.0689 13.2687 15.2485 13.1964 15.4115C13.1242 15.5745 13.0094 15.715 12.8643 15.818C12.7192 15.921 12.549 15.9829 12.3718 15.9969C12.1946 16.011 12.0169 15.9768 11.8574 15.8979L8.43396 14.2048C8.29828 14.1378 8.14909 14.1029 7.99788 14.1029C7.84667 14.1029 7.69748 14.1378 7.5618 14.2048L4.13443 15.8979C3.97496 15.9768 3.79724 16.011 3.62002 15.9969C3.44279 15.9829 3.27264 15.921 3.1275 15.818C2.98236 15.715 2.86762 15.5745 2.79538 15.4115C2.72314 15.2485 2.69608 15.0689 2.71705 14.8917L3.19906 10.7927C3.21543 10.6536 3.20224 10.5126 3.16036 10.379C3.11847 10.2454 3.04885 10.1222 2.95608 10.0175L0.249737 6.96232C0.134508 6.83232 0.0554031 6.67416 0.0203728 6.50375C-0.0146574 6.33334 -0.00437924 6.15668 0.0501745 5.99152C0.104728 5.82636 0.201636 5.67853 0.331158 5.56286C0.46068 5.4472 0.618253 5.3678 0.788043 5.33262L4.60162 4.55643C4.74522 4.52711 4.88052 4.46609 4.99772 4.37779C5.11491 4.28949 5.21106 4.17612 5.27919 4.04591L7.12425 0.529761Z" fill="#FFD500" />
                            </svg> {ranking}</li>
                            <li>{detail.release_date}</li>
                            <li>{genres[0]}</li>
                            <li>{hours}</li>
                        </ul>
                        <div id="overview">
                            <h2>Overview</h2>
                            {seeMore ? <p className='overviewText'>{overview}<span onClick={() => setSeeMore(false)}> ...see More</span></p>
                                : <div>
                                    <p className='overviewText'>{overviewFull}</p>

                                    <div className="genre">
                                        <p>Original title:</p>
                                        <p>{detail.original_title}</p>
                                    </div>

                                    {(prodComp.length > 0)
                                        ? <div className="genre">
                                            <p>Production Companies:</p>
                                            <p>{prodComp}</p>
                                        </div>
                                        : null}

                                    {(prodCountry.length > 0)
                                        ? <div className="genre">
                                            <p>Porduction Countries:</p>
                                            <p>{prodCountry}</p>
                                        </div>
                                        : null}

                                    {(detail.budget > 0)
                                        ? <div className="genre">
                                            <p>Budget:</p>
                                            <p>{formattedBudget}</p>
                                        </div>
                                        : null}

                                    {(detail.revenue > 0)
                                        ? <div className="genre">
                                            <p>Revenue:</p>
                                            <p>{formattedRevenue}</p>
                                        </div>
                                        : null}

                                </div>


                            }
                        </div>
                        <div id="overview">
                            <div>
                                <div className="genre">
                                    <p>Genres:</p>
                                    <p>{[genres]}</p>
                                </div>
                                <div className="genre">
                                    <p>Lanuages:</p>
                                    <p>{[lanuages]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button id='trailerButton' onClick={() => goToTrailer()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <path d="M13.558 5.90848C14.011 6.17266 14.3868 6.55096 14.648 7.00566C14.9092 7.46037 15.0467 7.9756 15.0467 8.49998C15.0467 9.02437 14.9092 9.5396 14.648 9.99431C14.3868 10.449 14.011 10.8273 13.558 11.0915L4.512 16.3685C4.05609 16.6345 3.53804 16.7756 3.01019 16.7774C2.48233 16.7791 1.96334 16.6416 1.50563 16.3787C1.04792 16.1158 0.667686 15.7367 0.403328 15.2798C0.13897 14.8229 -0.000154495 14.3043 1.90735e-06 13.7765V3.22248C2.09808e-05 2.69471 0.139275 2.17628 0.403704 1.71952C0.668133 1.26276 1.04838 0.883852 1.50606 0.62103C1.96374 0.358207 2.48266 0.220778 3.01044 0.222613C3.53821 0.224449 4.05616 0.365485 4.512 0.631484L13.558 5.90848Z" fill="white" />
                    </svg> Watch Trailer</button>
                </div>
            </main>
            <Nav />
        </>

    )
}

export default Detail
