const formuCurso = document.getElementById('registroForm');

// Agregar un evento al formulario para enviar los datos a la API
formuCurso.addEventListener('submit', (event) => {
    event.preventDefault();// Evita que la página se recargue al enviar el formulario
    // Validar los campos
    const nomId = document.getElementById('nombreCUs').value;
    const dniId = document.getElementById('DNIUs').value;
    const contraId = document.getElementById('contraUs').value;

    fetch('https://basechatvivo-default-rtdb.firebaseio.com/registrados.json') 
    .then(response => response.json())
    .then(data => {
        
        for(let key in data){
            const objeto = data[key];

            let pasoMedio = false;
            let pasoCompleto = false;

            if(dniId !== objeto.dniUsuario){
                pasoMedio = true;
                if(nomId !== objeto.nombreUsuario){
                    pasoCompleto = true;
                    fetch('https://basechatvivo-default-rtdb.firebaseio.com/registrados.json', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', // Asegurar que el servidor entienda JSON
                        },
                        body: JSON.stringify({
                            nombreUsuario: nomId,
                            dniUsuario: dniId,
                            contraseñaUsuario: contraId,
                        }),
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al registrar el usuario.');
                        }
                        alert('Ha sido registrado con éxito');
                
                        window.location.href = "login.html";
                
                    })
                    .catch(error => {
                        console.error('Error al enviar los datos: ', error);
                        alert('Hubo un problema al enviar los datos.');
                    });
                    formuCurso.reset();   
                }
                else{
                    alert('Este nombre de usuario ya está en uso.');
                formuCurso.reset();
                break;
                }
                 
            }
            else if(!pasoMedio){
                alert('Este DNI ya se encuentra registrado en el sistema.');
                formuCurso.reset();
                break;
            }
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos: ', error);
        alert('Hubo un problema al enviar los datos.');
    });


    
})