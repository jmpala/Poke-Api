let todosLosPokemones = []
const fetchPokemones= async()=>{
    try{
        const response = await fetch ("https://pokeapi.co/api/v2/pokemon?limit=100")
        const data = await response.json();

       todosLosPokemones = data.results.map((pokemon)=>{
            //Se divide la cadena cada vez que encuentra un "/" y solo tomo la parte 6 (es un slicing)
            const id = pokemon.url.split("/")[6];
           //y aca uso el link donde van las imagenes y solo remplazo el id
            const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;

            
           //los asigno a variavles llamadas nombre e imagen
            return{
            nombre:pokemon.name,
            imagen:url,
           };
           
        });
        mostrarPokemones(todosLosPokemones); 
    }
    
    catch(error){
        console.log(error);
    }
}

const contenedorPokemones = document.getElementById("contenedor_pokemones")
// se pone "pokemones =[] " para que abajo cuando llame a pokemones me sugiera los metoodos de un array
const mostrarPokemones = (pokemones = []) =>{
    //se vacia el HTML para que cada vez que se busque aparezcan solo los elementos que coincidan con el resultado y no los cargados previamente. Si cargue todos los pookemones y depues busco me va a agregar abajo las coincidencias de busqueda yo necesito que borre lo cargado previamente y solo me muestre las coincidencias
    contenedorPokemones.innerHTML=""
    //Por cada elemento que encuentre crea un article con la clase "tarjeta"
    if(pokemones.length>0){
        pokemones.forEach((pokemon)=>{        
        const tarjeta = document.createElement("article")
        tarjeta.classList.add("tarjeta")
        tarjeta.innerHTML = `
            <img src="${pokemon.imagen}" alt="pokemon ${pokemon.nombre}"/>
            <h3>${pokemon.nombre}</h3>
        `;
        //agrego al contenedor cada tarjeta
        contenedorPokemones.appendChild(tarjeta);
    });
    contenedorPokemones.classList.remove("contenedor_pokemones--flex")
    }
    else{
        const mensajeError=document.createElement("h2")
        mensajeError.textContent="No hay plata"
        mensajeError.style.color="#f00"
        contenedorPokemones.appendChild(mensajeError);
        contenedorPokemones.classList.add("contenedor_pokemones--flex")
    }
};

const inputBuscar = document.getElementById("buscador")
inputBuscar.addEventListener("input",(e)=>{
    //console.log(e.target.value);
    const busqueda = e.target.value.toLowerCase()
    //(pokemon) => { ... }
//Es una arrow function. Por cada elemento del arreglo, JavaScript "toma" ese objeto y lo nombra temporalmente pokemon para poder trabajar con sus propiedades.
    const resultado = todosLosPokemones.filter((pokemon)=>{        
        return pokemon.nombre.toLowerCase().includes(busqueda);
        
    })
    //se va a llamar la funcion mostrarPokemones por cada letra que escribas
    mostrarPokemones(resultado);
})


fetchPokemones();
