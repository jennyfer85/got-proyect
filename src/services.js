//CRUD (Create, Read, Update, Delete)
const URL_API = "http://localhost:8000/character";

// Editar un personaje. Cargar los datos en el formulario para editarlos
// READ METHOD : (GET)
async function getAllCharacters() {
    const response = await fetch(URL_API, {
        method: "GET", // Método HTTP GET para obtener datos
        headers: {
            "Content-Type": "application/json", // Indica que estamos trabajando con JSON
        },
    });
    const characters = await response.json();// convierto la respuesta a json. Pasar datos a formato json
    return characters;
}

//PINTAr los datos en la pantalla 
const characterList = document.getElementById('charactersList');

async function printCharacters() {
    const characters = await getAllCharacters(); // llamo a la funcion getAllCharacter
    characterList.innerHTML = ''; //*

    characters.map((character) => {

        characterList.innerHTML += `
            <li class="p-4 bg-gray-100 rounded-lg shadow-md">
            <div class="mb-4">
                <p class="text-lg font-semibold">${character.name}</p>
                <p class="text-sm text-gray-600">${character.house}</p>
                <p class="text-sm text-gray-600">${character.age}</p>
            </div>   
            <div class="flex justify-start space-x-2"> 
                <button onclick ="deleteCharacter('${character.id}')" class="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">delete</button>
                <button onclick ="editCharacter('${character.id}')" class="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600">Edit</button>
            </div>
            </li>`;

    });
}
printCharacters();


//DELETE METHOD : (DELETE) `${URL_API}/${id}`,
async function deleteCharacter(id) {
    const response = await fetch(`${URL_API}/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    });

    const deletedCharacter = await response.json()
    if (response.ok) {
        printCharacters();
    }
    return deletedCharacter
}

//CREATE METHOD : (POST)
//const newCharacter = data();
async function createCharacter() {

    const form = document.getElementById('addCharacter'); // Obtiene el formulario del DOM
    //const houseData = document.getElementById('house').value; //
    const newCharacter = { //Recoge los valores del formulario para crear un nuevo personaje
        name: form.name.value,
        house: form.house.value,
        age: form.age.value
    };

    //Validadción para asegurararnos que todos los campos están llenos
    if (!form.name.value || !form.house.value || !form.age.value) {
        return alert("Todos los campos son obligatorios")
    }


    const response = await fetch(URL_API, {
        method: "POST", // especifica metodo que se usará

        headers: { // Coloca la información en formato JSON
            "Content-Type": "application/json",
        },
        body:
            JSON.stringify(newCharacter),

    });

    if (response.ok) {
        form.reset(); //Limpia el formulario después de agregar el personaje
        printCharacters();  // Actualiza la lista
    }
    

}


async function editCharacter(id) {
    try {
        const response = await fetch(`${URL_API}/${id}`, { // Realiza una solicitud GET para obtener los datos del personaje
            method: "GET",
            headers: {
                "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
            throw new Error("No se pudo obtener los datos del personaje");
        }

        const character = await response.json(); // Convierte la respuesta a JSON y obtiene los datos del personaje

        const form = document.getElementById('addCharacter'); // Obtiene el formulario del DOM
        form.name.value = character.name; // Carga el nombre del personaje en el campo correspondiente
        form.house.value = character.house; // Carga la casa del personaje en el campo correspondiente
        form.age.value = character.age; // Carga la edad del personaje en el campo correspondiente
		
		

        const submitButton = document.getElementById('submitButton'); // Obtiene el botón de envío del formulario
        submitButton.innerText = 'Actualizar'; // Cambia el texto del botón a "Actualizar"
        submitButton.onclick = function () { // Asocia el botón a la función de actualización
            updateCharacter(id);
        };
    } catch (error) {
        console.error(error);
    }
}



//UPDATE METHOD : (PUT)
async function updateCharacter(id) {
    const form = document.getElementById('addCharacter');
    const updatedCharacter = {  //recoge los valores actualizados del formulario
        name: form.name.value,
        house: form.house.value,
        age: form.age.value
    };

    //Validación para asegurarnos que todos los esten llenos
    if (!updatedCharacter.name.value || !updatedCharacter.house.value || !updatedCharacter.age.value) {
        //return alert("Todos los campos son obligatorios")
    }

    //Hacemos la solicitud actualizar a la API PARA actualizar el personaje existente
    const response = await fetch(`${URL_API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "applicatio/json",
        },
        body:
            JSON.stringify(updatedCharacter),
    });
    if (response.ok) {
        form.reset();  //Limpia el formulario
        console.log("personaje actualizado")
        document.getElementById('submitButton').innerText = 'Añadir';  //Cambia el texto del botón 
        document.getElementById('submitButton').onclick = createCharacter; 
        printCharacters();

    }

}

