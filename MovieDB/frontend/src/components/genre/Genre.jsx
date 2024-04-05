import { useContext } from "react";
import { mainContext } from "../../context/mainProvider";
import axios from 'axios'
import { useEffect, useState } from "react";
import SearchShowList from "../searchShowList/SearchShowList";


const Genre = () => {



    // const { genre, setGenre } = useContext(mainContext)
    const [apiKey] = useState('api_key=1f06982c9b50c78835d9370e1b4a9b83')
    const [movieID, setMovieID] = useState(0)
    const [apiLink, setApiLink] = useState({
        now: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
        popular: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        topRated: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
        upcoming: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
        details: `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
        images: `https://api.themoviedb.org/3/movie/${movieID}/images`,
        videos: `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`
    })



    const [genre, setGenre] = useState([])


    const [nowfetch, setNowFetch] = useState(false)

    useEffect(() => {
        const apiFetch = async () => {
            const result = await axios.get(`${apiLink.topRated}&${apiKey}`)
            setGenre(result.data.results)
        }
        apiFetch()
    }, [])







    const fetchUndFilterNachAction = () => {
        setNowFetch(true)

        const sortedMovies = genre?.filter((movie) => {
            return movie?.genre_ids.includes(28)
        })
        console.log("sortedMovies", sortedMovies);
        setSortedMovies(sortedMovies)

    }



    const [sortedMovies, setSortedMovies] = useState([])




    const fetchUndFilterNachComedy = () => {
        setNowFetch(true)
        const sortedMovies = genre?.filter((movie) => {
            return movie?.genre_ids.includes(35)
        })
        console.log("sortedMovies", sortedMovies);
        setSortedMovies(sortedMovies)
    }

    return (
        <>

            <button onClick={fetchUndFilterNachAction}>Action</button>
            <button onClick={fetchUndFilterNachComedy}>Comedy</button>
            <button>Horror</button>

            {
                sortedMovies ?
                    (
                        sortedMovies?.map((movie, index) => {
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

        </>
    );
}

export default Genre;