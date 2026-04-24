'use strict';

(async () => {
  const apiUrl = "https://pokeapi.co/api/v2"
  let pokemons = []
  const container = document.getElementById("pokemon_container")
  const serachInput = document.getElementById("searchbar")

  serachInput.addEventListener("input", (e) => {
    const search = e.target.value.toLowerCase()
    const res = pokemons.filter((pokemon) => {
      return pokemon.nombre.toLowerCase().includes(search);
    })
    mountOnDom(res);
  })

  async function fetchPokemons() {
    try {
      const res = await fetch(`${apiUrl}/pokemon?limit=100`)
      const data = await res.json()

      return data.results.map((pokemon) => {
        const id = pokemon.url.split("/")[6]
        return {
          nombre: pokemon.name,
          imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`,
        };
      });
    } catch (error) {
      console.log(error)
    }
  }

  function mountOnDom(pokemons) {
    container.innerHTML = ""
    if (pokemons.length < 1) {
      const mensajeError = document.createElement("h2")
      mensajeError.textContent = "No hay plata"
      mensajeError.style.color = "#f00"
      container.appendChild(mensajeError)
      container.classList.add("pokemon_container--flex")
    }

    pokemons.forEach((pokemon) => {
      const template = document.getElementById("card_template")

      const card = template.cloneNode(true)
      card.id = pokemon.id + pokemon.nombre;
      card.style.display = "block";
      const img = card.querySelector("img")
      img.src = pokemon.imagen;
      img.alt = `pokemon ${pokemon.nombre}`;
      const name = card.querySelector("h3")
      name.textContent = pokemon.nombre;

      container.appendChild(card);
    });
    container.classList.remove("pokemon_container--flex")
  };


  async function init() {
    pokemons = await fetchPokemons();
    mountOnDom(pokemons);
  }

  document.addEventListener("DOMContentLoaded", init)
})()
