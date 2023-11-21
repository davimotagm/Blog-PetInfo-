const button__createPoste = document.querySelector('.createPost');
const modal_open = document.querySelector('.modal__controller')
const modal_close = document.querySelector('.closeModal')
const modal_cancel = document.querySelector('.cancel')
const publish = document.querySelector('.publish')
const titlePost = document.querySelector('.titlePost')
const contentPost = document.querySelector('.contentPost')


const createPost = () => {
    button__createPoste.addEventListener('click', () => {
        modal_open.showModal();

        publish.addEventListener('click', async () => {
            if (titlePost.value && contentPost.value) {
                try {
                    const post = await fetch('http://localhost:3333/posts/create', {
                        method: "POST",
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
                        contentPost.value = ""
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
    });
};

const closeModal = () => {
    modal_close.addEventListener('click', () => {
        modal_open.close()
    })
    modal_cancel.addEventListener('click', () => {
        modal_open.close()
    })
}

createPost();
closeModal();

// const accessPost = async () => {
//     try {
//         const posts = await fetch('http://localhost:3333/posts', {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
//             }
//         });

//         if (!posts.ok) {
//             throw new Error(`Erro ao acessar a postagem. Código: ${posts.status}`);
//         }
        
//         const postsBase = await posts.json();
        
//             body.insertAdjacentHTML('beforeend', `
//             <dialog class="modal__controller modalAccessPub">
//             <div class="modal">
//                 <div class="headerModal">
//                     <div class="profileInfo">
//                         <img class="userPost" src="" alt="">
//                         <p><strong></strong></p>
//                     </div>
//                     <button class="closeModal closeModalAccessPub">X</button>
//                 </div>
//                 <h2></h2>
//                 <p></p>
//             </div>
//         </dialog>
//             `)

//             const accessPost__button = document.querySelector('.accessPost');
//             accessPost__button.addEventListener('click', () => {
//                 const modalAccessPub = document.querySelector('.modalAccessPub');
//                 modalAccessPub.showModal()
//                 // console.log(accessPost__button)
//             })
//             const closeModalAccessPub = document.querySelector('.closeModalAccessPub');
//             const modalAccessPub = document.querySelector('.modalAccessPub');
//             closeModalAccessPub.addEventListener('click', () => {
//                 modalAccessPub.close()
//             })
//     } catch (erro) {
//         console.log(erro)
//     }
// }

// accessPost();
