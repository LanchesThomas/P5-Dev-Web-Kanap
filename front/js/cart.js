let cart = JSON.parse(localStorage.getItem('cart'));
for (i in cart) {
    let item = cart[i];

    createArticle(item);
    submitEvent(item);

    fetch(`http://localhost:3000/api/products/${item.id}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((res) => {
            addElement(item, res);
        })
        .catch((error) => {
            console.error(error);
        });
}

////////////////////////////////////
///////////ARTCILE ////////////////
//////////////////////////////////

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

// création paramètres quantité et suppression produits
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

// fonction ajout caractéristiques du produit
function addElement(item, res) {
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
    ).lastElementChild.innerText = res.price + ' €';

    // ajout couleur
    article.querySelector('.cart__item__content__description p').innerText =
        item.color;
    // ajout quantité input
    article.querySelector(
        '.cart__item__content__settings__quantity input'
    ).value = item.quantity;
    // ajout quantité total

    totalPrice(res);
    totalQuantity(article, item);
    updateQuantity(article, item, res);
    deletedElement(article, item);
}

// modifications prix est quantité total grâce à l'input
function updateQuantity(article, item, res) {
    const input = article.querySelector('.itemQuantity');
    input.addEventListener('change', () => {
        let itemUpdate = cart.find((element) => element.id === item.id);
        itemUpdate.quantity = Number(input.value);
        localStorage.setItem('cart', JSON.stringify(cart));
        totalPrice(res);
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
function totalPrice(res) {
    let total = 0;
    const totalPrice = document.querySelector('#totalPrice');
    cart.forEach((item) => {
        const totalUnitPrice = res.price * item.quantity;
        total += totalUnitPrice;
    });
    totalPrice.textContent = total;
}

//fonction suppression produit
function deletedElement(article, item) {
    const deleted = article.querySelector('.deleteItem');
    deleted.addEventListener('click', () => {
        for (i = 0; i < cart.length; i++) {
            if (item.id === cart[i].id && item.color === cart[i].color) {
                cart.splice(i, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.reload();
            }
        }
    });
}

////////////////////////////////////
///////////FORM////////////////////
//////////////////////////////////

const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const email = document.querySelector('#email');
const orderButton = document.querySelector('#order');

//first name error message validation
const firstNameErrorMessage = document.querySelector('#firstNameErrorMsg');
firstName.addEventListener('change', () => {
    let regName = /^[a-z][a-z '-.,]{1,31}$|^$/i;
    if (!regName.test(firstName.value)) {
        firstNameErrorMessage.textContent = 'Nom Invalide';
    } else {
        firstNameErrorMessage.textContent = '';
    }
});

//last name error message validation
const lastNameErrorMessage = document.querySelector('#lastNameErrorMsg');
lastName.addEventListener('change', () => {
    let regName = /^[a-z][a-z '-.,]{1,31}$|^$/i;
    if (!regName.test(lastName.value)) {
        lastNameErrorMessage.textContent = 'Prénom Invalide';
    } else {
        lastNameErrorMessage.textContent = '';
    }
});

//address error message validation
const addressErrorMessage = document.querySelector('#addressErrorMsg');
address.addEventListener('change', () => {
    let regAddress = /[A-Za-z0-9'\.\-\s\,]/;
    if (!regAddress.test(address.value)) {
        addressErrorMessage.textContent = 'Adresse Invalide';
    } else {
        addressErrorMessage.textContent = '';
    }
});

//city error message validation
const cityErrorMessage = document.querySelector('#cityErrorMsg');
city.addEventListener('change', () => {
    let regCity = /[a-zA-Z]{1,10}/;
    if (!regCity.test(city.value)) {
        cityErrorMessage.textContent = 'Ville Invalide';
    } else {
        cityErrorMessage.textContent = '';
    }
});

//email error message validation
const emailErrorMessage = document.querySelector('#emailErrorMsg');
email.addEventListener('change', () => {
    let regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regEmail.test(email.value)) {
        emailErrorMessage.textContent = 'Email Invalide';
    } else {
        emailErrorMessage.textContent = '';
    }
});

// event submit
function submitEvent(item) {
    const form = document.querySelector('.cart__order__form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // vérification de la bonne saisie des input
        if (
            firstNameErrorMessage.textContent == '' &&
            lastNameErrorMessage.textContent == '' &&
            addressErrorMessage.textContent == '' &&
            cityErrorMessage.textContent == '' &&
            emailErrorMessage.textContent == ''
        ) {
            submitForm(item);
        } else {
            // message d'erreur si la saisie n'est pas bonne
            alert('Veillez a remplir correctement le formulaire');
        }
    });
}

// fonction envoie des données à l'API pour récupérer l'ID de confirmation
function submitForm(item) {
    if (cart.length === 0) {
        alert('Veuillez sélectionner un produit');
        document.location.href = `./index.html`;
    }
    fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        body: JSON.stringify({
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: [item.id],
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            document.location.href = `./confirmation.html?id=${data.orderId}`;
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
        })
        .catch((error) => {
            console.error(error);
        });
}
