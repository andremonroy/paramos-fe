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
            console.log(encodeData);

            if (response.ok) {
                loginMessage.textContent = 'Login Exitoso';
                loginMessage.style.color = 'green'
                window.location.href = `./formPlants.html#${encodeData}`;
            } else {
                loginMessage.textContent = data.message || 'Error en el Login';
                loginMessage.style.color = 'red'
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