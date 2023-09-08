const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("carrito")
const modalContainer = document.getElementById("modalContainer")
const cantidadCarrito = document.getElementById("cantidadCarrito")

const productos = [
    {
        id: 1,
        name: "Tabú",
        precio: 5000,
        img: "https://img.freepik.com/fotos-premium/fondo-pintura-abstracta-obras-arte-creativas-tono-azul_463999-3530.jpg?w=2000"
        ,
        cantidad: 1,
    },
    {
        id: 2,
        name: "Engaña",
        precio: 5000,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7vMKU3Hmjyf7YnOuQ0oY07xcmh8eNXwfRH932AO5LKi6VgeZ-ttqM13PKaStEM8KjDIY&usqp=CAU"
        ,
        cantidad: 1,
    },
    {
        id: 3,
        name: "Bocanada",
        precio: 5000,
        img: "https://media.revistaad.es/photos/60c22da019c8e1b95e8d555b/16:9/w_1280,c_limit/202522.jpg"
        ,
        cantidad: 1,
    },
    {
        id: 4,
        name: "Puente",
        precio: 5000,
        img: "https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2022/09/obra-arte-generada-inteligencia-artificial-2811995.jpg?tf=3840x"
        ,
        cantidad: 1,
    },
    {
        id: 5,
        name: "Perdonar es divino",
        precio: 5000,
        img: "https://i.ytimg.com/vi/xVh32UckNrg/maxresdefault.jpg"
        ,
        cantidad: 1,
    },
    {
        id: 6,
        name: "Raíz",
        precio: 5000,
        img: "https://www.ellitoral.com/images/2023/08/31/6Aaa4DH_C_1300x655__1.jpg"
        ,
        cantidad: 1,
    }
]

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


productos.forEach((product) => {
    let content = document.createElement("div");
    content.innerHTML = `
    <img src="${product.img}">
    <h2>${product.name}</h2>
    <p>$ ${product.precio}</p>
    `;
    
    shopContent.append(content)
    
    let comprar = document.createElement("button")
    comprar.innerText = "comprar"
    
    content.append(comprar)
    
    comprar.addEventListener("click", () => {
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)
        if (repeat) {
            carrito.map((prod) => {
                if (prod.id === product.id) {
                    prod.cantidad++
                }
            })
        }
        else {
            carrito.push({
                id: product.id,
                name: product.name,
                img: product.img,
                precio: product.precio,
                cantidad: product.cantidad,
            })
            carritoCounter()
            saveLocal()
        }
    })
});
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const pintarCarrito = () => {
    
    
    /* Limpiar el carro antes de arrancar */
    modalContainer.innerHTML = ""
    modalContainer.style.padding = "10px"
    modalContainer.style.border = "1px solid"
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class="titulo">Carrito</h1>
    `;
    modalContainer.append(modalHeader);
    
    const modalButton = document.createElement("h1");
    modalButton.innerText = "X";
    modalButton.className = "modal-button";
    
    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });
    
    modalHeader.append(modalButton);
    
    carrito.forEach((product) => {
        const carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.name}</h3>
        <p>$ ${product.precio}</p>
        <span class="restar">-</span>
        <p>Cantidad: ${product.cantidad}</p>
        <span class="sumar">+</span>
        <p>Total: ${product.cantidad * product.precio}</p>
        <span class="delete-product"> X </span>
        `;
        
        modalContainer.append(carritoContent);
        
        let restar = carritoContent.querySelector(".restar")
        
        restar.addEventListener("click", () => {
            if(product.cantidad !== 1){
                product.cantidad--;
            }
            saveLocal()
            pintarCarrito()
        });
        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", () => {
            product.cantidad ++
            saveLocal()
            pintarCarrito()
        });
        
        let eliminar = carritoContent.querySelector(".delete-product");

        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        })
    });
    
    const total = carrito.reduce((acc, el) => acc + el.precio *el.cantidad, 0)
    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `
    Total a pagar: $ ${total}
    `;
    modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id );
    
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    })
    
    carritoCounter();
    saveLocal();
    pintarCarrito();

};

const carritoCounter = ()=>{
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText= JSON.parse(localStorage.getItem("carritoLength"));
    cantidadCarrito.style.fontSize= "medium"
    cantidadCarrito.style.padding= "3px"
}

carritoCounter();
