//<-- variables / o constantes 
const DB_URI = "http://localhost:3000/product/_id/"
const cards = document.getElementById("cards")
const items = document.getElementById("items")
const footer = document.getElementById("footer")
const templateCard = document.getElementById("template-card").content
const templateFooter = document.getElementById("template-footer").content
const templateOrders = document.getElementById("template-Orders").content
const fragment = document.createDocumentFragment()
let Orders = {}



//<--- Eventos 

document.addEventListener("DOMContentLoaded", () => {

    apiData()
//guardar los datos de pedidos en localstorage, al recargar la pagina no se borre los datos
    if(localStorage.getItem("Orders")) {
        Orders = JSON.parse(localStorage.getItem("Orders"))
        pintarOrders()
    }


})

//realiza la conexion con la base de datos -->

const apiData = async () => {
    try {
        const res = await fetch("http://localhost:3000/product/")
        const data = await res.json() // respuesta en formato .json

        //console.log(data)
        pintarCards(data)     

    } catch (error) {
        console.log(error)
    }
}

//mostrar los productos 
const pintarCards = data => {
    //console.log(data.products)
    data.products.forEach(element => {

         templateCard.querySelector("h7").textContent = element.name
         templateCard.querySelector("img").setAttribute("src", element.image)
         templateCard.querySelector("p").textContent = element.price
         templateCard.querySelector("p2").textContent = element.category
        templateCard.querySelector("button").dataset.id = element._id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    cards.appendChild(fragment)


}

//



// agrega los pedidos con los botones "agregar"
const addOrders = e => {
   // console.log(e.target)
  //  console.log(e.target.classList.contains("btn-dark"))
    if (e.target.classList.contains("btn-dark")) {

        //console.log(e.target.parentElement)
        setOrders(e.target.parentElement)
    }
    e.stopPropagation() //detener cualquier otro evento
}

const setOrders = objeto => {
    //console.log(objeto)

    const product = {
         id: objeto.querySelector("button").dataset.id,
         nombre: objeto.querySelector("h7").textContent,
         precio: objeto.querySelector("p").textContent,
         cantidad: 1
    }
    if (Orders.hasOwnProperty(product.id)) {
        product.cantidad = Orders[product.id]
    }

    Orders[product.id] = { ...product }
    pintarOrders()
    
   
    
}


//<<---muestra los productos agregados--->>

const pintarOrders = () => {
    //console.log(Orders)
    Object.values(Orders).forEach(product => {
        items.innerHTML= ""
        templateOrders.querySelector("th").textContent = product.id
         templateOrders.querySelectorAll("td")[0].textContent = product.nombre
         templateOrders.querySelectorAll("td")[1].textContent = product.cantidad
         templateOrders.querySelector(".btn-info").dataset.id = product.id
         templateOrders.querySelector(".btn-danger").dataset.id = product.id
         templateOrders.querySelector("span").textContent = product.cantidad * product.precio
        const clone = templateOrders.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    
    pintarFooter()

//guardar los datos de pedidos en localstorage, al recargar la pagina no se borre los datos
    
    localStorage.setItem("Orders", JSON.stringify(Orders))
}

//<<--- Mensaje Footer pedido---->>

const pintarFooter = () => {
    footer.innerHTML=""


     if(Object.keys(Orders).length === 0) {
        footer.innerHTML =   `<th scope="row" colspan="5">Pedido vacío - Realice Su Pedido <th/>`
   return
}
    
//<<--- Sumar la cantidad y los totales de los productos -->>   

const nCantidad = Object.values(Orders).reduce((acc, {cantidad}) => acc + cantidad, 0)
const nPrecio = Object.values(Orders).reduce((acc, {cantidad , precio}) => acc + cantidad * precio, 0)
//console.log(nPrecio)

templateFooter.querySelectorAll("td")[0].textContent = nCantidad
templateFooter.querySelector("span").textContent = nPrecio

const clone = templateFooter.cloneNode(true)
fragment.appendChild(clone)

footer.appendChild(fragment)


//<<--- Boton vaciar pedidos--->>
const btnEmpty = document.getElementById("empty-Orders")
btnEmpty.querySelector("empty-Orders")
btnEmpty.addEventListener("click", () => {
    
    Orders = {}
    pintarOrders()
    items.innerHTML= ""
  
      
} )
// <<---crud eliminar pedido--->> //  

const btnOrders = document.getElementById("place-Orders")
btnOrders.querySelector("place-Orders")
btnOrders.addEventListener("click", () => {
  
     
    
    const keys = Object.keys(Orders)

    

    keys.forEach(key =>{
        if(key !== "name", "cantidad", "precio"){
            Orders[key] = Orders[key]
        }
    })
    console.log(keys)


      fetch(`${DB_URI}${[keys]}`, {
               method: 'DELETE',
         })
       .then((respuesta) => console.log("success:",respuesta)) 
       .catch((error) => console.log('error:', error));
       
    

    setTimeout(() => {
    window.alert("Pedido Realizado")
    
    }, 3000);


     Orders = {}
    pintarOrders()
     items.innerHTML= ""

}) 


}



const btnAccion = e =>{
    //console.log(e.target)
//aumentar 
    if(e.target.classList.contains("btn-info")){
       // console.log(Orders[e.target.dataset.id])
        
        Orders[e.target.dataset.id]
     
        const producto = Orders[e.target.dataset.id]
        producto.cantidad = Orders[e.target.dataset.id].cantidad + 1
        Orders[e.target.dataset.id] = {...producto}
        
        pintarOrders()

    }

    if(e.target.classList.contains("btn-danger")){
            //console.log(Orders[e.target.dataset.id])
            
            Orders[e.target.dataset.id]
         
            const producto = Orders[e.target.dataset.id]
            producto.cantidad = Orders[e.target.dataset.id].cantidad -1
            Orders[e.target.dataset.id] = {...producto}
            pintarOrders()

        
    }
    if(e.target.classList.contains("btn-success")){
        console.log(Orders[e.target.dataset.id])
        
        Orders[e.target.dataset.id]
     
        const producto = Orders[e.target.dataset.id]
        producto.cantidad = Orders[e.target.dataset.id].cantidad + 1
        Orders[e.target.dataset.id] = {...producto}
        
        pintarOrders()

    }


            e.stopPropagation()
    
}





//<--- Evento--->



cards.addEventListener("click", e => {
    addOrders(e)
})

items.addEventListener("click", e =>{
btnAccion(e)


})
