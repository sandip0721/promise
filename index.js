// var container = document.createElement('div');
// container.setAttribute('class', 'container');

// var row = document.createElement('div');
// row.setAttribute('class', 'row');
// row.setAttribute('id', 'rowId');

var apiKey = 'eebe6fcd6085cff56d89256268d87c6e'

//get api using fetch()

fetch('https://restcountries.eu/rest/v2/all').then((response) => {
    return response.json();
}).then((result) => {
    console.log(result)

    var container = document.createElement('div');
    container.setAttribute('class', 'container-fluid bg-secondary mt-2 pt-2');

    var row = document.createElement('div');
    row.setAttribute('class', 'row');
    row.setAttribute('id', 'rowId');

    container.append(row);

    //for loop to get the country details and create the cards
    result.forEach(element => {
        row.append(countryCard(element));
    });


    document.body.append(container);

}).catch((err) => {
    console.error(err);
});


//function to create card
function countryCard(obj) {
    let outerDiv = document.createElement('div');
    outerDiv.setAttribute('class', 'col-12 col-md-6 col-lg-4 col-sm-12 align-bottom');
    outerDiv.style = 'height:412px;'

    let card = document.createElement('div')
    card.setAttribute('class', 'card rounded');
    card.style = ' height: 99%;'

    let cardHeader = document.createElement('div')
    cardHeader.setAttribute('class', 'card-header text-center bg-dark text-light');
    cardHeader.innerHTML = obj.name;




    let cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card-body text-center rounded');

    let cardImage = document.createElement('img');
    cardImage.src = obj.flag;
    cardImage.alt = obj.name;
    // cardImage.setAttribute('class', 'card-img-top img-fluid');
    cardImage.style = 'width:300px;height:224px;'

    cardBody.append(cardImage);

    let pTag = document.createElement('p')
    pTag.setAttribute('class', 'card-text');


    let tempDiv = document.createElement('div')
    tempDiv.setAttribute('class', 'col-lg-12 col-sm-12 text-center pt-1');
    tempDiv.innerText = 'Capital: ' + obj.capital;

    let tempDiv1 = document.createElement('div')
    tempDiv1.setAttribute('class', 'col-lg-12 col-sm-12 text-center ');
    tempDiv1.innerText = 'Region: ' + obj.region;

    let tempDiv2 = document.createElement('div')
    tempDiv2.setAttribute('class', 'col-lg-12 col-sm-12 text-center ');
    tempDiv2.innerText = 'Country Code: ' + obj.callingCodes[0];


    let tempDiv3 = document.createElement('div')
    tempDiv3.setAttribute('class', 'col-lg-12 col-sm-12 text-center pt-1');

    let tempButton = document.createElement('button');
    tempButton.setAttribute('class', 'btn btn-primary');
    tempButton.setAttribute('data-name', obj.capital);
    tempButton.addEventListener('click', (event) => {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + event.target.dataset.name + '&appid=' + apiKey).then((response) => {
            return response.json();
        }).then((result) => {
            alert('Weather Info for ' + event.target.dataset.name + ' :' + JSON.stringify(result));
        }).catch((err) => {
            console.error(err);
        })
        console.log(event.target.dataset.name);
    });
    tempButton.innerText = 'View Weather';
    tempDiv3.append(tempButton);



    pTag.append(tempDiv, tempDiv1, tempDiv2, tempDiv3);

    cardBody.append(pTag);

    card.append(cardHeader, cardBody);

    outerDiv.append(card);

    return outerDiv;





}

function getCountryName(event) {

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + event.target.dataset.name + '&appid=' + apiKey).then((response) => {
        return response.json();
    }).then((result) => {
        alert('Weather Info :' + result);
    }).catch((err) => {
        console.error(err);
    })
    console.log(event.target.dataset.name);

}