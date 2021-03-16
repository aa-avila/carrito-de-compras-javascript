/* Productos */
var productos = [
  {
    nombre: "Harina",
    precio: 35,
    imagen: "harina.jpg",
  },
  {
    nombre: "Pan",
    precio: 25,
    imagen: "pan.jpg",
  },
  {
    nombre: "Papa",
    precio: 52,
    imagen: "papa.jpg",
  },
  {
    nombre: "Palta",
    precio: 55,
    imagen: "palta.jpg",
  },
  {
    nombre: "Fideos",
    precio: 85,
    imagen: "fideos.jpg",
  },
  {
    nombre: "Aceite",
    precio: 350,
    imagen: "aceite.jpg",
  },
  {
    nombre: "Sopa",
    precio: 86,
    imagen: "sopa.jpg",
  },
  {
    nombre: "Mermelada",
    precio: 108,
    imagen: "mermelada.jpg",
  },
  {
    nombre: "Porotos",
    precio: 69,
    imagen: "porotos.jpg",
  },
  {
    nombre: "Lentejas",
    precio: 85,
    imagen: "lentejas.jpg",
  },
  {
    nombre: "Mandarina",
    precio: 79,
    imagen: "mandarina.jpg",
  },
  {
    nombre: "Banana",
    precio: 79,
    imagen: "banana.jpg",
  },
  {
    nombre: "Leche de almendras",
    precio: 145,
    imagen: "leche-almendras.jpg",
  },
  {
    nombre: "Papel higiénico",
    precio: 147,
    imagen: "papel-higienico.jpg",
  },
  {
    nombre: "Lavandina",
    precio: 55,
    imagen: "lavandina.jpg",
  },
  {
    nombre: "Alcohol en gel",
    precio: 123,
    imagen: "alcohol-en-gel.jpg",
  },
  {
    nombre: "Shampoo",
    precio: 400,
    imagen: "shampoo.jpg",
  },
  {
    nombre: "Arroz",
    precio: 66,
    imagen: "arroz.jpg",
  },
  {
    nombre: "Harina de mandioca",
    precio: 320,
    imagen: "harina-mandioca.jpg",
  },
  {
    nombre: "Salsa de tomate",
    precio: 35,
    imagen: "salsa-tomate.jpg",
  },
];

/* Items Seleccionados */
var itemsSelec = [];
for (let i = 0; i < productos.length; i++) {
  itemsSelec[i] = false;
}

/* Carrito */
var carrito = [];

/* Precio Total */
var precioTotal = 0;

/* Agregar item al carrito*/
/* (en realidad se define TRUE en items seleccionados) */
function addToCart(prod) {
  itemsSelec[prod] = true;
}

/* Quitar item del carrito*/
/* (se define FALSE en items seleccionados) */
function removeFromCart(prod) {
  itemsSelec[prod] = false;
}

/* Actualizar carrito */
function updateCarrito() {
  carrito.splice(0, carrito.length); //Vaciar carrito
  //Recorre itemsSelec
  itemsSelec.forEach((element, index) => {
    if (element == true) {
      //si es TRUE -> agrega producto al carrito propiamentedicho
      carrito.push(productos[index]);
    }
  });
}

/* Maneja la accion de Agregar o Quitar producto */
function handleBtnProd(prodID, btnState) {
  let btnID = "btn" + prodID;
  let boton = document.getElementById(btnID);
  if (btnState == "disp") {
    addToCart(prodID);
    boton.classList.replace("disp", "noDisp");
    boton.innerHTML = "Quitar del carrito";
  } else {
    removeFromCart(prodID);
    boton.classList.replace("noDisp", "disp");
    boton.innerHTML = "Añadir al carrito";
  }
  updateCarrito();
}

/* Funcion Comprar */
var funcComprar = () => {
  let listaCompra = () => {
    let lista = document.getElementById("lista-compra"); //Agarramos la lista
    lista.innerHTML = ""; //La vaciamos "sobreescribiendo nada"

    carrito.forEach((element) => {
      //Para cada elemento del carrito creamos un nodo "li" con nombre y precio
      let item = document.createElement("li");
      item.innerHTML = element.nombre + ": $" + element.precio;
      lista.appendChild(item); //Se agrega cada nuevo item a la lista
    });
  };

  let calcTotal = () => {
    precioTotal = 0; //Borrar precioTotal
    carrito.forEach((element) => {
      precioTotal += element.precio; //añadir cada valor guardado en el carrito
    });
  };

  let dibujarTotal = () => {
    let pTotal = document.getElementById("precio-total"); //Tomamos el elemento "precio-total"
    pTotal.innerHTML = ""; //Borramos el precio html existente
    pTotal.innerHTML = "Total a pagar: $" + precioTotal; //Escribimos nuevo precio
  };

  listaCompra();
  calcTotal();
  dibujarTotal();
};

///////////////////////////////////////////////////
/****** Crea elementos DOM al cargar pagina ******/
window.onload = () => {
  let contenedorProductos = document.getElementById("contenedor-productos"); //Selecciona contenedor de productos

  /*Iteración foreach para crear nodos correspondientes a los productos*/
  productos.forEach((element, index) => {
    let articuloDiv = document.createElement("div"); //Contenedor de cada articulo
    articuloDiv.className = "articulo";

    let nombreArticulo = document.createElement("h3"); //Nombre articulo
    nombreArticulo.className = "nombre-articulo";
    nombreArticulo.textContent = element.nombre;

    let imgArticulo = document.createElement("img"); //Imagen del producto
    imgArticulo.src = "../img/" + element.imagen;
    imgArticulo.className = "img-articulo";

    let precioArticulo = document.createElement("p"); //Precio del articulo
    precioArticulo.className = "precio";
    precioArticulo.textContent = "Precio: $" + element.precio;

    let boton = document.createElement("button"); //Botón agregar/quitar
    boton.innerHTML = "Añadir al carrito";
    boton.className = "btn-añadir";
    boton.classList.add("disp");
    boton.id = "btn" + index;
    boton.addEventListener("click", () => {
      handleBtnProd(index, boton.classList.item(1));
    });

    //Agrega elementos al contenedor de articulo
    articuloDiv.appendChild(nombreArticulo);
    articuloDiv.appendChild(imgArticulo);
    articuloDiv.appendChild(precioArticulo);
    articuloDiv.appendChild(boton);

    //Finalmente agrega el articulo al contenedor general de productos
    contenedorProductos.appendChild(articuloDiv);
  });
};
//////////////////////////////////////////////////
