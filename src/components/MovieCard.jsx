import React from "react";

function MovieCard({
  poster_path,
  name,
  handleAddtoWatchlist,
  movieObj,
  handleRemoveFromWatchlist,
  watchlist,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id === movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className=" h-[40vh] w-[180px] bg-cover bg-center rounded-xl hover:scale-110 duration-300 hover:cursor-pointer justify-between items-end flex flex-col m-1 mb-3"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => handleRemoveFromWatchlist(movieObj)}
          className="flex justify-center h-8 w-8 item-center rounded-lg m-4 bg-gray-900/60"
        >
          &#10060; 
        </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchlist(movieObj)}
          className="flex justify-center h-8 w-8 item-center rounded-lg m-4 bg-gray-900/60"
        >
          &#129505;
        </div>
      )}

      <div className="text-white text-l w-full p-2 text-center bg-gray-900/60 rounded-3xl ">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
 
