const button__cadastrar = document.querySelector('.create');
const button__acessar = document.querySelector('.signIn');
const input__email = document.querySelector('.userEmail');
const input__passWord = document.querySelector('.userPassword');



export const signUp = () => {
    button__cadastrar.addEventListener("click", () => {
        window.location.replace('http://127.0.0.1:5500/src/pages/register.html')
    })
}





export const signIn = () => {

    button__acessar.addEventListener("click", async (event) => {
        event.preventDefault()
        if (email.value != "" && password.value != "") {

            try {
                const signIn = await fetch('http://localhost:3333/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "email": `${input__email.value}`,
                        "password": `${input__passWord.value}`
                    })
                })
                if (signIn.ok) {
                    const responseData = await signIn.json();
                    localStorage.setItem('token', JSON.stringify(responseData.token));

                    window.location.replace('http://127.0.0.1:5500/src/pages/dashboard.html')
                } else {
                    const userEmail = document.querySelector('.userEmail')
                    const userPassword = document.querySelector('.userPassword')
                    const divInputPassword = document.querySelector('.password')
                    
                    userEmail.classList.add('alert');
                    userPassword.classList.add('alert');

                    const errorMessage = document.createElement('span');
                    errorMessage.style.color = 'var(--alert100)';
                    errorMessage.style.fontSize = '14px';
                    errorMessage.style.fontWeight = '400';
                    errorMessage.textContent = 'A senha ou email está incorreto';

                    divInputPassword.appendChild(errorMessage);

                    setTimeout(() => {
                        userEmail.classList.remove('alert');
                        userPassword.classList.remove('alert');
                        errorMessage.remove();
                    }, 5000);
                }

            } catch (erro) {
                alert('Opss, algo deu errado.')
            }
        } else {
            alert('Preencha todos os campos')
        }
    });
};