const orderId = document.querySelector('#orderId');

//récupération de l'ID dans l'URL
let idUrl = window.location.search;
let urlParams = new URLSearchParams(idUrl);
let id = urlParams.get('id');

// affichage du numéro de commande
orderId.textContent = id;



