// récupération de l'ID de la page URL
let id = getUrlId();
function getUrlId() {
    let idUrl = window.location.search;
    let urlParams = new URLSearchParams(idUrl);
    let id = urlParams.get('id');
    return id;
}

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
        })
        .catch((error) => {
            console.error(error);
        });
}

// fonction affichage caractéristiques produit
function addDisplay(res) {
    // ajout image
    let img = document.createElement('img');
    document.querySelector('.item__img').appendChild(img);
    img.src = res.imageUrl;
    // ajout altText
    img.setAttribute('alt', res.altTxt);
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

// fonction ajout dans le panier
function addToCart(res) {
    const btnAddToCart = document.getElementById('addToCart');
    btnAddToCart.addEventListener('click', function () {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let title = document.getElementById('title').textContent;
        let color = document.getElementById('colors').value;
        let quantity = document.getElementById('quantity').value;
        let img = res.imageUrl;
        let cartItem = {
            id: id, 
            title: title, 
            color: color, 
            quantity: quantity, 
            img : img,
        };
        if (quantity > 0 && quantity <= 100 && color !== '') {
            // si aucun produit n'est dans le panier
            if (localStorage.getItem('cart') == null) {
                let cart = []; 
                cart.push(cartItem); 
                localStorage.setItem('cart', JSON.stringify(cart)); 
                document.location.href = './cart.html';
            } else {
                let check = false; 
                for (let i in cart) {
                    // si la couleur et le titre sont les mêmes on ajoute un a la quantité
                    if (title === cart[i].title && color === cart[i].color) {
                        cart[i].quantity =
                            parseInt(cart[i].quantity) + parseInt(quantity);
                        check = true; 
                        break;
                    }
                }
                // si la condition est fausse
                if (check === false) {
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