import React from 'react';
import { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import Pagination from "../components/Pagination";

// To call api request we use axios module
import axios from 'axios';


function Movies() {

    const [page, setPage] = useState(1);

    // State Variable to store movies data
    /** movies is empty Array because there can be multiple moviesData*/
    const [movies, setMovies] = useState([]);

    // To show the emoji o the specific card which is hover
    // We need to check where the hover happened then  we will update Ui
    // Hence we need another state
    const [hover, setHover] = useState('');

    // For tracking favourites we will need usestate
    const [favourites, setFavourites] = useState([]);

    function nextPage() {
        setPage(page + 1);
    }

    function prevPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }



    // To Remove loader and show the data in UI we have to use useEffect

    useEffect(function () {
        // This Request Will be hit after the UI is set for the first time loader is visible for the
        // Time

        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=d51df62870e456588d0874a6157852b3&page=${page}`).then((res) => {
            // console.table(res.data.results);

            // Now we have the dataa saved in data but not in UI
            // 
            setMovies(res.data.results);

            let oldFav = localStorage.getItem('imdb');
            oldFav = JSON.parse(oldFav) || []; //If there is nothing in oldFav to parse then there must be an empty array to parse
            setFavourites([...oldFav])


        }

        )
    }, [page])

    let add = (movie) => {
        let newArr = [...favourites, movie];
        setFavourites([...newArr])
        // console.log(newArr);
        localStorage.setItem("imdb", JSON.stringify(newArr));
    }

    let del = (movie) => {
        let newArr = favourites.filter((m) => m.id != movie.id);
        setFavourites([...newArr]);
        localStorage.setItem("imdb" , JSON.stringify(newArr));

    }

    return <>
        <div className="mb-8">

            {/* Parent For All Card */}
            <div className=" mt-8 font-bold text-2xl text-center">Trending Movies</div>

            {
                movies.length === 0 ?
                    <div className='flex justify-center my-8'>
                        <Oval
                            heigth="50"
                            width="50"
                            color='grey'
                            secondaryColor='grey'
                            ariaLabel='loading'
                        />
                    </div> :


                    <div className="flex flex-wrap justify-center">
                        {
                            movies.map((movie) => (

                                <div className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] h-[60vh] bg-center bg-cover md:h-[30vh] md:w-[250px] h-[25vh] w-[150px] rounded-xl
                                flex items-end m-4 hover:scale-110 ease-out duration-300 relative
                                `}
                                    onMouseEnter={() => {
                                        setHover(movie.id)
                                        /** console.log(movie.id) */
                                    }}
                                    onMouseLeave={() => {
                                        setHover("");
                                    }}
                                >
                                    {
                                        hover == movie.id && <> {
                                            !favourites.find((m) =>m.id == movie.id) ?

                                            <div className='absolute top-2 right-2 text-xl p-1.5 bg-gray-800 rounded-xl cursor-pointer'
                                            onClick={() =>add(movie)}>😍</div> :

                                            <div className='absolute top-2 right-2 text-xl p-1.5 bg-gray-800 rounded-xl cursor-pointer'
                                            onClick={() =>del(movie)} 
                                            >❌</div>
                                        }
                                    </>
                                    }

                                    <div className='text-white text-center absolute top-2 left-2 p-1 bg-gray-800 rounded-xl'>⭐{movie.vote_average}</div>

                                    <div className="bg-gray-900 text-white py-2 w-full text-center rounded-b-xl font-bold">{movie.title}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }

        </div>
        <Pagination pageProp={page} goBack={prevPage} goAhead={nextPage} />
    </>
}

export default Movies;


// https://api.themoviedb.org/3/trending/movie/week?api_key=d51df62870e456588d0874a6157852b3&page=1