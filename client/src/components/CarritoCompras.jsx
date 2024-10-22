import { useState } from 'react'; 
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

export const CarritoCompras = ({
	allProducts,
	setAllProducts,
	total,
	countProducts,
	setCountProducts,
	setTotal,
}) => {
	const [active, setActive] = useState(false);
	const [ventas, setVentas] = useState([]); // Para almacenar las ventas

	const onDeleteProduct = product => {
		const results = allProducts.filter(
			item => item.id !== product.id
		);

		setTotal(total - product.price * product.quantity);
		setCountProducts(countProducts - product.quantity);
		setAllProducts(results);
	};

	const onCleanCart = () => {
		setAllProducts([]);
		setTotal(0);
		setCountProducts(0);
	};

	// Función para "comprar", almacenar la venta y crear PDF
	const onComprar = () => {
		const venta = {
		  fecha: new Date().toLocaleString(),
		  productos: allProducts,
		  total: total,
		};
	  
		// Simular almacenamiento de la venta (agregar al estado)
		setVentas([...ventas, venta]);
	  
		// Mostrar confirmación con Swal antes de generar el PDF
		Swal.fire({
		  title: '¿Estás seguro?',
		  text: "Confirma para generar y guardar la boleta.",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Sí, generar Boleta',
		  cancelButtonText: 'Cancelar',
		}).then((result) => {
		  if (result.isConfirmed) {
			try {
			  // Crear PDF
			  const doc = new jsPDF();
			  doc.setFontSize(12);
			  doc.text('Detalles de Compra', 14, 20);
			  doc.text(`Fecha: ${venta.fecha}`, 14, 30);
			  doc.text('Productos:', 14, 40);
	  
			  let yPosition = 50;
			  allProducts.forEach(product => {
				doc.text(`${product.nameProduct} - Cantidad: ${product.quantity} - Precio: $${product.price}`, 14, yPosition);
				yPosition += 10;
			  });
	  
			  doc.text(`Total: $${total}`, 14, yPosition);
	  
			  // Mostrar mensaje de éxito después de guardar el PDF
			  Swal.fire("Compra realizada con éxito").then(() => {
				doc.save('Boleta.pdf');
				onCleanCart(); // Limpiar el carrito después de cerrar el mensaje de éxito
			  });
	  
			} catch (error) {
			  // Si ocurre algún error, mostrar un mensaje de error
			  Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Hubo un problema al generar la boleta. Inténtalo de nuevo.',
			  });
			}
		  } else {
			// Si el usuario cancela, mostrar un mensaje de cancelación opcional
			Swal.fire("La compra fue cancelada.");
		  }
		});
	  };
	return (
		<div className='tienda'>
			<h1>Tienda</h1>

			<div className='container-icon'>
				<div
					className='container-cart-icon'
					onMouseOver={() => setActive(true)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='icon-cart'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
						/>
					</svg>
					<div className='count-products'>
						<span id='contador-productos'>{countProducts}</span>
					</div>
				</div>

				<div
					className={`container-cart-products ${active ? '' : 'hidden-cart'}`}
					onMouseLeave={() => setActive(false)}
				>
					{allProducts.length ? (
						<>
							<div className='row-product'>
								{allProducts.map(product => (
									<div className='cart-product' key={product.id}>
										<div className='info-cart-product'>
											<span className='cantidad-producto-carrito'>
												{product.quantity}
											</span>
											<p className='titulo-producto-carrito'>
												{product.nameProduct}
											</p>
											<span className='precio-producto-carrito'>
												${product.price}
											</span>
										</div>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='icon-close'
											onClick={() => onDeleteProduct(product)}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</div>
								))}
							</div>

							<div className='cart-total'>
								<h3>Total:</h3>
								<span className='total-pagar'>${total}</span>
							</div>

							<button className='btn-clear-all' onClick={() => { onCleanCart(); setActive(false); }}>
								Vaciar Carrito
							</button>

							{/* Botón para comprar */}
							<button className='btn-buy' onClick={() => { onComprar(); setActive(false); }}>
								Comprar y Descargar Boleta
							</button>
						</>
					) : (
						<p className='cart-empty'>El carrito está vacío</p>
					)}
				</div>
			</div>
		</div>
	);
};
