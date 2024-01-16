const postcontainer = document.getElementById('posts-container')
const filter = document.querySelector('#input-container')
const loader = document.querySelector('.loader')
let page = 1
let limit = 3
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}?_page=${page}`)
    const data = await res.json()
    return data
}
async function showposts() {
    const posts = await getPosts()
    posts.forEach(post => {
        const postelement = document.createElement('div')
        postelement.classList.add('post')
        postelement.innerHTML = `
        <p class="post-number">${post.id}</p>
        <div class="post-info">
            <p class="post-title">${post.title}</p>
            <div class="post-description">
                ${post.body}
            </div>
        </div>`
        postcontainer.appendChild(postelement)
    });
}
function showLoading() {
    loader.classList.add('show')
    setTimeout(() => {
        loader.classList.remove('show')
        setTimeout(() => {
            page++
            showposts()

        },300)
    }, 1000)
}
window.addEventListener('scroll', () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading()
    }
})

showposts()