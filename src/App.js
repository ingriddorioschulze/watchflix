import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Row from './Row'
import Banner from './Banner'
import NavBar from './NavBar'
import requests from './requests'
import theme from './theme'
import GlobalStyles from './GlobalStyles'

const AppWrapper = styled.div`
  background-color: #111;
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppWrapper>
        <NavBar />
        <Banner />
        <Row
          title="NETFLIX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow={true}
        />
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      </AppWrapper>
    </ThemeProvider>
  )
}

export default App
