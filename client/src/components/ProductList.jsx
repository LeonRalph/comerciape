import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ProductList = ({ usuarioNombre, allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Cargar los productos desde data.json
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/productos'); // Asegúrate de que la ruta sea correcta
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        };

        fetchData();
    }, []);

    const onAddProduct = product => {
        // Verificar si el usuario ha iniciado sesión
        if (!usuarioNombre || usuarioNombre === 'Iniciar Sesión') {
            Swal.fire({
                title: '¡Atención!',
                text: 'Por favor, inicie sesión para poder realizar compras.',
                icon: 'warning',
                confirmButtonText: 'Cerrar',
                background: '#fff',
                color: '#333',
                confirmButtonColor: '#ff4d4f',
                iconColor: '#ff4d4f',
                customClass: {
                    popup: 'animated bounce'
                }
            });
            return; // Salir de la función sin hacer nada más
        } else {
            // Verificar si el producto ya está en el carrito
            const existingProduct = allProducts.find(item => item.id === product.id);
            if (existingProduct) {
                const updatedProducts = allProducts.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                setTotal(total + product.price);
                setCountProducts(countProducts + 1);
                setAllProducts(updatedProducts);
            } else {
                // Si es un producto nuevo, añadirlo con cantidad 1
                setTotal(total + product.price);
                setCountProducts(countProducts + 1);
                setAllProducts([...allProducts, { ...product, quantity: 1 }]);
            }
        }
    };

    return (
        <div className='container-items'>
            {products.map(product => (
                <div className='item' key={product.id}>
                    <figure>
                        <img src={product.img} alt={product.nameProduct} />
                    </figure>
                    <div className='info-product'>
                        <h2>{product.nameProduct}</h2>
                        <p className='price'>${product.price}</p>
                        <button onClick={() => onAddProduct(product)}>
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;