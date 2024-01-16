// Verifica si el carrito está vacío al cargar la página y lo inicializa si es necesario
import { productosDisponibles } from "./inicio.js"

JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]))

// Evento que se dispara cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    dibujarCarrito()
})

// Inicialización de variables y obtención de elementos del DOM
let carrito = JSON.parse(sessionStorage.getItem("carrito"))
const listaCarrito = document.getElementById("items")
const footCarrito = document.getElementById("totales")
const btnCarrito = document.getElementById("btnCarrito")

const carritoTable = document.getElementById("carrito")

// Evento para mostrar/ocultar el carrito al hacer clic en el botón correspondiente
btnCarrito.addEventListener("click", () => {
    if (carritoTable.style.display === "block") {
        carritoTable.style.display = "none"
    } else {
        carritoTable.style.display = "block"
        dibujarCarrito()
    }

})

// Función para agregar un producto al carrito
export const comprarProducto = (idProducto) => {

    // Busca el producto seleccionado en la lista de productos disponibles
    const producto = productosDisponibles.find((producto) => producto.id === idProducto)

    // Obtiene los detalles del producto
    const { nombre, precio, imagen, id } = producto

    // Busca el producto en el carrito actual
    const productoCarrito = carrito.find((producto) => producto.id === idProducto)

    // Verifica si el producto ya está en el carrito
    if (productoCarrito === undefined) {

        // Si no está en el carrito, crea un nuevo objeto para el producto
        const nuevoProductoCarrito = {
            id: id,
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        }

        // Agrega el nuevo producto al carrito y actualiza el almacenamiento de sesión
        carrito.push(nuevoProductoCarrito)
        sessionStorage.setItem("carrito", JSON.stringify(carrito))
    } else {
        
        // Si el producto ya está en el carrito, actualiza la cantidad y el precio
        const indexProductoCarrito = carrito.findIndex((producto) => producto.id === idProducto)

        carrito[indexProductoCarrito].cantidad++
        carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad

        // Actualiza el almacenamiento de sesión con el carrito actualizado
        sessionStorage.setItem("carrito", JSON.stringify(carrito))
    }

    // Actualiza la variable local 'carrito' con el contenido actualizado del almacenamiento de sesión
    carrito = JSON.parse(sessionStorage.getItem("carrito"))
    
    // Muestra una notificación de éxito al agregar un producto al carrito
    Swal.fire({
        title: "Felicidades!",
        text: `Haz añadido el producto ${nombre} a tu carrito`,
        icon: "success"
    });

}

// Función para dibujar los productos en el carrito
const dibujarCarrito = () => {

    // Limpia la lista de productos en el carrito antes de volver a dibujar
    listaCarrito.innerHTML = ''
    
    // Itera sobre cada producto en el carrito y crea las filas correspondientes en la tabla del carrito
    carrito.forEach(producto => {
        const { imagen, nombre, cantidad, precio, id } = producto
        let body = document.createElement("tr")
        
        // Establece la clase de la fila para darle estilo
        body.className = "producto__carrito"
        
        // Inserta el contenido HTML de la fila con los detalles del producto
        body.innerHTML = `
        <th><img id="fotoProductoCarrito" src="${imagen}" class="card-img-top" style="width:30%; height: 30%"</th>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio / cantidad}</td>
        <td>${precio}</td>
        <td>
        <button id="+${id}" class="btn btn-success">+</button>
        <button id="-${id}" class="btn btn-danger">-</button>
        </td>
        `
        
        // Agrega la fila a la lista de productos en el carrito
        listaCarrito.append(body)
        
        // Obtiene los botones de aumentar y disminuir cantidad y agrega eventos a ellos
        const btnAgregar = document.getElementById(`+${id}`)
        const btnRestar = document.getElementById(`-${id}`)

        btnAgregar.addEventListener("click", () => aumentarCantidad(id))
        btnRestar.addEventListener("click", () => restarCantidad(id))

    });
    
    // Llama a la función para dibujar el footer del carrito
    dibujarFooter()
}

// Función para dibujar el footer del carrito con los totales
const dibujarFooter = () => {
    // Verifica si hay productos en el carrito
    if (carrito.length > 0) {
        footCarrito.innerHTML = ""
        
        // Crea una fila en el footer con los totales de cantidad y costo
        let footer = document.createElement("tr")
        
        // Agrega el footer a la tabla del carrito
        footer.innerHTML = `
        <th><b>Totales:</b></th>
        <td></td>
        <td>${generarTotales().cantidadTotal}</td>
        <td></td>
        <td>${generarTotales().costoTotal}</td>
        `
        // Agrega el footer a la tabla del carrito
        footCarrito.append(footer)
    } else {
        
        // Si no hay productos en el carrito, muestra un mensaje indicando que está vacío
        footCarrito.innerHTML = "<h3>No hay producto en carrito</h3>"
    }

}

// Función para generar los totales de cantidad y costo en el carrito
const generarTotales = () => {
    
    // Calcula el costo total sumando los precios de todos los productos en el carrito
    const costoTotal = carrito.reduce((total, { precio }) => total + precio, 0)
    
    // Calcula la cantidad total sumando las cantidades de todos los productos en el carrito    
    const cantidadTotal = carrito.reduce((total, { cantidad }) => total + cantidad, 0)

    // Devuelve un objeto con los totales calculados
    return {
        costoTotal: costoTotal,
        cantidadTotal: cantidadTotal
    }
}

// Función para aumentar la cantidad de un producto en el carrito
const aumentarCantidad = (id) => {

    // Encuentra el índice del producto en el carrito
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    
    // Calcula el precio unitario del producto
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

    // Incrementa la cantidad y actualiza el precio total del producto
    carrito[indexProductoCarrito].cantidad++
    carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad

    // Actualiza el almacenamiento de sesión con el carrito actualizado
    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    
    // Vuelve a dibujar el carrito con la cantidad actualizada
    dibujarCarrito()

}

// Función para disminuir la cantidad de un producto en el carrito
const restarCantidad = (id) => {
    
    // Encuentra el índice del producto en el carrito    
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    // Calcula el precio unitario del producto    
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

    // Decrementa la cantidad y actualiza el precio total del producto
    carrito[indexProductoCarrito].cantidad--
    carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad

    // Elimina el producto del carrito si la cantidad llega a cero    
    if (carrito[indexProductoCarrito].cantidad === 0) {
        carrito.splice(indexProductoCarrito, 1)
    }
    
    // Actualiza el almacenamiento de sesión con el carrito actualizado
    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    
    // Vuelve a dibujar el carrito con la cantidad actualizada
    dibujarCarrito()

}