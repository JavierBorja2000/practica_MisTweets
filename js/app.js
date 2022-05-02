//variables
const $formulario = document.querySelector("#formulario")
const $listaTweets = document.querySelector("#lista-tweets")

let tweets = []

//eventListeners
function eventListeners(){
    //cuando el usuario agrega un tweet
    $formulario.addEventListener("submit", agregarTweet )

    //Cuando se cargue el documento 
    document.addEventListener("DOMContentLoaded", (e) => {
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];
        crearHTML()
    })
}

eventListeners()

//funciones

function agregarTweet(e){
    e.preventDefault()

    //textArea donde el usuario escribira
    const $tweet = $formulario.querySelector("#tweet").value

    if($tweet === ''){
        mostrarError("El tweet no puede ir vacio")
    }else{
        tweets.push($tweet)
        tweets = Array.from(new Set(tweets)) //si existiera un tweet repetido lo elimina

        //Una vez Agregado
        crearHTML()
        
        $formulario.reset() //reiniciar el formulario
    }
}

//mostrar mensaje de error
function mostrarError(mensaje){
    const mensajeError = document.createElement("p")
    mensajeError.textContent = mensaje
    mensajeError.classList.add("error")

    //insertarlo en el contenido
    const $contenido = document.querySelector("#contenido")
    $contenido.appendChild(mensajeError)

    setTimeout(()=>{
        $contenido.removeChild(mensajeError)
    }, 3000)
} 

//muestra un listado de los tweets
function crearHTML(){
    limpiarHTML()

    if(tweets.length > 0){
        tweets.forEach( tweet => {
            const btnEliminar = document.createElement("a")
            btnEliminar.classList.add("borrar-tweet")
            btnEliminar.textContent = 'X'
            
            //añadir la funcion de eliminar
            btnEliminar.onclick = (e) => {
                borrarTweet(e)
            }

            const itemList = document.createElement("p")
            itemList.classList.add("itemList")
            itemList.textContent = tweet

            //asignar el boton
            itemList.appendChild(btnEliminar)

            //agregarlo al HTML
            $listaTweets.appendChild(itemList)
        })
    }

    localStorage.setItem("tweets", JSON.stringify(tweets))
}

//limpiar el HTML
function limpiarHTML(){
    while($listaTweets.firstChild){
        $listaTweets.removeChild($listaTweets.firstChild)
    }
}

//eliminar tweet
function borrarTweet(e){
    //del elemeto que origino el evento(el boton X) busco a su padre itemList( p ) y extraigo su contenido
    let elementoEliminar = e.target.closest(".itemList").textContent
    elementoEliminar = elementoEliminar.substring(0, elementoEliminar.length-1)
    
    tweets = tweets.filter(tweet => tweet !== elementoEliminar)
    crearHTML()
}