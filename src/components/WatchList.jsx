import React, { useEffect, useState } from "react";
import genreids from "../utility/genre";

function WatchList({ watchlist, setWatchlist ,handleRemoveFromWatchlist }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genre"]);
  const [currGenre, setCurrGenre] =useState('All Genre')

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleFilter = (genre)=>{
    setCurrGenre(genre)
  }

  let sortIncreasing = () => {
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchlist([...sortedIncreasing]);
  };

  let sortDecreasing = () => {
    let sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchlist([...sortedDecreasing]);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    temp = new Set(temp)
    setGenreList(["All Genre", ...temp]);
    console.log(temp);
  }, [watchlist]);

  return (
    <>
      <div className="flex justify-center flex-wrap">
        {genreList.map((genre) => {
          return <div onClick={()=>handleFilter(genre)} className={ currGenre==genre?"flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center bg-blue-400 mx-4":"flex justify-center items-center bg-gray-400 h-[3rem] w-[9rem] rounded-xl mx-4" }>
            {genre}
          </div>;
        })}

        
      </div>

      <div className="flex justify-center my-4 ">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
        />
      </div>

      <div className="overflow-hidden rounded-lg border broder-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
                <div onClick={sortIncreasing} className="p-2">
                  <i class="fa-solid fa-arrow-up"></i>
                </div>
                <th className="p-2">Ratings</th>
                <div onClick={sortDecreasing} className="p-2">
                  <i class="fa-solid fa-arrow-down"></i>
                </div>
              </th>

              <th className="p-2">Popularity</th>

              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.filter((movieObj)=>{
              if(currGenre === 'All Genre'){
                return true
              }else{
                return genreids[movieObj.genre_ids[0]]==currGenre;
              }
            })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[10rem] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        alt=""
                      />
                      <div className="mx-10">{movieObj.title}</div>
                    </td>

                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>

                    <td onClick={()=>handleRemoveFromWatchlist(movieObj)} className="text-red-400">Delete</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
