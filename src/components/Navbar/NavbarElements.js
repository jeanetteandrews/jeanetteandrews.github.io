import styled from 'styled-components'
import { Link as LinkR } from 'react-router-dom'
import { Link as LinkS } from 'react-scroll'

export const Nav = styled.nav`
    font-weight: 100;
    letter-spacing: 2px;
    background: #fff;
    height: 100px;
    /* margin-top: -80px; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    position: sticky;
    top: 0;

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    width: 100%;
    padding-right: 50px;
    padding-left: 50px;
`

export const NavLogo = styled(LinkR)`
    color: #000;
    justify-self: flex-start;
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
`

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`

export const NavMenu = styled.ul`
    display: flex;
    align-items: center; 
    list-style: none;
    text-align: center;
    /* margin-right: -22px; */

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavItem = styled.ul`
    height: 80px;
    display: flex; 
    align-items: center;
`

export const NavLinks = styled(LinkS)`
    color: #000;
    display: flex;
    align-items: center;
    text-decoration: none;
    /* padding: 0.5rem 1rem; */
    height: 100%;
    cursor: pointer;
    
    &:active {
        border-bottom: 3px solid #01bf71;
    }
`

export const NavBtnLink = styled.a`
    color: #000;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    height: 100%;
    cursor: pointer;
    

    border-radius: 9px;
    background: #01bf71;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`

// this is here so that mouse hovers over text only, 
// not over entire container
export const NavWrap = styled.nav`
    display: flex; 
    align-items: center;
    padding: 0.5rem 1rem;
`