import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({handleAddtoWatchlist , handleRemoveFromWatchlist , watchlist}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setpageNo] = useState(1);

  const handlePrev = () => {
    if (pageNo === 1) {
      setpageNo(1);
    } else {
      setpageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setpageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=29960287a30f9bb883f1518f70413e8b&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        setMovies(res.data.results);
      });
  }, [pageNo]);

  return (
    <div className="p-5">
      <div className="text-2xl m-5 font-bold text-center ">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around ">
        {movies.map((movieObj) => {
          return (
            <MovieCard
            key={movieObj.id}
            watchlist={watchlist}
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              name={movieObj.original_title}
              handleAddtoWatchlist={handleAddtoWatchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            />
          );
        })}
      </div>
      <Pagination
        pageNo={pageNo}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
}

export default Movies;

//https://api.themoviedb.org/3/movie/popular?api_key=29960287a30f9bb883f1518f70413e8b&language=en-US&page=1
