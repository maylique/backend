import { useContext } from "react";
import { mainContext } from "../../context/mainProvider";
import SearchShowList from "../../components/searchShowList/SearchShowList";
import SearchBar from "../../components/searchBar/SearchBar";
const Search = () => {


    const { searchInput, setSearchInput, searchedOrFilteredMovies, setSearchedOrFilteredMovies, genre, setGenre } = useContext(mainContext)


    return (
        <>
            <h2>searchbar</h2>
            <SearchBar />
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
        </>
    );
}

export default Search;