const accessPage = async () => {
    const nameLogOut = document.querySelector('.name_LogOut');
    const imgLogOut = document.querySelector('.img__header');


    try {
        const userProfile = await fetch('http://localhost:3333/users/profile', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        const userProfileBase = await userProfile.json();
        imgLogOut.src = userProfileBase.avatar;
        imgLogOut.alt = `avatar user ${userProfileBase.username}`
        nameLogOut.textContent = userProfileBase.username
    } catch (erro) {
        console.error('Opss, algo deu errado:', erro);
    }
}

const visibleLogOut = () => {
    const imgLogOut = document.querySelector('.img__header');
    const containerLogOut = document.querySelector('.LogOut');

    imgLogOut.addEventListener("click", () => {
        containerLogOut.classList.toggle('hidden')
    })
    LogOut();
}

const LogOut = () => {
    const buttonLogOut = document.querySelector('.LogOut__button');

    buttonLogOut.addEventListener("click", () => {
        window.location.replace('http://127.0.0.1:5500');
        localStorage.removeItem('token');
    })
}

export const showPosts = async () => {
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

        const postForId = async (id) => {
            const post = await fetch(`http://localhost:3333/posts/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            return post.json()
        };

        const postsBase = await posts.json();
        const userProfileBase = await userProfile.json();

        const renderPosts = () => {
            const containerPosts = document.querySelector('.container');


            containerPosts.innerHTML = ""
            postsBase.forEach((post) => {
                containerPosts.insertAdjacentHTML("afterbegin", `
                <div class="post">
                <div class="profile">
                    <div class="profileInfo">
                        <img class="userPost" src="${post.user.avatar}" alt="${post.user.username}">
                        <p><strong>${post.user.username}</strong></p>
                    </div>
                    <div class="container__edit hidden">
                        <button class="editPost edit__button" id="${post.id}">Editar</button>
                        <button class="deletePost delete__button" id="${post.id}">Excluir</button>
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
            })
        }

        const openPostModal = () => {
            const accessPost__button = document.querySelectorAll('.accessPost');
            const closeModalAccessPub = document.querySelector('.closeModalAccessPub');
            const modalAccessPub = document.querySelector('.modalAccessPub');
            const imgUserPost = document.querySelector('.userPostModal');
            const nameUserPost = document.querySelector('.nameUserPost');
            const titleUserPost = document.querySelector('.titleUserPost');
            const contentUserPost = document.querySelector('.contentUserPost');

            accessPost__button.forEach(async (postAccess) => {
                const idPost = await postForId(postAccess.id)

                postAccess.addEventListener('click', () => {
                    imgUserPost.src = idPost.user.avatar;
                    imgUserPost.alt = idPost.user.username;
                    nameUserPost.textContent = idPost.user.username;
                    titleUserPost.textContent = idPost.title;
                    contentUserPost.textContent = idPost.content;
                    modalAccessPub.showModal()
                    console.log(idPost.id)
                })

                closeModalAccessPub.addEventListener('click', () => {
                    modalAccessPub.close()
                })
            })
        }

        const editPostModal = () => {
            const buttonEdit = document.querySelectorAll('.edit__button');
            const modal_open = document.querySelector('.modalEditPub')
            const modal_close = document.querySelector('.closeModalEdit')
            const cancelChange = document.querySelector('.cancelChange')
            const saveChange = document.querySelector('.saveChange')
            const titlePost = document.querySelector('.editTitlePost')
            const contentPost = document.querySelector('.editContentPost')

            buttonEdit.forEach(async (postAccess) => {
                const idPost = await postForId(postAccess.id)

                postAccess.addEventListener('click', () => {
                    titlePost.value = idPost.title;
                    contentPost.value = idPost.content;
                    modal_open.showModal()

                    saveChange.addEventListener('click', async () => {
                        if (titlePost.value && contentPost.value) {
                            try {
                                const post = await fetch(`http://localhost:3333/posts/${idPost.id}`, {
                                    method: "PATCH",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                                    },
                                    body: JSON.stringify({
                                        "title": titlePost.value,
                                        "content": contentPost.value
                                    })
                                });

                                if (post.ok) {
                                    modal_open.close();
                                    titlePost.value = "";
                                    contentPost.value = "";
                                    showPosts();
                                } else {
                                    console.error('Erro ao criar post:', post.status, post.statusText);
                                }
                            } catch (erro) {
                                alert('Opss, algo deu errado.');
                            }
                        } else {
                            alert('Preencha todos os campos.');
                        }
                    });
                    cancelChange.addEventListener('click', () => {
                        modal_open.close()
                    })
                    modal_close.addEventListener('click', () => {
                        modal_open.close()
                    })
                })
            })
        }

        const deletePostForId = () => {
            const buttonDelete = document.querySelectorAll('.delete__button');
            const modal_open = document.querySelector('.modalDeletePub')
            const modal_close = document.querySelector('.closeModalDelete')
            const cancelDelete = document.querySelector('.cancelDelete')
            const deletePost = document.querySelector('.delete')

            buttonDelete.forEach(async (postAccess) => {
                const idPost = await postForId(postAccess.id)

                postAccess.addEventListener('click', () => {
                    modal_open.showModal()

                    deletePost.addEventListener('click', async () => {

                        try {
                            const post = await fetch(`http://localhost:3333/posts/${idPost.id}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                                }
                            });
                            if (post.ok) {
                                modal_open.close();
                                showPosts();
                            } else {
                                console.error('Erro ao criar post:', post.status, post.statusText);
                            }
                        } catch (erro) {
                            alert('Opss, algo deu errado.');
                        }

                    });
                    cancelDelete.addEventListener('click', () => {
                        modal_open.close()
                    })
                    modal_close.addEventListener('click', () => {
                        modal_open.close()
                    })
                })
            })
        };

        renderPosts();
        editPostModal();
        openPostModal();
        deletePostForId();

    } catch (erro) {
        console.error('Opss, algo deu errado:', erro);
    }

}

accessPage()
visibleLogOut();


