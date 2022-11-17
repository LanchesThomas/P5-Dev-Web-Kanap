const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const email = document.querySelector('#email');
const orderButton = document.querySelector('#order');
const id = cart[i].id;

// let contactItem = {};

firstName.addEventListener('input', () => {
    let regName = /[a-zA-Z]{1,10}/;
    let firstNameErrorMessage = document.querySelector('#firstNameErrorMsg');
    if (!regName.test(firstName.value)) {
        firstNameErrorMessage.textContent = 'Nom Invalide';
    } else {
        firstNameErrorMessage.textContent = '';
        // contactItem.firstName = firstName.value;
    }
});

lastName.addEventListener('change', () => {
    let regName = /[a-zA-Z]{1,10}/;
    let lastNameErrorMessage = document.querySelector('#lastNameErrorMsg');
    if (!regName.test(lastName.value)) {
        lastNameErrorMessage.textContent = 'Prénom Invalide';
    } else {
        lastNameErrorMessage.textContent = '';
        // contactItem.lastName = lastName.value;
    }
});

address.addEventListener('change', () => {
    let regAddress = /[A-Za-z0-9'\.\-\s\,]/;
    let addressErrorMessage = document.querySelector('#addressErrorMsg');
    if (!regAddress.test(address.value)) {
        addressErrorMessage.textContent = 'Adresse Invalide';
    } else {
        addressErrorMessage.textContent = '';
        // contactItem.address = address.value;
    }
});

city.addEventListener('change', () => {
    let regCity = /[a-zA-Z]{1,10}/;
    let cityErrorMessage = document.querySelector('#cityErrorMsg');
    if (!regCity.test(city.value)) {
        cityErrorMessage.textContent = 'Ville Invalide';
    } else {
        cityErrorMessage.textContent = '';
        // contactItem.city = city.value;
    }
});

email.addEventListener('change', () => {
    let regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let emailErrorMessage = document.querySelector('#emailErrorMsg');
    if (!regEmail.test(email.value)) {
        emailErrorMessage.textContent = 'Email Invalide';
    } else {
        emailErrorMessage.textContent = '';
        // contactItem.email = email.value;
    }
});



const form = document.querySelector('.cart__order__form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
});

function submitForm() {
    if (cart.length === 0) {
        alert('Veuillez sélectionner un produit');
    }
    fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        body: JSON.stringify({
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: [id],
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.error(error);
        });
}

function requestBody() {
    const body = {
        contact: {
            firstName: 'pouet',
            lastName: 'pouet',
            address: 'pouet',
            city: 'pouet',
            email: 'pouet',

            products: ['pouet'],
        },
    };
    return body;
}
