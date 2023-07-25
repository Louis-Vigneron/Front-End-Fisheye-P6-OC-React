fetch("../../data/photographers.json")

  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    displayData(value.photographers)
  })
  .catch(function (err) {
    console.log(err);
  });


function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographerData) => {
    let photographer = new Photographer(photographerData);
    let photographerCard = new PhotographerCard(photographer);
    let photographerCardHtml = photographerCard.createPhotographerCard();
    photographersSection.innerHTML += photographerCardHtml;
  });
}



