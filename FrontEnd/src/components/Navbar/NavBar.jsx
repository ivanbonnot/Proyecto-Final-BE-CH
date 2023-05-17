import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Cart from "../CartWidget/CartWidget";


function NavBar() {
  return (
    <>
      <NavContainer>
        <div className="container">
          <h1 className="logo">
            <Link to={'/'}>Planeta 3D</Link>
          </h1>
          <ul>
            <li>
              <Link to={'/category/1'}>Impresoras</Link>
            </li>
            <li>
              <Link to={'/category/2'}>Filamentos</Link>
            </li>
            <li>
              <Link to={'/'}>products</Link>
            </li>
            
          </ul>
          
          <div>
            <Cart />
          </div>
        </div>
      </NavContainer>
    </>
  );
}

export default NavBar;

// Usar extension de vs vscode-styled-components
const NavContainer = styled.nav`
  position: absolute;
  background-color: #222;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.3s ease-in-out;
  

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    transition: all 0.3s ease-in-out;
    height: 100px;
  }

  ul {
    display: flex;
    list-style-type: none;
    align-items: center;
    justify-content: center;
    margin: 0px;
  }

  a {
    color: #fff;
    text-decoration: none;
    padding: 7px 15px;
    transition: all 0.3s ease-in-out;
  }

  a.current,
  a:hover {
    color: rgb(131, 247, 131);
  }

  .burguer {
    @media(min-width: 768px){
    display:none;
   }
  }

`;
