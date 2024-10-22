import React, { useState, useEffect } from 'react';
import { CarritoCompras } from './components/CarritoCompras';
import ProductList from './components/ProductList';
import AgregarProducto from './AgregarProducto';
import './Carrito.css';

function Carrito() {
    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [countProducts, setCountProducts] = useState(0);
    const [usuarioNombre, setUsuarioNombre] = useState(null);
    const [userType, setUserType] = useState(null);
    const [mostrarAgregarProducto, setMostrarAgregarProducto] = useState(false);

    useEffect(() => {
        const nombreGuardado = localStorage.getItem('usuarioNombre');
        const tipoUsuarioGuardado = localStorage.getItem('tipoUsuario');

        if (nombreGuardado) {
            setUsuarioNombre(nombreGuardado);
            setUserType(tipoUsuarioGuardado); // Establece el userType directamente
        }
    }, []);

    const toggleAgregarProductoForm = () => {
        setMostrarAgregarProducto(prev => !prev);
    };

    return (
        <>
            <CarritoCompras
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
            />
            <ProductList
                usuarioNombre={usuarioNombre}
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
            />

            {/* Botón para agregar productos solo si el usuario es vendedor */}
            {userType === 'Vendedor' && (
                <button onClick={toggleAgregarProductoForm}>
                    Agregar Producto
                </button>
            )}

            {/* Mostrar el formulario para agregar productos si es visible */}
            {mostrarAgregarProducto && (
                <AgregarProducto setAllProducts={setAllProducts} 
                setMostrarAgregarProducto={setMostrarAgregarProducto}/>
            )}
            <div><p>Hola tony cacherin</p></div>
        </>
    );
}

export default Carrito;
