import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from './axios'

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

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)
      return request
    }
    fetchData()
  }, [fetchUrl])

  return (
    <RowWrapper>
      <h1 className="row-title">{title}</h1>
      <RowPostersWrapper>
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row-poster ${isLargeRow && 'row-poster-large'}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </RowPostersWrapper>
    </RowWrapper>
  )
}

export default Row
