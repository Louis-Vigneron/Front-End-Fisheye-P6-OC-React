function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.alt = name;
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const pCity = document.createElement( 'h3' );
        pCity.textContent = `${city}, ${country}`;
        const pTagline = document.createElement( 'p' );
        pTagline.textContent = tagline;
        const pPrice = document.createElement( 'p' );
        pPrice.textContent = `${price}€/jour`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCity);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (article);
    }
    return { name, portrait, city, country, tagline, price, getUserCardDOM }
}

