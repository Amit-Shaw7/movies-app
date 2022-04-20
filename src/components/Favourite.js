import React, { useEffect } from 'react';
import { useState } from 'react';
import Pagination from './Pagination';

function Favourite() {

    let genreiWithId = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
    }

    // we need to change the ui if any genre is clicked so that using useState to store its state
    const [curGenres, setCurGenres] = useState('All Genres');
    const [favourite, setFavourite] = useState([]);
    const [genreId, setGenreId] = useState([])
    const [rating , setRating] = useState(0)
    const [popularity , setPopularity] = useState(0)
    const [search , setSearch] = useState('');
    const [rows , setRows] = useState(5);
    const [curPage , setCurpage] = useState(1);

    // For local Storage 
    useEffect(function () {
        let oldFav = localStorage.getItem('imdb');
        oldFav = JSON.parse(oldFav) || [];//If nothing is present in oldFav there must be an empty array to parse
        setFavourite([...oldFav])
    }, [])

    // For Genre Butons
    useEffect(function () {
        let temp = favourite.map((movie) => (genreiWithId[movie.genre_ids[0]]))
        // console.log(temp)
        // Set Created to eliminate prevent repetation of elements
        temp = new Set(temp)
        setGenreId(['All Genres' , ...temp])

    }, [favourite])

    let del = (movie) => {
        let newArr = favourite.filter((m) => m.id != movie.id);
        setFavourite([...newArr]);
        localStorage.setItem("imdb", JSON.stringify(newArr));

    }

    let filteredMovie = [];
    filteredMovie = curGenres == 'All Genres' ? favourite : favourite.filter((movie) => genreiWithId[movie.genre_ids[0]] == curGenres)
    let allMovieInFavourites = filteredMovie;

    if(rating == 1){
        filteredMovie = filteredMovie.sort(function (objA , objB){
            return objA.vote_average - objB.vote_average;
        })
    }else if(rating == -1){
        filteredMovie = filteredMovie.sort(function (objA , objB){
            return objB.vote_average - objA.vote_average;
        })
    }

    if(popularity == 1){
        filteredMovie = filteredMovie.sort(function (objA , objB){
            return objA.popularity - objB.popularity;
        })
    }else if(popularity == -1){
        filteredMovie = filteredMovie.sort(function (objA , objB){
            return objB.popularity - objA.popularity;
        })
    }

    // Searching

    filteredMovie = allMovieInFavourites.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    )

    // Pagination
    let maxPage  = Math.ceil(filteredMovie.length / rows);
    let startPage = (curPage - 1 ) * rows;
    let endPage = Number(startPage) + Number(rows);

    filteredMovie = filteredMovie.slice(startPage , endPage);

    let goBack = () =>{
        if(curPage > 1){
            setCurpage(curPage-1);
        }
    }

    let goAhead = ()=>{
        if(curPage < maxPage){

            setCurpage(curPage+1);
        }
    }

    return (
        <>

            {/*  Genre Buttons   ---------------------------------------------------------------------------------------------------*/}
            <div className='flex justify-center flex-wrap space-x-2 mt-4 px-2'>
                {
                    genreId.map((genre) => (

                        <button className={
                            curGenres == genre ?

                                'm-2 text-xl p-1 bg-blue-400 text-white font-bold rounded-xl px-2' :
                                'm-2 text-xl p-1 bg-gray-400 hover:bg-blue-400 text-white font-bold rounded-xl px-2'
                        }
                        onClick={() => setCurGenres(genre)}
                        >
                            {genre}
                        </button>
                    ))
                }
            </div>

            {/* Note Area For Unrealeased Movie  */}
            <div className="text-center text-red-500 font-bold">
                Movie With Rating Zero Might Not Have Been Released
            </div>

            

            {/*  Input Buttons   ---------------------------------------------------------------------------------------------------*/}


            <div className='flex justify-center'>
                <input value={search} onChange={(e) =>{setSearch(e.target.value)}} className="w-40 md:w-150 border-2 text-center p-1 md:p-2 md:m-4 rounded-sm text-sm md:text-xl" type="text" placeholder='search' />

                <input value={rows} onChange={(e) =>{setRows(e.target.value)}} className="w-40 md:w-150 border-2 text-center p-1 md:p-2 md:m-4 rounded-sm text-sm md:text-xl" type="number" placeholder='rows' />

            </div>

            {/* Total Movies Section */}
            <div className="text-center text-blue-500 font-bold">
                {curGenres == 'All Genres' ? allMovieInFavourites.length + ' Movies in Favourites' : allMovieInFavourites.length + ' Movies in ' + curGenres}
            </div>

            {/*  Table Container  ---------------------------------------------------------------------------------------------------*/}

            <div>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className=" text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Name
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                <div className='flex justify-around'>
                                                    <img className='cursor-pointer mx-2' src="https://img.icons8.com/material-outlined/24/000000/circled-up.png"
                                                     onClick={()=>{
                                                         setPopularity(0)
                                                         setRating(1)
                                                         }} />
                                                    Rating
                                                    <img className='cursor-pointer mx-2' src="https://img.icons8.com/material-outlined/24/000000/circled-down.png"
                                                     onClick={()=>{
                                                         setPopularity(0)
                                                         setRating(-1)
                                                         }}/>
                                                </div>
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                <div className='flex justify-around'>
                                                    <img className='cursor-pointer mx-2' src="https://img.icons8.com/material-outlined/24/000000/circled-up.png"
                                                     onClick={()=>{
                                                        setRating(0)
                                                         setPopularity(1)

                                                         }}/>
                                                    Popularity
                                                    <img className='cursor-pointer mx-2' src="https://img.icons8.com/material-outlined/24/000000/circled-down.png"
                                                     onClick={()=>{
                                                        setRating(0)
                                                         setPopularity(-1)

                                                         }} />
                                                </div>
                                            </th>

                                            <th
                                                scope="col"
                                                className=" text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Genre
                                            </th>

                                            <th
                                                scope="col"
                                                className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Delete
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                                        {filteredMovie.map((movie) => (
                                            <tr key=''>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-30 w-40">
                                                            <img className="h-30 w-40 " src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{movie.title}</div>
                                                            <div className="text-sm text-gray-500"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900"><span className='py-0.5 px-2 rounded-xl bg-green-100'>{movie.vote_average}</span></div>
                                                    <div className="text-sm text-gray-500"></div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {movie.popularity}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{genreiWithId[movie.genre_ids[0]]}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button onClick={() => del(movie)} className='text-center border-2 border-red-200 px-2 py-1 text-red-500 rounded-xl'>
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Pagination   ---------------------------------------------------------------------------------------------------*/}

            <div className='mt-4'>
                <Pagination pageProp={curPage} goBack={goBack} goAhead={goAhead} />
            </div>

        </>
    )
}

export default Favourite;
