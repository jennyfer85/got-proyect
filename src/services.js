const URL_API = "http://localhost:8000/character"

//CREATE METHOD : (POST)
async function createCharacter() {
    const response = await fetch(URL_API, {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
    })

}
// READ METHOD : (GET)
async function getAllCharacter() {
    const response = await fetch(URL_API, {
        method: "GET", // Método HTTP GET para obtener datos
        headers: {
            "Content-Type": "application/json", // Indica que estamos trabajando con JSON
        },
    });
    const data = await response.json() // convierto la respuesta a json. Pasar datos a formato json
    return data
}

const listTag = document.getElementById('charactersList')

//PINTAr los datos de un get 
async function printCharacters() {
    const characters = await getAllCharacter() // llamo a la funcion getAllCharacter
    listTag.innerHTML = ''
        listTag.innerHTML += `<li>
            <p>${character.name}</p>
            <p>${character.house}</p>
            <p>${character.age}</p>
            <button onclick="deleteCharacter(${character.id})">delete</button>
            </li>`
    })
}
printCharacters()

//UPDATE METHOD : (PUT)
async function updateCharacter() {

}


//DELETE METHOD : (DELETE)
async function deleteCharacter(id) {
    const response = await fetch(URL_API + `/${id}`, { //añadir el id para 
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json", // Indica que estamos trabajando con JSON
        },
    })
    const deletedCharacter = await response.json()
    if (response.ok){
        printCharacters()
    }
    return deletedCharacter
}

