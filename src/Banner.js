import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from './axios'
import requests from './requests'

const base_url = 'https://image.tmdb.org/t/p/original/'

//#region styles
const BannerWrapper = styled.div`
  .banner {
    color: white;
    object-fit: contain;
    height: 448px;
  }

  .banner-content {
    margin-left: 30px;
    padding-top: 140px;
    height: 190px;
  }

  .banner-title {
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
    color: white;
    margin: 0;
    font-family: 'Ubuntu', sans-serif;
  }

  .banner-description {
    width: 45rem;
    line-height: 1.3;
    padding-top: 1rem;
    font-size: 0.8rem;
    height: 80px;
    max-width: 360px;
    color: white;
    margin: 0;
    font-family: 'Ubuntu', sans-serif;
  }

  .banner-button {
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-right: 1rem;
    padding-top: 0.5rem;
    background-color: rgba(51, 51, 51, 0.5);
    padding-bottom: 0.5rem;
    font-family: 'Ubuntu', sans-serif;

    :hover {
      color: #000;
      background-color: #e6e6e6;
      transition: all 0.2s;
    }
  }

  .banner-fade-bottom {
    height: 7.4rem;
    background-image: linear-gradient(
      180deg,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
    );
  }
`
//#endregion

function Banner() {
  const [movie, setMovie] = useState()

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals)
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ],
      )
      return request
    }
    fetchData()
  }, [])

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  if (!movie) return null

  return (
    <BannerWrapper>
      <header
        className="banner"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${base_url}${movie.backdrop_path})`,
          backgroundPosition: 'center center',
        }}
      >
        <div className="banner-content">
          <h1 className="banner-title">
            {movie.title || movie?.name || movie.original_name}
          </h1>
          <div className="banner-buttons">
            <button className="banner-button">Plan</button>
            <button className="banner-button">My List</button>
          </div>
          <h1 className="banner-description">
            {truncate(movie.overview, 150)}
          </h1>
        </div>
        <div className="banner-fade-bottom" />
      </header>
    </BannerWrapper>
  )
}

export default Banner
