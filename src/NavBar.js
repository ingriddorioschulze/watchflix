import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

//#region styles
const NavBarWrapper = styled.div`
  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    height: 30px;
    transition-timing-function: ease-in;
    transition: all 0.5s;

    .navbar-logo {
      object-fit: contain;
      width: 140px;
      position: fixed;
    }

    .navbar-avatar {
      object-fit: contain;
      width: 30px;
      right: 20px;
      position: fixed;
    }
  }

  .navbar-black {
    background-color: #111;
  }
`
//#endregion

function NavBar() {
  const [show, handleShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true)
      } else handleShow(false)
    })
    return () => {
      window.removeEventListener('scroll')
    }
  }, [])

  return (
    <NavBarWrapper>
      <div className={`navbar ${show && 'navbar-black'}`}>
        <img
          className="navbar-logo"
          src="/watchflix_logo.png"
          alt="Watchflix Logo"
        />
        <img className="navbar-avatar" src="/avatar.png" alt="Avatar" />
      </div>
    </NavBarWrapper>
  )
}

export default NavBar
