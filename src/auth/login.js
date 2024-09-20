window.onload = (event) => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    //const registerForm = document.getElementById('resgisterForm');
    //const registerMessage = document.getElementById('registerMessage');
    console.log("onload");


    loginForm.addEventListener('submit', async function(event){
        console.log("Entre al submit");

        event.preventDefault(); // Prevenir que se envie el formulario de manera tradicional.

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password}),
            });

            const data = await response.json(); //Me trae el token
            console.log(data);
            const encodeData = btoa(JSON.stringify(data));
            localStorage.setItem("token",data.accessToken); 

            /*if (response.ok) {
                loginMessage.textContent = 'Login Exitoso';
                loginMessage.style.color = 'green'
                window.location.href = `./formPlants2.html#${encodeData}`;
            } else {
                loginMessage.textContent = data.message || 'Error en el Login';
                loginMessage.style.color = 'red'
            }*/
                if (response.ok) {
                    loginMessage.textContent = 'Login exitoso. Redirigiendo...';
                    loginMessage.style.color = '#4d6656'; // Verde sutil
                    //loginMessage.style.backgroundColor = '#e5f5e0'; // Verde claro
                    loginMessage.style.padding = '10px';
                    loginMessage.style.borderRadius = '0px';
                    loginMessage.style.marginTop = '20px';
                    loginMessage.style.fontSize = '0.9rem';
                    loginMessage.style.textAlign = 'center';
                
                    // Redirigir a Formulario plantas después de mostrar el mensaje
                    setTimeout(() => {
                       // window.location.href = `./formPlants2.html#${encodeData}`;
                        window.location.href = `./dashboard.html`;

                    }, 500); // 0.5 segundo de retraso antes de la redirección
                } else {
                    loginMessage.textContent = 'Usuario o contraseña incorrectos. Verifica e intenta de nuevo.';
                    loginMessage.style.color = '#6b7b6e'; // Gris-verdoso
                    loginMessage.style.backgroundColor = '#f9f9f9'; // Blanco suave
                    loginMessage.style.border = '1px solid #cccccc';
                    loginMessage.style.padding = '10px';
                    loginMessage.style.borderRadius = '5px';
                    loginMessage.style.marginTop = '20px'; 
                    loginMessage.style.fontSize = '0.9rem';
                    loginMessage.style.textAlign = 'center';
                }
                
                
                
        } catch (error) {
            console.log (error)
            loginMessage.textContent = 'Hubo un Error en el Login';
            loginMessage.style.color = 'red'
        }

    });
};
/*
    registerForm.addEventListener('submit', async function(event){

        event.preventDefault(); // Prevenir que se envie el formulario de manera tradicional.

        const newUserName = document.getElementById('new_username').value;
        const newPassword = document.getElementById('new_password').value;
        const newEmail = document.getElementById('email').value;

        try {
            const response = await fetch('http://localhost:3000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userName: newUserName, password: newPassword, email: newEmail}),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                registerMessage.textContent = 'Registro Exitoso';
                registerMessage.style.color = 'green'
            } else {
                registerMessage.textContent = data.message || 'Error en el Registro';
                registerMessage.style.color = 'red'
            }
        } catch (error) {
            console.log (error)
            registerMessage.textContent = 'Hubo un Error en el Registro';
            registerMessage.style.color = 'red'
        }

    });
};

*/