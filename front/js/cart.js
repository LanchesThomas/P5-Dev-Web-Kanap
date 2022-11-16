let cart = JSON.parse(localStorage.getItem('cart'));
for (i in cart) {
    let item = cart[i];

    createArticle(item);

    // createElement(id, color, image, quantity);

    fetch(`http://localhost:3000/api/products/${item.id}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(() => {
            addElement(item);
        });
}

// fonction ajout caractéristiques du produit
function addElement(item) {
    // a ajuster pour trouver data-id ET data-color
    const article = document.querySelector(
        `[data-color="${item.color}"][data-id="${item.id}"]`
    );
    // ajout image
    let img = article.querySelector('img');
    img.src = item.img;
    // ajout du titre
    article.querySelector('.cart__item__content__description h2').innerText =
        item.title;
    // ajout du prix
    article.querySelector(
        '.cart__item__content__description'
    ).lastElementChild.innerText = item.price + ' €';

    // ajout couleur
    article.querySelector('.cart__item__content__description p').innerText =
        item.color;
    // ajout quantité input
    article.querySelector(
        '.cart__item__content__settings__quantity input'
    ).value = item.quantity;
    // ajout quantité total

    totalPrice(article);
    totalQuantity(article, item);
    updateQuantity(article, item);
    deletedElement(article, item);
}

// création article
function createArticle(item) {
    let article = document.createElement('article');
    article.setAttribute('data-id', item.id);
    article.setAttribute('data-color', item.color);
    article.classList.add('cart__item');
    document.getElementById('cart__items').appendChild(article);

    createImg(item, article);
    createCartItemContent(article, item);
}

// création Img
function createImg(item, article) {
    let cartItemImg = document.createElement('div');
    cartItemImg.setAttribute('class', 'cart__item__img');
    let img = document.createElement('img');
    img.src = item.img;
    img.setAttribute('alt', "photographie d'un canapé");
    cartItemImg.appendChild(img);
    article.appendChild(cartItemImg);
}

// création description produit
function createCartItemContent(article, item) {
    let cartItemContent = document.createElement('div');
    cartItemContent.setAttribute('class', 'cart__item__content');
    article.appendChild(cartItemContent);
    // description
    let cartItemContentDescription = document.createElement('div');
    cartItemContentDescription.setAttribute(
        'class',
        'cart__item__content__description'
    );
    cartItemContent.appendChild(cartItemContentDescription);
    // titre
    let title = document.createElement('h2');
    cartItemContentDescription.appendChild(title);
    // couleur
    let colorContent = document.createElement('p');
    cartItemContentDescription.appendChild(colorContent);
    // prix
    let price = document.createElement('p');
    cartItemContentDescription.appendChild(price);

    settings(cartItemContent, item);
}

// création quantité et supprimer produits
function settings(cartItemContent, item) {
    let cartItemContentSettings = document.createElement('div');
    cartItemContentSettings.setAttribute(
        'class',
        'cart__item__content__settings'
    );
    cartItemContent.appendChild(cartItemContentSettings);
    let cartItemContentSettingsQuantity = document.createElement('div');
    cartItemContentSettingsQuantity.classList.add(
        'cart__item__content__settings__quantity'
    );
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
    // quantity content
    let quantityContent = document.createElement('p');
    quantityContent.innerText = 'Qté : ';
    cartItemContentSettingsQuantity.appendChild(quantityContent);
    //quantity input
    let quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.classList.add('itemQuantity');
    quantityInput.name = 'itemQuantity';
    quantityInput.min = '1';
    quantityInput.max = '100';
    quantityInput.value = item.quantity;
    cartItemContentSettingsQuantity.appendChild(quantityInput);
    // delete settings
    let cartItemContentSettingsDelete = document.createElement('div');
    cartItemContentSettingsDelete.setAttribute(
        'class',
        'cart__item__content__settings__delete'
    );
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
    let deleteItem = document.createElement('p');
    deleteItem.setAttribute('class', 'deleteItem');
    deleteItem.innerText = 'Supprimer';
    cartItemContentSettingsDelete.appendChild(deleteItem);
}

// modifications prix est quantité total grâce à l'input
function updateQuantity(article, item) {
    const input = article.querySelector('.itemQuantity');
    input.addEventListener('change', () => {
        let itemUpdate = cart.find((element) => element.id === item.id);
        itemUpdate.quantity = Number(input.value);
        localStorage.setItem('cart', JSON.stringify(cart));
        totalPrice();
        totalQuantity();
    });
}

// affichage quantité totale
function totalQuantity() {
    let total = 0;
    let totalQuantity = document.querySelector('#totalQuantity');
    cart.forEach((item) => {
        const totalUnitQuantity = item.quantity * 1;
        total += totalUnitQuantity;
    });
    totalQuantity.textContent = total;
}

// affichage prix total
function totalPrice() {
    let total = 0;
    const totalPrice = document.querySelector('#totalPrice');
    cart.forEach((item) => {
        const totalUnitPrice = item.price * item.quantity;
        total += totalUnitPrice;
    });
    totalPrice.textContent = total;
}
console.table(cart);

//fonction suppression produit
function deletedElement(article, item) {
    const deleted = article.querySelector('.deleteItem');
    deleted.addEventListener('click', () => {
        for (i=0; i<cart.length; i++) {
            console.log(cart[i][1])
        if (item.id === cart[i].id && item.color === cart[i].color) {
            cart.splice(i, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.reload();
        } 
    }

        
    });
}
