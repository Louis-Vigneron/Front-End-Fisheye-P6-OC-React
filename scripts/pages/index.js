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

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    
    
