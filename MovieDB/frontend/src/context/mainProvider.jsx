import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const mainContext = createContext()

const MainProvider = ({ children }) => {

    const [apiKey] = useState('api_key=1f06982c9b50c78835d9370e1b4a9b83')
    const [backPath, setBackPath] = useState('')
    const [movieID, setMovieID] = useState(0)
    const [detail, setDetail] = useState([])
    const [trailer, setTrailer] = useState([])


    let [searchInput, setSearchInput] = useState("")
    let [searchedOrFilteredMovies, setSearchedOrFilteredMovies] = useState()
    const [genre, setGenre] = useState([])

    const [apiLink, setApiLink] = useState({
        now: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
        popular: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        topRated: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
        upcoming: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
        details: `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
        images: `https://api.themoviedb.org/3/movie/${movieID}/images`,
        videos: `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`,
        search: `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`
    })

    const movieSearch = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`

    // toogle hides or shows the carousel or welcome text
    const [showSlider, setShowSlider] = useState(true)

    // if (movieID != 1212073) {
    //     setMovieID(1212073)
    // }

    // useEffect(() => {
    //     const apiFetch = async () => {
    //         try {
    //             const resp = await axios.get(`${apiLink.popular}&${apiKey}`);
    //             setSeeMostPopularMovies(resp.data.results);
    //             console.log(resp);
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     };

    //     apiFetch();
    // }, [apiLink.popular]);

    useEffect(() => {
        movieID ? (
            setApiLink((prevState) => ({
                ...prevState,
                details: `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
                videos: `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`
            }))
        ) : null;

    }, [movieID])

    useEffect(() => {
        const getFetch = async () => {
            const resp = await axios.get(`${apiLink.details}&${apiKey}`)
            const data = await resp.data
            setDetail(data)
            console.log(resp)

        }
        movieID ? getFetch() : null
    }, [apiLink.details])

    useEffect(() => {
        const getFetch = async () => {
            const resp = await axios.get(`${apiLink.videos}&${apiKey}`)
            const data = await resp.data.results
            setTrailer(data)
            console.log(data)

        }
        apiLink.videos ? getFetch() : null
    }, [apiLink.videos])



    // hier ist fetch für searchbar
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
    }, [])


    // * save data into LocalStorage

    const [storageMovie, setStorageMovie] = useState(() => {
        const storedMovie = JSON.parse(localStorage.getItem('storageMovie'));
        if (storedMovie && Array.isArray(storedMovie)) {
            
            return storedMovie.filter(item => typeof item === 'object');
        }
        return []
    });

    useEffect(() => {
        localStorage.setItem('storageMovie', JSON.stringify(storageMovie));
        console.log(JSON.parse(localStorage.getItem('storageMovie')));
    }, [storageMovie]);




    return (
        <>
            <mainContext.Provider
                value={{ apiKey, apiLink, movieID, setMovieID, detail, setDetail, trailer, setTrailer, backPath, setBackPath, genre, setGenre, storageMovie, setStorageMovie, searchedOrFilteredMovies, setSearchedOrFilteredMovies, searchInput, setSearchInput, showSlider, setShowSlider }}
            >
                {children}
            </mainContext.Provider>
        </>
    )
}

export default MainProvider