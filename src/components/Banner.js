import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';


function Banner() {

    const [movie , setMovie] = useState([]);

    useEffect(function () {
        // This Request Will be hit if our loader is visible for the
        // Time

        axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=d51df62870e456588d0874a6157852b3&page=1").then((res) => {
            // console.table(res.data.results);

            // Now we have the dataa saved in data but not in UI
            // 
            setMovie(res.data.results[0]);

        }

        )
    } , [])
    return (
        <>
            <div className={`bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] md:h-[60vh] h-[40vh] bg-center bg-cover flex items-end `}>
                <div className="flex justify-center p-4 bg-gray-900 w-full tetx-xl md:text-3xl text-white  bg-opacity-50">{movie.title}</div>
            </div>
        </>
    );
}

export default Banner;
