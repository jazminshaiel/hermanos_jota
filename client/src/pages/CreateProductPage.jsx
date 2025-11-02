import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/estilos-formularios.css";

// Aceptamos 'carritoItems' para pasarlo al Header
function CreateProductPage({ carritoItems }) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		nombre: "",
		descripcion: "",
		precio: 0,
		stock: 0,
		categoria: "general",
		imagenUrl: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Handler para actualizar el estado en cada cambio de input
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: name === "precio" || name === "stock" ? Number(value) : value,
		}));
	};

	// Handler para el envío del formulario
	const handleSubmit = async (e) => {
		e.preventDefault(); // Evitar recarga de página
		setLoading(true);
		setError(null);

		try {
			// Usamos el endpoint POST de la API
			const response = await fetch("/api/productos", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("Error al crear el producto. Revisa los datos.");
			}

			// Redirección al catálogo
			navigate("/catalogo");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Header carritoItems={carritoItems} />
			<main className="container">
				<div className="form-container">
					<h1>Crear Nuevo Producto</h1>
					<form onSubmit={handleSubmit} className="form-crear-producto">
						
						<div className="form-group">
							<label htmlFor="nombre">Nombre del Producto</label>
							<input
								type="text"
								id="nombre"
								name="nombre"
								value={formData.nombre}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="form-group">
							<label htmlFor="descripcion">Descripción</label>
							<textarea
								id="descripcion"
								name="descripcion"
								value={formData.descripcion}
								onChange={handleChange}
							/>
						</div>

						<div className="form-row">
							<div className="form-group">
								<label htmlFor="precio">Precio</label>
								<input
									type="number"
									id="precio"
									name="precio"
									value={formData.precio}
									onChange={handleChange}
									required
									min="0"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="stock">Stock</label>
								<input
									type="number"
									id="stock"
									name="stock"
									value={formData.stock}
									onChange={handleChange}
									min="0"
								/>
							</div>
						</div>

						<div className="form-row">
							<div className="form-group">
								<label htmlFor="categoria">Categoría</label>
								<input
									type="text"
									id="categoria"
									name="categoria"
									value={formData.categoria}
									onChange={handleChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="imagenUrl">URL de la Imagen</label>
								<input
									type="text"
									id="imagenUrl"
									name="imagenUrl"
									value={formData.imagenUrl}
									onChange={handleChange}
									placeholder="https://ejemplo.com/imagen.png"
								/>
							</div>
						</div>

						{error && <p className="error-message">{error}</p>}

						<button type="submit" className="form-submit-btn" disabled={loading}>
							{loading ? "Creando..." : "Crear Producto"}
						</button>

					</form>
				</div>
			</main>
			<Footer />
		</>
	);
}

export default CreateProductPage;