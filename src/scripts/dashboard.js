
const body = document.querySelector('body');
const nameLogOut = document.querySelector('.name_LogOut');
const imgLogOut = document.querySelector('.img__header');
const containerLogOut = document.querySelector('.LogOut');
const buttonLogOut = document.querySelector('.LogOut__button');
const containerPosts = document.querySelector('.container');

const accessPage = async () => {
    try {
        const userProfile = await fetch('http://localhost:3333/users/profile', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        const userProfileBase = await userProfile.json();
        // console.log(userProfileBase)
        imgLogOut.src = userProfileBase.avatar;
        imgLogOut.alt = `avatar user ${userProfileBase.username}`
        nameLogOut.textContent = userProfileBase.username
    } catch (erro) {
        console.error('Opss, algo deu errado:', erro);
    }
}
const visibleLogOut = () => {
    imgLogOut.addEventListener("click", () => {
        containerLogOut.classList.toggle('hidden')
    })
    LogOut();
}
const LogOut = () => {
    buttonLogOut.addEventListener("click", () => {
        window.location.replace('http://127.0.0.1:5500');
        localStorage.removeItem('token');
    })
}

const showPosts = async () => {
    try {
        const posts = await fetch('http://localhost:3333/posts', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        const userProfile = await fetch('http://localhost:3333/users/profile', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        const postsBase = await posts.json();
        const userProfileBase = await userProfile.json();

        postsBase.forEach((post) => {
            containerPosts.insertAdjacentHTML("afterbegin", `
            <div class="post">
            <div class="profile">
                <div class="profileInfo">
                    <img class="userPost" src="${post.user.avatar}" alt="${post.user.username}">
                    <p><strong>${post.user.username}</strong></p>
                </div>
                <div class="container__edit hidden">
                    <button class="editPost edit__button">Editar</button>
                    <button class="deletePost delete__button">Excluir</button>
                </div>
            </div>
            <h2>${post.title}</h2>
            <p>${post.content.substring(0, 145)}...</p>
            <button class="accessPost" id="${post.id}">Acessar publicação</button>
        </div>
            `)
            if (userProfileBase.id == post.user.id) {
                const containerEdit = document.querySelector('.container__edit');
                containerEdit.classList.remove('hidden')
            }

            const accessPost__button = document.querySelector('.accessPost');
            const closeModalAccessPub = document.querySelector('.closeModalAccessPub');
            const modalAccessPub = document.querySelector('.modalAccessPub');
            const imgUserPost = document.querySelector('.userPost');
            const nameUserPost = document.querySelector('.nameUserPost');
            const titleUserPost = document.querySelector('.titleUserPost');
            const contentUserPost = document.querySelector('.contentUserPost');

            imgUserPost.src = post.user.avatar;
            nameUserPost.alt = post.user.username;
            titleUserPost.textContent = post.title;
            contentUserPost.textContent = post.content;

            accessPost__button.addEventListener('click', () => {
                modalAccessPub.showModal()
            })

            closeModalAccessPub.addEventListener('click', () => {
                modalAccessPub.close()
            })
            // console.log(imgUserPost.src)
           
        })
    } catch (erro) {
        console.error('Opss, algo deu errado:', erro);
    }
}


visibleLogOut();
accessPage();
showPosts();