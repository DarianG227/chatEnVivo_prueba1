const mensajeEnviado = document.getElementById('mensajeEnviado');
const zonaBotonEInput = document.getElementById('campo-Escribir-Enviar');
const zonaNombreApellido = document.getElementById('nombreApellidoUsuario');
const zonaHeader = document.getElementById('contenedorDelNav');
const zonaEnviar = document.getElementById('botonEnviarAbajo');

//Obtener el parámetro "dni" de la URL
const urlParams = new URLSearchParams(window.location.search);
const dniUsu = urlParams.get('dni');

// Crear el botón y agregarlo al DOM
const botonEnviar = document.createElement('button');
botonEnviar.textContent = 'Enviar'; // Añadir texto al botón
botonEnviar.classList.add('botonEnviar');

fetch('https://basechatvivo-default-rtdb.firebaseio.com/registrados.json')
.then(response => response.json())
.then(data => {

    let nAUsuario = document.createElement('h2');
    nAUsuario.classList.add('nombreApeUsuario');
    for(let key in data){
        const objeto = data[key];

        if(objeto.dniUsuario === dniUsu){
            nAUsuario.textContent = 'Bienvenido, ' + objeto.nombreUsuario + ".";
            zonaNombreApellido.appendChild(nAUsuario);
        }
    }
})


//sVERSIÓN DEFINITIVA
//GUARDAR MENSAJES DONDE CORRESPONDE
document.addEventListener('DOMContentLoaded', function () {
botonEnviar.addEventListener('click', function(){
    const mensaje = mensajeEnviado.value.trim();

    if(mensaje){
        fetch('https://basechatvivo-default-rtdb.firebaseio.com/registrados.json')
        .then(response => response.json())
        .then(data => {

            //GUARDAR EL MENSAJE EN "PERFIL" DEL USUARIO
            for(let key in data){
                const objeto = data[key];

                //Corroboro que es el usuario que envió los mensajes
                if(objeto.dniUsuario === dniUsu){

                    //FUNCIONA
                    //console.log('https://basechatvivo-default-rtdb.firebaseio.com/registrados/' +  key + '/mensajesEnviados.json');

                    fetch('https://basechatvivo-default-rtdb.firebaseio.com/registrados/' + key + '/mensajesEnviados.json', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', //Asegurar que el servidor entienda JSON
                        },
                        body: JSON.stringify({
                            contenido: mensaje
                        }),
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al enviar el mensaje');
                        }
                        return response.json();  
                     })
                    .then(data => {
                        mensajeEnviado.value = ""; //Limpiar el input después de enviar
                    })
                    .catch(error => {
                        console.error('Hubo un problema con el envío:', error);
                    });
                }
            }
        })

        // GUARDAR EN UNA LISTA CON TODOS LOS MENSAJES
        fetch('https://basechatvivo-default-rtdb.firebaseio.com/mensajesEnviados.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', //Asegurar que el servidor entienda JSON
            },
            body: JSON.stringify({
                mensaje: mensaje,
                dniUsuarioEnviado: dniUsu
            }),
        })
    }
    else{
            alert('Por favor, escribe un mensaje antes de enviarlo.');
    }
})
});


// Detectar cuando se presiona Enter en el input
mensajeEnviado.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita el comportamiento por defecto (enviar formulario, si aplica)
        botonEnviar.click(); // Simula un clic en el botón
        
    }
});

// MOSTRAR MENSAJES
async function obtenerMensajesRecibidos() {
    //Obtener mensajes
    const mensajesResponse = await fetch('https://basechatvivo-default-rtdb.firebaseio.com/mensajesEnviados.json');
    const mensajesData = await mensajesResponse.json();

    //Obtener usuarios
    const usuariosResponse = await fetch('https://basechatvivo-default-rtdb.firebaseio.com/registrados.json');
    const usuariosData = await usuariosResponse.json();

    const zonaMensajesRecibidos = document.getElementById('zona-mensajes-recibidos');
    zonaMensajesRecibidos.innerHTML = ''; //Limpiar mensajes anteriores

    //Recorrer mensajes
    for (let key in mensajesData) {
        const objeto = mensajesData[key];
        const mensajesExternos = document.createElement('p');
        mensajesExternos.classList.add('mensajesRecibidos');
        mensajesExternos.textContent = objeto.mensaje;

        if (objeto.dniUsuarioEnviado === dniUsu) {
            //Mensajes propios
            const divPropio = document.createElement('div');
            mensajesExternos.classList.add('misMensajes');
            divPropio.classList.add('propiaZonaMen');

            divPropio.appendChild(mensajesExternos);
            zonaMensajesRecibidos.appendChild(divPropio);
        } else {
            //Mensajes recibidos
            const divRecibidos = document.createElement('div');
            divRecibidos.classList.add('zonaRecibidos');

            //Buscar el nombre del usuario
            let nombreUsuario = '';
            for (let llave in usuariosData) {
                const obj = usuariosData[llave];
                if (objeto.dniUsuarioEnviado === obj.dniUsuario) {
                    nombreUsuario = obj.nombreUsuario;
                    break;
                }
            }

            //Crear el elemento para el nombre
            if (nombreUsuario) {
                const nombreUsuarioElemento = document.createElement('p');
                nombreUsuarioElemento.classList.add('nombreApeUsuario');
                nombreUsuarioElemento.textContent = nombreUsuario;
                divRecibidos.appendChild(nombreUsuarioElemento);
            }

            //Agregar mensaje
            divRecibidos.appendChild(mensajesExternos);
            zonaMensajesRecibidos.appendChild(divRecibidos);
        }
    }
}

obtenerMensajesRecibidos();
setInterval(obtenerMensajesRecibidos, 2000);

document.addEventListener('DOMContentLoaded', function () {
    const botonCerrar = document.createElement('button');
    botonCerrar.classList.add('btn', 'btn-outline-success');
    botonCerrar.textContent = 'CERRAR SESIÓN';

    botonCerrar.addEventListener('click', function () {
        window.location.href = 'login.html';
    });

    const zonaBotonCerrar = document.getElementById('botonFinal');
    zonaBotonCerrar.appendChild(botonCerrar);
});


//Añadir el botón al contenedor
zonaEnviar.appendChild(botonEnviar);

zonaHeader.appendChild(zonaNombreApellido);
zonaHeader.appendChild(zonaBotonCerrar);

