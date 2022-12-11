import React, { useState } from 'react';
import { MovieData } from '../../types/MovieData';
import { ResponseError } from '../../types/ReponseError';
import { getMovie } from '../../api';
import './FindMovie.scss';
// import { MovieCard } from '../MovieCard';

export const FindMovie: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState<MovieData | ResponseError>();
  const [isError, setIsError] = useState(false);

  const searchMovie = () => {
    try {
      getMovie(query)
        .then(setMovie);
    } catch (error) {
      setIsError(true);
    }
  };

  // console.log(movie);

  return (
    <>
      <form
        className="find-movie"
        onSubmit={(event => {
          event.preventDefault();
          searchMovie();
        })}
      >
        <div className="field">
          <label className="label" htmlFor="movie-title">
            Movie title
            {movie}
          </label>

          <div className="control">
            <input
              data-cy="titleField"
              type="text"
              id="movie-title"
              placeholder="Enter a title to search"
              className="input is-dander"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          {isError && (
            <p className="help is-danger" data-cy="errorMessage">
              Can&apos;t find a movie with such a title
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              data-cy="searchButton"
              type="submit"
              className="button is-light"
              disabled={!query}
            >
              Find a movie
            </button>
          </div>

          <div className="control">
            <button
              data-cy="addButton"
              type="button"
              className="button is-primary"
            >
              Add to the list
            </button>
          </div>
        </div>
      </form>

      {/* {!isError && (
        <div className="container" data-cy="previewContainer">
          <h2 className="title">Preview</h2>
          <MovieCard movie={{
            title: movie.Title,
            description: movie.plot,

          }}
          />
        </div>
      )} */}
    </>
  );
};
