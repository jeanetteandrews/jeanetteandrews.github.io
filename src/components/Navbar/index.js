import React from 'react'
import { FaBars } from 'react-icons/fa'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavWrap, NavBtnLink } from './NavbarElements'

const Navbar = ({ toggle }) => {
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavWrap>
                        <NavLogo to='/'>Jeanette Andrews</NavLogo>
                    </NavWrap>
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavWrap>
                                <NavLinks to="about">About</NavLinks>
                            </NavWrap>
                        </NavItem>
                        <NavItem>
                            <NavWrap>
                                <NavLinks to="projects">Projects</NavLinks>
                            </NavWrap>
                        </NavItem>
                        <NavItem>
                            <NavWrap>
                                <NavLinks to="experience">Experience</NavLinks>
                            </NavWrap>
                        </NavItem>
                        <NavItem>
                            <NavWrap>
                                <NavLinks to="contact">Contact</NavLinks>
                            </NavWrap>
                        </NavItem>
                        <NavItem>
                            <NavWrap>
                                <NavBtnLink href="https://drive.google.com/file/d/1LFHAfsy7RAw7XJODdNfZpp5Ycc4RRtmm/view?usp=sharing" target='_blank'>Resume</NavBtnLink>
                            </NavWrap>
                        </NavItem>
                    </NavMenu>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar
