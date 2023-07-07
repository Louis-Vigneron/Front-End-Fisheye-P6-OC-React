function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const a = document.createElement('a');
        a.href = `./photographer.html?${id}`;
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.alt = name;
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const pCity = document.createElement('h3');
        pCity.textContent = `${city}, ${country}`;
        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        const pPrice = document.createElement('span');
        pPrice.textContent = `${price}€/jour`;
        a.appendChild(article);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCity);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (a);
    }
    return { name, portrait, city, country, tagline, price, id, getUserCardDOM }
}

