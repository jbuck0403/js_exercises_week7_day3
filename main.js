class ExtendedString {
  title = (name) => {
    return name
      .split(" ")
      .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
      .join(" ");
  };
}

const extendedString = new ExtendedString();
const title = extendedString.title;

const pokemonData = async (name) => {
  url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  response = await fetch(url);
  data = await response.json();

  return await data;
};

const returnPokemonName = (data) => {
  const name = title(data["name"]);

  return name;
};

const returnPokemonSpriteURL = (data) => {
  sprite = data["sprites"]["front_default"];

  return sprite;
};

const returnPokemonAbilities = (data) => {
  abilities = data["abilities"];
  abilitiesDict = {};
  for (let idx in abilities) {
    const name = title(abilities[idx]["ability"]["name"]);
    const hidden = abilities[idx]["is_hidden"];

    abilitiesDict[name] = hidden;
  }
  console.log(abilitiesDict);
  return abilitiesDict;
};

const formatPokemonAbilities = (abilities, abilityClass = "ability") => {
  let abilitiesHTML = `<ul>`;
  let increment = 1;
  for (let key in abilities) {
    console.log(key, abilities[key]);
    hidden = abilities[key];
    abilitiesHTML += `<li class="${abilityClass}">${
      hidden ? "Hidden " : ""
    }Ability${hidden ? "" : ` ${increment}`}: ${key}</li>`;
    increment++;
  }
  abilitiesHTML += "</ul>";

  return abilitiesHTML;
};

const formatPokemonSprite = (url, spriteClass = "sprite") => {
  spriteHTML = `<img src="${url}" class="${spriteClass}" />`;

  return spriteHTML;
};

const appendPokemonDataHTML = (data) => {
  const nameDiv = document.querySelector(".name");
  const spriteDiv = document.querySelector(".sprite-wrapper");
  const abilitiesDiv = document.querySelector(".abilities");

  const name = returnPokemonName(data);
  const sprite = returnPokemonSpriteURL(data);
  const abilities = returnPokemonAbilities(data);

  const spriteHTML = formatPokemonSprite(sprite);
  const abilitiesHTML = formatPokemonAbilities(abilities);

  nameDiv.textContent = name;
  spriteDiv.innerHTML = spriteHTML;
  abilitiesDiv.innerHTML = abilitiesHTML;
};

const form = document.querySelector(".pokedex-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = form.querySelector(".pokedex-input");
  const btn = form.querySelector(".pokedex-btn");

  const inputValue = input.value;
  input.value = "";
  data = await pokemonData(inputValue);

  appendPokemonDataHTML(data);
});
