// récupération de l'ID de la page URL
let idUrl = window.location.search;
let urlParams = new URLSearchParams(idUrl);
let id = urlParams.get("id") 

createProduct();

// fonction de création des éléments
function createProduct() {
    fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((res) => {
            // ajout image
            let img = document.createElement('img');
            document.querySelector('.item__img').appendChild(img);
            img.src = res.imageUrl
            // ajout du titre
            document.getElementById('title').innerText = res.name;
            // ajout du prix
            document.getElementById('price').innerText = res.price;
            // ajout description
            document.getElementById('description').innerText = res.description;
            // ajout options couleurs
            for (let i in res.colors) {
            let colorsOptions = document.createElement('option');
            document.getElementById('colors').appendChild(colorsOptions);
            colorsOptions.setAttribute('value', res.colors[i]);
            colorsOptions.innerText = res.colors[i];
        }
            addToCart();
});
}



function addToCart () {
document.getElementById('addToCart').addEventListener('click', function(){
    document.location.href = './cart.html';
    localStorage.setItem('idProduct', id);
    localStorage.setItem('quantityProduct', document.getElementById('quantity').value);
    localStorage.setItem('colorProduct', document.getElementById('colors').value)
})}

