id = getUrlId();
displayId();

//récupération de l'ID dans l'URL
function getUrlId() {
    let idUrl = window.location.search;
    let urlParams = new URLSearchParams(idUrl);
    let id = urlParams.get('id');
    return id;
}

// affichage du numéro de commande
function displayId() {
    const orderId = document.querySelector('#orderId');
    orderId.textContent = id;
}
