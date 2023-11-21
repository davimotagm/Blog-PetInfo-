const user = document.querySelector('.userName');
const email = document.querySelector('.userEmail')
const photo = document.querySelector('.userPhoto')
const password = document.querySelector('.UserPassword')
const button__register = document.querySelector('.signUp')
const button__voltar = document.querySelector('.returnHome');
const toast = document.querySelector(".toast")

const createUser = () => {
    button__register.addEventListener("click", async (event) => {
        event.preventDefault();
        if (user.value != "" && email.value != "" && password.value != "") {

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                alert('informe um email válido')
                return;
            }

            try {
                const signUp = await fetch('http://localhost:3333/users/create', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "username": user.value,
                        "email": email.value,
                        "password": password.value,
                        "avatar": photo.value
                    })
                });

                if (signUp.ok) {
                    toast.classList.toggle('hidden')
                    setTimeout(() => { toast.classList.toggle('hidden') }, 5000);
                    user.value = "";
                    email.value = "";
                    password.value = "";
                    photo.value = "";
                } else {
                    const toastImg = document.querySelector(".toastImg")
                    const toastP = document.querySelector(".toastP")
                    const toastMsg = document.querySelector(".toastMsg")

                    toastImg.src = "../img/botao-de-verificacao-erro.png";
                    toastP.outerHTML = "<p class=\"toastP\" style=\"color: var(--alert200); font-weight: 600\">Não foi possível criar sua conta</p>"
                    toastMsg.innerHTML = "<p class=\"toastMsg\">Você pode voltar para a página de login: <a style=\"color: var(--brand100)\"; href=\"http://127.0.0.1:5500/\">Acessar página de login</a></p>"

                    toast.classList.toggle('hidden')
                    setTimeout(() => { toast.classList.toggle('hidden') }, 5000);
                }
            } catch (erro) {
                alert('Opss, algo deu errado.')
            }
        } else {
            alert('Preencha todos os campos')
        }
    });
};

const returnHome = () => {
    button__voltar.addEventListener("click", () => {
        window.location.replace('http://127.0.0.1:5500');
    });
};

returnHome();
createUser();


