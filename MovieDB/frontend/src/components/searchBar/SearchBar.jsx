import "./searchBar.css"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import SearchShowList from "../searchShowList/SearchShowList"
import Genre from "../genre/Genre"
import { Link } from "react-router-dom"
import { mainContext } from '../../context/mainProvider'
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import ImageSlider from "../carusel/ImageSlider"

const SearchBar = () => {

    //  hier wollte ich das in mainProvider importieren aber funktiniert nicht gut
    const { searchInput, setSearchInput, searchedOrFilteredMovies, setSearchedOrFilteredMovies, genre, setGenre, showSlider, setShowSlider } = useContext(mainContext)



    // let [searchInput, setSearchInput] = useState("")
    // let [searchedOrFilteredMovies, setSearchedOrFilteredMovies] = useState()
    // const [genre, setGenre] = useState([])



    // const apiKey = 'api_key=1f06982c9b50c78835d9370e1b4a9b83'
    // const movieSearch = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`



    // const [movieID, setMovieID] = useState(0)
    // const [apiLink, setApiLink] = useState({
    //     now: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
    //     popular: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    //     topRated: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
    //     upcoming: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
    //     details: `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
    //     images: `https://api.themoviedb.org/3/movie/${movieID}/images`,
    //     videos: `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`,
    //     search: `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`
    // })


    // aici fac sa mearga search barul in alta pagina
    const navigate = useNavigate(); // Pasul 2: Inițializează useNavigate

    // Funcție care se declanșează la schimbarea inputului
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);

        // Pasul 3: Navighează la /search când utilizatorul începe să scrie
        // Poți să adaugi condiții suplimentare dacă este necesar
        if (value.trim().length > 0) {
            navigate(`/search?query=${encodeURIComponent(value)}`);
        }
    }
    // end cu searach bar





    /* // hier ist fetch für searchbar
    useEffect(() => {
        const getFetch = async () => {
            const result = await axios.get(`${movieSearch}&${apiKey}`)
            // const result = await axios.get(`${apiLink.search} & ${apiKey}`)
            setSearchedOrFilteredMovies(result?.data?.results)
        }
        getFetch()
    }, [searchInput])


    // hier ist fetch für genre
    useEffect(() => {
        const getFetch = async () => {
            const result = await axios.get(`${apiLink.popular}&${apiKey}`)
            setGenre(result?.data?.results)
            // setSearchedOrFilteredMovies(result?.data.results)
            console.log(result.data.results);
        }
        // nowfetch ? getFetch() : null
        getFetch()
    }, []) */




    // onclick function for filter nach action
    const filterNachAction = () => {
        if (searchInput == "") {
            const sortedMovies = [...genre]?.filter((movie) => {
                return movie?.genre_ids?.includes(28)
            })
            console.log("sortedMovies", sortedMovies);
            setSearchedOrFilteredMovies(sortedMovies)
            setShowSlider(false)
        }
        else {
            const sortedMovies = [...searchedOrFilteredMovies]?.filter((movie) => {
                return movie?.genre_ids?.includes(28)
            })
            console.log("sortedMovies", sortedMovies);
            setSearchedOrFilteredMovies(sortedMovies)
        }
    }


    // onclick function for filter nach comedy
    const filterNachComedy = () => {
        if (searchInput == "") {
            const sortedMovies = [...genre]?.filter((movie) => {
                return movie?.genre_ids?.includes(35)
            })
            console.log("sortedMovies", sortedMovies);
            setSearchedOrFilteredMovies(sortedMovies)
            setShowSlider(false)
        }
        else {
            const sortedMovies = [...searchedOrFilteredMovies]?.filter((movie) => {
                return movie?.genre_ids?.includes(35)
            })
            console.log("sortedMovies", sortedMovies);
            setSearchedOrFilteredMovies(sortedMovies)
            setShowSlider(false)
        }

    }

    // onclick function for filter nach horror
    const filterNachFantasy = () => {
        if (searchInput == "") {// setNowFetch(true)
            const sortedMovies = [...genre]?.filter((movie) => {
                return movie?.genre_ids?.includes(14)
            })
            console.log("sortedMovies", sortedMovies);
            setSearchedOrFilteredMovies(sortedMovies)
            setShowSlider(false)
        }
        else {
            const sortedMovies = [...searchedOrFilteredMovies]?.filter((movie) => {
                return movie?.genre_ids?.includes(14)
            })
            console.log("sortedMovies", sortedMovies);
            setSearchedOrFilteredMovies(sortedMovies)
        }
    }


    // show more movies link
    const showMoreMovies = () => {
        if (searchInput == "") {
            setSearchedOrFilteredMovies(genre)
            setShowSlider(false)
        }
    }



    const toogleSlider = () => {
        setShowSlider(!showSlider)
    }



    return (
        <main>
            {/* WELKOME TEXT show und hide */}
            {showSlider && <h1 className="welkomeText">Welcome!</h1>}

            {/* search input  */}
            <form className="seachBar">
                <input type="text" onChange={(e) => setSearchInput(e.target.value) & setShowSlider(false)} placeholder="Search Movie ..." />
            </form>

            {/* genre BUTTONS */}
            <div className="genreButtons">
                <button onClick={filterNachAction}>Action</button>
                <button onClick={filterNachComedy}>Comedy</button>
                <button onClick={filterNachFantasy}>Fantasy</button>
            </div>

            {/* show und hide the Carousel Header*/}
            {showSlider &&
                <div className="movieHeader">
                    <h2 >Trending movies</h2>
                    <p onClick={showMoreMovies}>See all</p>
                </div>
            }

            {/* show und hide the Carousel/ImageSlider*/}
            {showSlider &&
                <div className="imageSlider">
                    <ImageSlider />
                </div>
            }

            {/* show search results */}
            {
                searchedOrFilteredMovies === "" ? null : searchedOrFilteredMovies ?
                    (
                        searchedOrFilteredMovies?.map((movie, index) => {
                            return (

                                <div className="movieCard" key={index}>
                                    < SearchShowList movie={movie} />
                                </div>

                            )
                        })
                    )
                    :
                    (
                        <h1>loading...</h1 >
                    )
            }

        </main>
    );
}

export default SearchBar;