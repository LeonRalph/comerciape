import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Formulario from './Formulario';

const Header = () => {
  return (
    <header className="contenedor-header">
      <div className="contenido-header">
        <div className="logo-header">
          <a href="/">
          <img src="../images/LogoPNG.png" alt="Logo" />
          </a>
        </div>
        
        <input
          className="barra-busqueda-header"
          type="text"
          placeholder="Buscar productos..."
        />
                <Formulario/>
        <nav className="navegacion-header">
          <a href="#tendencia">Tendencia</a>
          <div className="menu-comprar">

            <Link to="/Carrito">Comprar</Link>

            <div className="submenu">


              <a href="#accesorio">Accesorio</a>
              <a href="#belleza">Belleza y Salud</a>
              <a href="#calzado">Calzado y Moda</a>
            </div>

          </div>
          <div className="menu-vender">
            <Link to="/vender">Vender</Link>
            <div className="submenu">
              <a href="#vender-productos">Vender productos</a>
              <a href="#vender-servicios">Vender servicios</a>
            </div>
          </div>
          <a href="#nosotros">Nosotros</a>
          <a href="#servicio-cliente">Servicio al Cliente</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
