let idProduct = localStorage.idProduct;
let quantityProduct = localStorage.quantityProduct;
let colorProduct = localStorage.colorProduct;

fetch(`http://localhost:3000/api/products/${idProduct}`)
.then((res) => {
    if (res.ok) {
        return res.json();
    } })
    .then((res) => {
        // ajout image
        let img = document.querySelector('.cart__item__img img');
        img.src = res.imageUrl;
        // ajout du titre
        document.querySelector('.cart__item__content__description h2').innerText = res.name;
        // ajout du prix
        document.querySelector('.cart__item__content__description').lastElementChild.innerText = res.price * quantityProduct + ' €';
        // ajout couleur
        document.querySelector('.cart__item__content__description p').innerText = colorProduct;
        // ajout quantité 
        document.querySelector('.cart__item__content__settings__quantity input').value = quantityProduct;

    })
    
createElement();

function createElement() {
    let article = document.createElement('article');
    document.getElementById('cart__items').appendChild(article);
    article.innerHTML = '<div class="cart__item__img">\
    <img src="../images/product01.jpg" alt="Photographie d\'un canapé">\
  </div>\
  <div class="cart__item__content">\
    <div class="cart__item__content__description">\
      <h2>Nom du produit</h2>\
      <p>Vert</p>\
      <p>42,00 €</p>\
    </div>\
    <div class="cart__item__content__settings">\
      <div class="cart__item__content__settings__quantity">\
        <p>Qté : </p>\
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">\
      </div>\
      <div class="cart__item__content__settings__delete">\
        <p class="deleteItem">Supprimer</p>\
      </div>\
    </div>\
  </div>'
}