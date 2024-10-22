import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Formulario.css';
import Swal from 'sweetalert2';

const Formulario = () => {
  const navigate = useNavigate();
  const pressClickReg = () => {
      navigate('/Registro'); 
  };

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuarioNombre, setUsuarioNombre] = useState(null);
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar usuarios
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Recuperar el nombre del usuario del localStorage al cargar el componente
  useEffect(() => {
    const nombreGuardado = localStorage.getItem('usuarioNombre');
    if (nombreGuardado) {
      setUsuarioNombre(nombreGuardado);
    }
    
    // Cargar usuarios desde usuarios.json
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('/usuarios.json');
        if (!response.ok) {
          throw new Error('Error al cargar usuarios');
        }
        const data = await response.json();
        setUsuarios(data); // Almacena los usuarios en el estado
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: '¡Error!',
          text: 'No se pudieron cargar los usuarios.',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      }
    };

    fetchUsuarios();
  }, []);

  const toggleRegisterForm = () => {
    setMostrarFormulario(prevState => !prevState);
  };

  const validateForm = (e) => {
    e.preventDefault();
    let valid = true;

    // Validar correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('El correo electrónico debe contener un nombre de usuario seguido de un símbolo @, seguido de un dominio que incluye al menos un punto (.) y una extensión. No debe haber espacios ni caracteres especiales prohibidos antes o después del @ y el punto.');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validar contraseña
    if (!password) {
      setPasswordError('Ingrese la contraseña correcta. Verifique que ingresó los datos correctos.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      // Verificar las credenciales en usuarios
      const usuarioEncontrado = usuarios.find(usuario => usuario.email === email && usuario.password === password);

      if (usuarioEncontrado) {
        setUsuarioNombre(usuarioEncontrado.firstName);
        localStorage.setItem('usuarioNombre', usuarioEncontrado.firstName);
        localStorage.setItem('tipoUsuario', usuarioEncontrado.userType);

        Swal.fire({
          title: '¡Felicidades!',
          text: 'Has iniciado sesión con éxito.',
          icon: 'success',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#4CAF50',
          iconColor: '#4CAF50',
          customClass: {
              popup: 'animated bounce'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/';
          }
        });
      } else {
        Swal.fire({
          title: '¡Error!',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Cerrar',
          background: '#fff',
          color: '#333',
          confirmButtonColor: '#ff4d4f',
          iconColor: '#ff4d4f',
          customClass: {
              popup: 'animated bounce'
          }
        });
      }
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setUsuarioNombre(null);
        localStorage.removeItem('usuarioNombre');
        window.location.href = '/';
      }
    });
  };

  return (
    <div className="cuenta-container">
      <div className="cuenta-icon" onClick={toggleRegisterForm}>
        <i className="fas fa-user" />
      </div>
      <div className='user-sesion'>
        <span onClick={toggleRegisterForm}>
          {usuarioNombre ? 'Hola, ' + usuarioNombre : 'Iniciar Sesión'}
        </span>
        {usuarioNombre && (
          <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
        )}
      </div>
      {mostrarFormulario &&
        <div className="overlay" onClick={toggleRegisterForm}>
          <div
            id="registro"
            className="registro-form"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="form-container">
              <p className="title">Iniciar Sesión</p>
              <form className="form" onSubmit={validateForm}>
                <div className="input-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingrese su correo"
                  />
                  {emailError && <p className="error">{emailError}</p>}
                </div>
                <div className="input-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese su contraseña"
                  />
                  {passwordError && <p className="error">{passwordError}</p>}
                </div>
                <button className="IniciarSesion" type="submit">Iniciar sesión</button>
              </form>
              <div className="social-message">
                <div className="line" />
                <p className="message">Continuar con </p>
                <div className="line" />
              </div>
              <div className="social-iconos">
                {/* Botones de redes sociales (opcional) */}
              </div>
              <p className="signup">
                No tienes una cuenta?
                {' '}
                <button 
                  rel="noopener noreferrer"
                  onClick={() => {
                    pressClickReg();
                    toggleRegisterForm();
                  }}
                >
                  Crear Cuenta
                </button>
              </p>
            </div>
          </div>
        </div>}
    </div>
  );
};

export default Formulario;