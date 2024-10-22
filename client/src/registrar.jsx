import React, { useState } from 'react';
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';

const Registro = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        companyName: '',
        firstName: '',
        lastName: '',
        phone: '',
        userType: '' // Nuevo campo para tipo de usuario
    });

    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: '',
        companyNameError: '',
        firstNameError: '',
        lastNameError: '',
        phoneError: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        // Validar correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.emailError = 'El correo electrónico es inválido.';
            valid = false;
        } else {
            newErrors.emailError = '';
        }

        // Validar contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.passwordError = 'La contraseña debe tener al menos 8 caracteres e incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.';
            valid = false;
        } else {
            newErrors.passwordError = '';
        }

        // Validar nombre de la empresa
        const companyNameRegex = /^[a-zA-Z0-9\s]{3,50}$/; // Alfanumérico, 3 a 50 caracteres
        if (!companyNameRegex.test(formData.companyName)) {
            newErrors.companyNameError = 'El nombre de la empresa debe tener entre 3 y 50 caracteres y solo puede incluir letras, números y espacios.';
            valid = false;
        } else {
            newErrors.companyNameError = '';
        }

        // Validar nombre completo
        const firstNameRegex = /^[a-zA-Z\s]{3,50}$/; // Solo letras y espacios, 3 a 50 caracteres
        if (!firstNameRegex.test(formData.firstName)) {
            newErrors.firstNameError = 'El nombre debe tener entre 3 y 50 caracteres y solo puede incluir letras y espacios.';
            valid = false;
        } else {
            newErrors.firstNameError = '';
        }

                // Validar apellido
        const lastNameRegex = /^[a-zA-Z\s]{3,50}$/; // Solo letras y espacios, 3 a 50 caracteres
        if (!lastNameRegex.test(formData.lastName)) {
            newErrors.lastNameError = 'El apellido debe tener entre 3 y 50 caracteres y solo puede incluir letras y espacios.';
            valid = false;
        } else {
            newErrors.lastNameError = '';
        }

        // Validar teléfono
        const phoneRegex = /^\d{9}$/; // Solo 9 dígitos
        if (!phoneRegex.test(formData.phone)) {
            newErrors.phoneError = 'El teléfono debe ser un número de 9 dígitos.';
            valid = false;
        } else {
            newErrors.phoneError = '';
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const usuarioData = {
                id: Date.now(), // ID único basado en la fecha y hora actual
                ...formData,
            };

            // Guardar datos en el archivo usuarios.json
            await fetch('http://localhost:5000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioData),
            });
            setFormData({
                email: '',
                password: '',
                companyName: '',
                firstName: '',
                lastName: '',
                phone: '',
                userType: '' // Reiniciar el tipo de usuario
            });
            Swal.fire({
                title: 'Registro exitoso',
                text: 'Bienvenido/a ' + formData.firstName + ', ya puedes iniciar sesión',
                icon: 'success',
                confirmButtonText: 'Cerrar',
                background: '#fff',
                color: '#333',
                confirmButtonColor: '#4CAF50',
                iconColor: '#4CAF50',
                customClass: {
                    popup: 'animated bounce'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirigir a la página de inicio después de que se cierre el alert
                    window.location.href = '/';
                }
            });
        } else {
            Swal.fire({
                title: '¡Error!',
                text: 'Por favor, corrige los errores en el formulario.',
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
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
                <h2 className="mb-4">Registro</h2>
                <div className="mb-3">
                    <label className="form-label">País/región:</label>
                    <select className="form-select" name="country" value="Perú" disabled>
                        <option value="Perú">Perú</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Rol comercial:</label>
                    <br/>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="comprador"
                            name="userType"
                            value="Comprador"
                            checked={formData.userType === 'Comprador'}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="comprador">Comprador</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="vendedor"
                            name="userType"
                            value="Vendedor"
                            checked={formData.userType === 'Vendedor'}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="vendedor">Vendedor</label>
                    </div>
                    
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo electrónico:</label>
                    <input
                        type="email"
                        className={`form-control ${errors.emailError ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.emailError && <div className="invalid-feedback">{errors.emailError}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña:</label>
                    <input
                        type="password"
                        className={`form-control ${errors.passwordError ? 'is-invalid' : ''}`}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.passwordError && <div className="invalid-feedback">{errors.passwordError}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre de empresa:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.companyNameError ? 'is-invalid' : ''}`}
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                    />
                    {errors.companyNameError && <div className="invalid-feedback">{errors.companyNameError}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.firstNameError ? 'is-invalid' : ''}`}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    {errors.firstNameError && <div className="invalid-feedback">{errors.firstNameError}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellido:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.lastNameError ? 'is-invalid' : ''}`}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    {errors.lastNameError && <div className="invalid-feedback">{errors.lastNameError}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.phoneError ? 'is-invalid' : ''}`}
                        name="phone"
                        pattern="\d{9}"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        maxLength="9"
                        placeholder="Número de 9 dígitos"
                    />
                    {errors.phoneError && <div className="invalid-feedback">{errors.phoneError}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Aceptación y registro</button>
            </form>
        </div>
    );
};

export default Registro;
