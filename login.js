const formuLogin = document.getElementById('registroForm');

function corroborarDatos(){
    // Agregar un evento al formulario para enviar los datos a la API
    formuLogin.addEventListener('submit', (event) => {
        event.preventDefault();// Evita que la página se recargue al enviar el formulario
        // Validar los campos

        const dniId = document.getElementById('DNIUs').value;
        const contraId = document.getElementById('contraUs').value;

        fetch('https://basechatvivo-default-rtdb.firebaseio.com/registrados.json')
        
        .then(response => response.json())
        .then(data => {

            let coincidioCom = false;
            let coincidioUno = false;
            const url = new URL('https://dariang227.github.io/chatEnVivo_prueba1/chat.html');

            for(let key in data){
                const objeto = data[key];

                const dniCom = document.createElement('p');
                const contraseñaComp = document.createElement('p');

                dniCom.textContent = objeto.dniUsuario;
                contraseñaComp.textContent = objeto.contraseñaUsuario;

                if(objeto.dniUsuario === dniId){      
                    coincidioUno = true;
                    if(objeto.contraseñaUsuario === contraId){
                        alert('Ingreso con éxito.');
                        coincidioCom = true;
                        url.searchParams.append('dni', objeto.dniUsuario);
                        //console.log(url.toString());
                        window.location.href = url.toString();
                    }
                }
            }

            
            if(!coincidioUno){
                alert ('El DNI no se encuentra registrado en ninguna cuenta.');
            }
            else if(!coincidioCom){
                alert ('La contraseña no coincide con la cuenta del DNI ingresado. Intente nuevamente.');
            }
        })

    })

}

corroborarDatos();