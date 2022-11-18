createProduct();

// récupération des données de l'API
function createProduct() {
fetch('http://localhost:3000/api/products')
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((res) => {
        for (let index in res) {
            createElement();
        }
        displayKanap(res)
    })
    .catch((error) => {
        console.error(error);
    });
}

// fonction création des éléments
function createElement() {
    let lien = document.createElement('a');
    document.getElementById('items').appendChild(lien);
    let article = document.createElement('article');
    lien.appendChild(article);
    let img = document.createElement('img');
    article.appendChild(img);
    let title = document.createElement('h3');
    article.appendChild(title);
    let description = document.createElement('p');
    article.appendChild(description);
}

// function affichage des données de l'API pour chaque produit
function displayKanap(res) {
    for (let i in res) {
        // boucle ajout titre
        let title = document.querySelectorAll('#items h3');
        title[i].innerHTML = res[i].name;
        // boucle ajout image
        let img = document.querySelectorAll('#items img');
        img[i].src = res[i].imageUrl;
        // boucle ajout description
        let description = document.querySelectorAll('#items p');
        description[i].innerHTML = res[i].description;
        // boucle ajout lien
        let link = document.querySelectorAll('#items a');
        link[i].href = './product.html?id=' + res[i]._id;
    }
}