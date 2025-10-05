import { useMemo } from "react"
import productosData from "../../../backend/productos-data"

export function RelatedProducts(productoActual){


    const relacionados = useMemo(()=>{
        return productosData.filter((p) => p.id !== productoActual.id).sort(() => Math.random() - 0.5).slice(0,3);
    },[productoActual])

    
    return(
        <section className="relacionados">
            <h2>Productos relacionados</h2>
            <div className="relacionados-grid"></div>
        </section>
    )
}