const pokemon_name = document.querySelector(".pokemon_name");
const pokemon_number = document.querySelector(".pokemon_number");
const pokemon_image = document.querySelector(".pokemon_image");
const form = document.querySelector(".form");
const input_search = document.querySelector(".input_search");
const btn_prev = document.querySelector(".btn_prev");
const btn_next = document.querySelector(".btn_next");
let numerobusca = 1;

const buscarPokemon = async (pokemon) => {
  const apiResposta = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (apiResposta.status === 200) {
    const dados = await apiResposta.json();
    return dados;
  }
};

const renderizarPokemon = async (pokemon) => {
  pokemon_name.innerHTML = "Pesquisando...";
  pokemon_number.innerHTML = "";

  const dados = await buscarPokemon(pokemon);

  if (dados) {
    pokemon_name.innerHTML = dados.name;
    pokemon_number.innerHTML = dados.id;
    pokemon_image.src =
      dados["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input_search.value = "";
    numerobusca = dados.id;
  } else {
    pokemon_name.innerHTML = "MissingNo.";
    pokemon_number.innerHTML = "##";
    pokemon_image.src = "./images/missigno.gif";
    input_search.value = "";
  }
};

function localizarPokemon(event) {
  event.preventDefault();
  renderizarPokemon(input_search.value.toLowerCase());
}

form.addEventListener("submit", localizarPokemon);

function adicionarUm() {
  numerobusca += 1;
  renderizarPokemon(numerobusca);
}
btn_next.addEventListener("click", adicionarUm);

function removerUm() {
  if (numerobusca > 1) {
    numerobusca -= 1;
    renderizarPokemon(numerobusca);
  }
}
btn_prev.addEventListener("click", removerUm);

renderizarPokemon(numerobusca);
