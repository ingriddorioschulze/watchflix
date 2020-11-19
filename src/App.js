import React from 'react'
import styled from 'styled-components'
import Row from './Row'
import Banner from './Banner'
import NavBar from './NavBar'
import requests from './requests'

const AppWrapper = styled.div`
  background-color: #050404;

  h1 {
    color: #ffb100;
    font-family: 'Bebas Neue', cursive;
  }
`

function App() {
  return (
    <AppWrapper>
      <h1>WATCHFLIX</h1>
      <NavBar />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </AppWrapper>
  )
}

export default App
