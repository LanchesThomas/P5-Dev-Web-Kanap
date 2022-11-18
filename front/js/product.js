// récupération de l'ID de la page URL
let idUrl = window.location.search;
let urlParams = new URLSearchParams(idUrl);
let id = urlParams.get('id');

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
            addDisplay(res);
            addToCart(res);
        });
}

function addDisplay(res) {
    // ajout image
    let img = document.createElement('img');
    document.querySelector('.item__img').appendChild(img);
    img.src = res.imageUrl;
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
}

// function addToCart() {
//     document.getElementById('addToCart').addEventListener('click', function () {
//         document.location.href = './cart.html';

//         localStorage.setItem('idProduct', id);
//         localStorage.setItem(
//             'quantityProduct',
//             document.getElementById('quantity').value
//         );
//         localStorage.setItem(
//             'colorProduct',
//             document.getElementById('colors').value
//         );
//     });
// }



function addToCart(res) {
    // fonction ajout dans le panier
    const btnAddToCart = document.getElementById('addToCart');
    btnAddToCart.addEventListener('click', function () {
        // écoute de l'événement addToCart
        let cart = JSON.parse(localStorage.getItem('cart'));
        let title = document.getElementById('title').textContent;
        let color = document.getElementById('colors').value;
        let quantity = document.getElementById('quantity').value;
        let img = res.imageUrl;
        let cartItem = {
            // liste spécifications du produit
            id: id, // id produit
            title: title, // nom produit
            color: color, // couleur produit
            quantity: quantity, // quantité produit
            img : img, // image produit
        };
        if (quantity > 0 && quantity <= 100 && color !== '') {
            if (localStorage.getItem('cart') == null) {
                // si aucun produit n'est dans le panier
                let cart = []; // initialisation liste 'cart'
                cart.push(cartItem); // ajout des spécifications dans la liste 'cart'
                localStorage.setItem('cart', JSON.stringify(cart)); // ajout de la liste 'cart' dans le 'local.storage'
                document.location.href = './cart.html';
            } else {
                let check = false; // vérifie si la condition est vraie ou fausse
                for (let i in cart) {
                    if (title === cart[i].title && color === cart[i].color) {
                        // si la couleur et le titre sont les mêmes on ajoute un a la quantité
                        cart[i].quantity =
                            parseInt(cart[i].quantity) + parseInt(quantity);
                        check = true; // condition vraie
                        break;
                    }
                }
                if (check === false) {
                    // si la condition est fausse
                    cart.push(cartItem);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                document.location.href = './cart.html';
            } 
        } else {
            alert('Veuillez renseigner les champs couleur et quantité.')
        }
    });
}
