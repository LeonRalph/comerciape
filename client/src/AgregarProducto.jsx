import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const AgregarProducto = ({ setAllProducts }) => {
  const [nombreProducto, setNombreProducto] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [img, setImg] = useState('');
  const [nuevoId, setNuevoId] = useState(null);

  useEffect(() => {
    const fetchLastId = async () => {
      try {
        const response = await fetch('http://localhost:5000/productos');
        const data = await response.json();
        const lastProduct = data[data.length - 1];
        setNuevoId(lastProduct ? lastProduct.id + 1 : 1);
      } catch (error) {
        console.error('Error al cargar el último ID:', error);
      }
    };

    fetchLastId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProducto = {
      id: nuevoId,
      nameProduct: nombreProducto,
      price: parseFloat(precio),
      quantity: parseInt(cantidad),
      img: img,
    };

    const response = await fetch('http://localhost:5000/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoProducto),
    });

    if (response.ok) {
      const addedProduct = await response.json();
      setAllProducts((prevProducts) => [...prevProducts, addedProduct]);

      Swal.fire({
        title: '¡Producto Agregado!',
        text: 'El producto se ha agregado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Cerrar',
      }).then((result) => {
        if (result.isConfirmed) {
          setAllProducts(false); // Cierra el overlay después de agregar el producto
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo agregar el producto. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
  };

  // Función que cierra el overlay cuando se hace clic
  const cerrarOverlay = () => {
    console.log('Overlay clickeado, cerrando...');
    setAllProducts(false);
  };

  return (
    <div className="overlay" onClick={cerrarOverlay}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="title">Agregar Producto</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>ID del Producto:</label>
            <input
              type="number"
              value={nuevoId || ''}
              readOnly
            />
          </div>
          <div className="input-group">
            <label>Nombre del Producto:</label>
            <input
              type="text"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Precio:</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Cantidad:</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="input-group">
            <label>Imagen URL:</label>
            <input
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              required
            />
          </div>
          <button className="IniciarSesion" type="submit">Agregar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default AgregarProducto;