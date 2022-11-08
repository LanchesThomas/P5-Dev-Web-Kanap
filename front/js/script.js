fetch('http://localhost:3000/api/products')
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((res) => {
        kanap1();
        
        console.table(res)
        for (index in res) {
            createElement();
        }

    })
    .catch((err) => {
        console.log('une Erreur est survenue');
    });

    // fonction création des éléments
    function createElement() {
        lien = document.createElement('a');
        document.getElementById('items').appendChild(lien);
        article = document.createElement('article');
        lien.appendChild(article);
        img = document.createElement('img');
        article.appendChild(img)
        title = document.createElement('h3');
        article.appendChild(title);
        description = document.createElement('p');
        article.appendChild(description)
    }

    // fonction d'ajout du premier canapé
function kanap1() {
    fetch('http://localhost:3000/api/products')
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((res) => {
            document.querySelector('#items h3').innerHTML = res[0].name;
            document.querySelector('#items img').src = res[0].imageUrl;
            document.querySelector('#items p').innerHTML = res[0].description;
            document.querySelector('#items a').href = './product.html?id=' + res[0]._id
        });
}

function kanap2() {
    fetch('http://localhost:3000/api/products')
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((res) => {
            console.table(res);
            document.querySelector('#items h3').innerHTML = res[1].name;
            document.querySelector('#items img').src = res[1].imageUrl;
            document.querySelector('#items p').innerHTML = res[1].description;
            document.querySelector('#items a').href = './product.html?id=' + res[1]._id
        });
}

