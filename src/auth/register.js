window.onload = (event) => {
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');
    console.log("Registro cargado");
    //Cambios por vercel
    const apiUrl = 'https://paramos-backend.vercel.app';


    registerForm.addEventListener('submit', async function(event){
        event.preventDefault(); // Prevenir que se envie el formulario de manera tradicional.

        const newUserName = document.getElementById('new_username').value;
        const newPassword = document.getElementById('new_password').value;
        const email = document.getElementById('email').value;

        try {
            const response = await fetch(`${apiUrl}/user/register`, {
            //const response = await fetch('http://localhost:3000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: newUserName, password: newPassword, email }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                registerMessage.textContent = 'Registro exitoso. Redirigiendo...';
                registerMessage.style.color = '#4d6656';
                setTimeout(() => {
                    window.location.href = './login.html';
                }, 500);
            } else {
                registerMessage.textContent = data.message || 'Error en el registro';
                registerMessage.style.color = '#6b7b6e';
            }
        } catch (error) {
            console.log(error);
            registerMessage.textContent = 'Hubo un error en el registro';
            registerMessage.style.color = 'red';
        }
    });
};
