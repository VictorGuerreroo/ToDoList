// Variables
const icono = document.querySelector('#formulario');
const listaTareas = document.querySelector('#lista-tareas');
const tareasPendientes = document.querySelector('.tareasPendientes');
const tareasRealizadas = document.querySelector('.tareasRealizadas');


let tareas = [];

// Event Listeners
eventListeners();

function eventListeners() {
    icono.addEventListener('submit', agregarTarea);

    document.addEventListener('DOMContentLoaded', () => {
        tareas = JSON.parse(localStorage.getItem('tareas')) || [];

        console.log(tareas);
        crearHTML();
    });
}


// Funciones
function agregarTarea(e) {
    e.preventDefault();
    
    // Input donde escribir
    const tarea = document.querySelector('#input').value;

    // Validación
    if( tarea === '') {
        mostrarError('Una tarea no puede estar vacia');
        return;
    }

    const tareaObj =  {
        id: Date.now(),
        tarea
    }

    // Añadir las tareas
    tareas = [...tareas, tareaObj];

    // Creando el HTML
    crearHTML();

    // Reinicar el formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {   
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenedor');
    contenido.appendChild(mensajeError);

    // Elimina la alerta
    setTimeout(() => {
        mensajeError.remove();
    }, 2500);

}

// Muestra un listado de las tareas
function crearHTML() {

    limpiarHTML();

    if(tareas.length > 0) {
        tareas.forEach( tarea => {
            const btnEliminar = document.createElement('i');
            btnEliminar.classList = 'fas fa-trash mx-5';

            const li = document.createElement('li');
            const linea = document.createElement('hr')

            li.classList= "d-flex justify-content-between";

            // Funcion eliminar
                btnEliminar.onclick = () => {
                    borrarTarea(tarea.id);
                }

            //li.innerText = tarea.tarea;

            li.innerHTML = `<div class="mx-2"><input type="checkbox" id="check1"><label for="check1">&nbsp;&nbsp;${ tarea.tarea}</label></div>`
            
            
            li.appendChild(btnEliminar);

            listaTareas.appendChild(li);
            listaTareas.appendChild(linea);

            tareasPendientes.textContent = tareas.length;
            
        });
    }

    sincronizarStorage();
}

// Almacenar las tareas en LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Elimina una tarea
function borrarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);

    
    tareasRealizadas.textContent = tareas.length;

    crearHTML();
}

// Limpiar el HTML
function limpiarHTML() {
    while( listaTareas.firstChild) {
        listaTareas.removeChild(listaTareas.firstChild);
    }
}
