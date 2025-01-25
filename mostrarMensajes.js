//Obtener el parámetro "dni" de la URL
const urlParams = new URLSearchParams(window.location.search);
const dniUsu = urlParams.get('dni');

function obtenerMensajesRecibidos (){
    fetch('https://basechatvivo-default-rtdb.firebaseio.com/mensajesEnviados.json')
     .then(response => response.json())
     .then(data => {

        const zonaMensajesRecibidos = document.getElementById('zona-mensajes-recibidos');
        const zonaMensajesEnviados = document.getElementById('zona-mensajes-enviados');

        zonaMensajesEnviados.innerHTML = '';
        zonaMensajesRecibidos.innerHTML = '';

        for(let key in data){
            const objeto = data[key];
            const mensajesExternos = document.createElement('p');
            const nombreUsuario = document.createElement('p');

            mensajesExternos.classList.add('mensajesRecibidos');

            // console.log(objeto);

            mensajesExternos.textContent = objeto.mensaje;

            zonaMensajesEnviados.appendChild(mensajesExternos);
        }
    
    
    })

}

obtenerMensajesRecibidos();

setInterval(obtenerMensajesRecibidos, 2000);
