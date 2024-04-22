function agregarTarjeta() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('hidden'); // mostrar el modal al apretar "Add new card"

    const saveButton = document.getElementById('saveCard'); // obtener el boton "Guardar" del modal
    
    const saveHandler = async () => {
        const cardNameInput = document.getElementById('cardName');
        const descriptionInput = document.getElementById('descripcion');
        const assignedToInput = document.getElementById('assignedTo');
        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');
        const statusInput = document.getElementById('status');
        const priorityInput = document.getElementById('priority');
        const commentsInput = document.getElementById('comments');

        const cardData = {
            title: cardNameInput.value,
            description: descriptionInput.value,
            assignedTo: assignedToInput.value,
            startDate: startDateInput.value,
            endDate: endDateInput.value,
            status: statusInput.value,
            priority: priorityInput.value,
            comments: commentsInput.value.split(',').map(comment => comment.trim())
        };

        try {
            const response = await fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cardData)
            });

            if (!response.ok) {
                throw new Error('Error al enviar la tarjeta.');
            }

            overlay.classList.add('hidden'); // ocultar el modal despues de guardar la tarjeta
            cardNameInput.value = ''; // limpiar los campos del modal
            descriptionInput.value = '';
            assignedToInput.value = '';
            startDateInput.value = '';
            endDateInput.value = '';
            statusInput.value = '';
            priorityInput.value = '';
            commentsInput.value = '';
            
            const task = await response.json();
            console.log(task);
            cleanColumns();
            await ejemploNode(); // actualizar las tarjetas en la pagina
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar la tarjeta. Por favor, inténtalo de nuevo.');
        }
    };

    saveButton.addEventListener('click', saveHandler);

    const cancelButton = document.querySelector('.overlay button');
    cancelButton.addEventListener('click', () => {
        overlay.classList.add('hidden'); // ocultar el modal al presionar "Cancelar"
        const cardInputs = document.querySelectorAll('.overlay input');
        cardInputs.forEach(input => input.value = ''); 
    });
}


function agregarBloque(nombreBloque) {
    const ul = document.querySelector('ul'); 
    
    const nuevoBloque = document.createElement('li'); 
    nuevoBloque.classList.add('bloque'); // agrega la clase bloque al nuevo bloque
    
    const h3 = document.createElement('h3');
    h3.textContent = nombreBloque; 
    
    const tarjetasDiv = document.createElement('div'); // crea un div para contener las tarjetas
    tarjetasDiv.classList.add('tarjetas'); 
    
    const addButton = document.createElement('button'); // crea un boton para agregar tarjeta
    addButton.textContent = '+ Add new card';
    addButton.classList.add('card-button');
    addButton.addEventListener('click', () => agregarTarjeta(addButton)); 
    
    nuevoBloque.appendChild(addButton); 
    
    nuevoBloque.appendChild(h3); 
    nuevoBloque.appendChild(tarjetasDiv); 
    
    ul.insertBefore(nuevoBloque, ul.lastElementChild); // inserta el nuevo bloque antes del ultimo elemento de la lista ul

    nuevoBloque.appendChild(addButton);
}

const botonAddList = document.getElementById('addList');
botonAddList.addEventListener('click', () => {
    const nombreBloque = prompt("Ingrese el nombre del nuevo bloque:");
    if (nombreBloque) {
        agregarBloque(nombreBloque);
    }
});

const boton1 = document.getElementById('addCard1');
boton1.addEventListener('click', () => agregarTarjeta());

const boton2 = document.getElementById('addCard2');
boton2.addEventListener('click', () => agregarTarjeta());

const boton3 = document.getElementById('addCard3');
boton3.addEventListener('click', () => agregarTarjeta());


async function ejemploNode() {  // función asincronica
    try {
        const response = await fetch("http://localhost:3000/api/tasks"); // solicitud a la API, con el await se espera a que la solicitud se complete
        if (!response.ok) {
            throw new Error('Error al cargar las tareas'); // si la respuesta no es exitosa, se lanza un error
        }
        const tasks = await response.json(); // se obtiene el contenido de la respuesta en formato JSON
        console.log(tasks); // se imprime en consola el contenido de las tareas
        
        tasks.forEach(task => { // se recorre el arreglo de tareas
            let bloque; // variable para guardar el bloque donde se agregará la tarjeta
            switch (task.status) {
                case 'To Do':
                    bloque = document.querySelector('.bloque:nth-of-type(1) .tarjetas'); 
                    break;
                case 'In Progress':
                    bloque = document.querySelector('.bloque:nth-of-type(2) .tarjetas'); 
                    break;
                case 'Done':
                    bloque = document.querySelector('.bloque:nth-of-type(3) .tarjetas'); 
                    break;
                default:
                    console.error(`Estado desconocido: ${task.status}`);
                    return;
            }
            
            if (bloque) { // si se encontro un bloque, se crea una tarjeta con el titulo de la tarea y se agrega al bloque
                const card = document.createElement('button');
                card.classList.add('tarjetas');
                card.textContent = task.title;
                bloque.appendChild(card);
            }
        });
    } catch (error) { // si ocurre un error en la solicitud o al procesar la respuesta se imprime error en la consola
        console.error('Error:', error);
    }
}

ejemploNode();

function cleanColumns() {
    const columns = document.querySelectorAll('.tarjetas');
    columns.forEach(column => {
        column.innerHTML = '';
    });
}