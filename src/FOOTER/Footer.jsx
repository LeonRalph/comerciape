import React from 'react';
import './Footer.css'; 
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="pie">
      <div className="header">
        <div className="logo">
          <img src="logo.png" alt="Logo de ComerciaPe" /> {/*Colocar logo */}
          <p className="logotipo">ComerciaPe</p>  
        </div>
        <div className="redes">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </div>
      </div>
      <hr />
      <div className="section">
        <div>
          <h2>Nosotros</h2>
          <a href="/Trabaja">Trabaja con nosotros</a>
          <a href="/Blog">Blog</a>
          <a href="/Acerca">Acerca de ComerciaPe</a>
      
        </div>
        <div>
          <h2>Cuenta</h2>
          <a href="/">Crear cuenta emprendedor</a>
          <a href="/">Crear cuenta </a>


        </div>
        <div>
          <h2>Productos</h2>
          <a href="/">Tendencia</a>
          <a href="/">Ofertas</a>
          <a href="/">Servicios</a>  {/*Ofrecer servicios*/}
   
        </div>
        <div>
          <h2>Atención al cliente</h2>
          <a href="/">Tu cuenta</a>
          <a href="/">Tus pedidos</a>
          <a href="/">Devoluciones y reemplazos</a>
          <a href="/">Ayuda</a>
        </div>
        <div>
          <h2>REGÍSTRATE</h2>
          <form>
            <input type="email" placeholder="Ingresa tu correo" required />
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
      <div className="derechos">
        <p>Copyright &copy; 2024 ComerciaPe. Todos los derechos reservados.</p>
        <p>Política de privacidad | Términos y condiciones</p>
      </div>
    </footer>
  );
};

export default Footer;
