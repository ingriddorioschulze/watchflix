import React, { useState, useEffect } from 'react'
import axios from './axios'
import YouTube from 'react-youtube'
import styled from 'styled-components'
import movieTrailer from 'movie-trailer'

const base_url = 'https://image.tmdb.org/t/p/original/'

//#region styles
const RowWrapper = styled.div`
  margin-left: 20px;

  .row-title {
    font-size: 16px;
    padding-left: 20px;
    color: white;
    margin: 0;
    font-family: 'Ubuntu', sans-serif;
  }
`
const RowPostersWrapper = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
  .row-poster {
    width: 100%;
    max-height: 100px;
    margin-right: 10px;
    object-fit: contain;
    transition: transform 450ms;
    :hover {
      transform: scale(1.08);
    }
  }
  .row-poster-large {
    max-height: 250px;
    :hover {
      transform: scale(1.09);
    }
  }
`
//#endregion

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState('')

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)
      return request
    }
    fetchData()
  }, [fetchUrl])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  }

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.name || '')
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get('v'))
        })
        .catch(alert(`Sadly we didn't find a trailer for ${movie.name}.`))
    }
  }

  return (
    <RowWrapper>
      <h1 className="row-title">{title}</h1>
      <RowPostersWrapper>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row-poster ${isLargeRow && 'row-poster-large'}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </RowPostersWrapper>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </RowWrapper>
  )
}

export default Row
