

var clearStorage = document.getElementById('clearStorage');
clearStorage.onclick = function () {
    localStorage.clear(); // clears the local Storage
    location.reload(); // refresh the page 
    console.log('Our local storage data has been removed');
}


// if (totalClicks==maxAllowedClicks){
// var confirm1 = confirm("you have already voted, do you want to delete data and start a new vote?");
// if (confirm1) { localStorage.clear();}
// }
var productSection = document.getElementById('all-products');
var allProducts = [];
var totalClicks = 0;
var productsName = [];
var productsVotes = [];      // number of clicks for each img after finishing the maxAllowedClicks
var productsTimeShown = [];  //number of displays(timesShown) for each img after finishing the maxAllowedClicks
var maxAllowedClicks = 25;
var confirm2;

var inputData = document.getElementById('inClicks').Value;
var form1= document.getElementById('form1');
form1.addEventListener('submit', handleSubmit)
function handleSubmit(event){
    event.preventDefault();
    maxAllowedClicks= event.target.inClicks.value;
}

if (localStorage.length > 0) {
    totalClicks = parseInt(localStorage.getItem("savedTotalClicks"));
    //    productsVotes=(localStorage.getItem("savedProductsVotes"));
    //    productsTimeShown=(localStorage.getItem("savedProductsTimeShown")) ;
    //productsName= localStorage.getItem() ;
}


var leftImage = document.getElementById('left-image');
var midImage = document.getElementById('middle-image');
var rightImage = document.getElementById('right-image');

var currentLeftImage;
var currentMidImage;
var currentRightImage;

var previousLeftImageIndex;
var previousMidImageIndex;
var previousrightImageIndex;

function ProductPicture(name, url) {
    this.name = name;
    this.url = url;
    this.numberOfClicks = 0;
    this.timesShown = 0;

    productsName.push(this.name);

    if (localStorage.length > 0) {
        this.timesShown = JSON.parse(localStorage.getItem(this.name)).timesShown;
        this.numberOfClicks = JSON.parse(localStorage.getItem(this.name)).numberOfClicks;
    }
    allProducts.push(this);
}

new ProductPicture('bag', 'img/bag.jpg');
new ProductPicture('banana', 'img/banana.jpg');
new ProductPicture('bathroom', 'img/bathroom.jpg');
new ProductPicture('boots', 'img/boots.jpg');
new ProductPicture('breakfast', 'img/breakfast.jpg');
new ProductPicture('bubblegum', 'img/bubblegum.jpg');
new ProductPicture('chair', 'img/chair.jpg');
new ProductPicture('cthulhu', 'img/cthulhu.jpg');
new ProductPicture('dog-duck', 'img/dog-duck.jpg');
new ProductPicture('dragon', 'img/dragon.jpg');
new ProductPicture('pen', 'img/pen.jpg');
new ProductPicture('pet-sweep', 'img/pet-sweep.jpg');
new ProductPicture('scissors', 'img/scissors.jpg');
new ProductPicture('shark', 'img/shark.jpg');
new ProductPicture('sweep', 'img/sweep.png');
new ProductPicture('tauntaun', 'img/tauntaun.jpg');
new ProductPicture('unicorn', 'img/unicorn.jpg');
new ProductPicture('usb', 'img/usb.gif');
new ProductPicture('water-can', 'img/water-can.jpg');
new ProductPicture('wine-glass', 'img/wine-glass.jpg');

function displayRandomImages() {

    var forbiddenIndex = [];

    if (totalClicks > 0) {
        forbiddenIndex = [previousLeftImageIndex, previousrightImageIndex, previousMidImageIndex];
    }

    var leftIndex = generateRandomNumber(forbiddenIndex);
    forbiddenIndex.push(leftIndex);
    var rightIndex = generateRandomNumber(forbiddenIndex);
    forbiddenIndex.push(rightIndex);
    var midIndex = generateRandomNumber(forbiddenIndex);

    previousLeftImageIndex = leftIndex;
    previousMidImageIndex = midIndex;
    previousrightImageIndex = rightIndex;

    currentLeftImage = allProducts[leftIndex];
    currentMidImage = allProducts[midIndex];
    currentRightImage = allProducts[rightIndex];

    leftImage.setAttribute('src', currentLeftImage.url);
    midImage.setAttribute('src', currentMidImage.url);
    rightImage.setAttribute('src', currentRightImage.url);
    if (totalClicks < maxAllowedClicks) {      // to prevent increase number if the user reached the maxAllowedClicks in previous page load
        currentLeftImage.timesShown += 1;
        currentMidImage.timesShown += 1;
        currentRightImage.timesShown += 1;
    }
}

function generateRandomNumber(forbiddenIndex) {

    var allowed;
    var randomNumber;

    do {
        randomNumber = Math.floor(Math.random() * allProducts.length);
        allowed = true;
        for (var i = 0; i < forbiddenIndex.length; i++) {
            if (forbiddenIndex[i] === randomNumber) {
                allowed = false;
            }
        }
    } while (!allowed);

    return randomNumber;
}

displayRandomImages();

productSection.addEventListener('click', handleGoatClick);

function handleGoatClick(event) {
    if (totalClicks < maxAllowedClicks) {
        var clickedElement = event.target;
        var clickedElementId = clickedElement.id;

        if (clickedElementId === 'left-image' || clickedElementId === 'right-image' || clickedElementId === "middle-image") {
            totalClicks++;

            if (clickedElementId === 'left-image') {
                currentLeftImage.numberOfClicks += 1;
            }


            if (clickedElementId === 'right-image') {
                currentRightImage.numberOfClicks += 1;
            }
            if (clickedElementId === 'middle-image') {
                currentMidImage.numberOfClicks += 1;
            }

            displayRandomImages();
        }
    } else {
        // add a code to display results
        var resultsList = document.getElementById('results');

        for (var i = 0; i < allProducts.length; i++) {
            var listItem = document.createElement('li');
            listItem.textContent = allProducts[i].name + ' had ' + allProducts[i].numberOfClicks + ' votes , and was shown ' + allProducts[i].timesShown + ' times';
            resultsList.appendChild(listItem);
        }

        productSection.removeEventListener('click', handleGoatClick);
        alert(`you have clicked ${maxAllowedClicks} times`);
        drawChart();
    }
    {//start saving data
        for (var i = 0; i < allProducts.length; i++) {
            localStorage.setItem(allProducts[i].name, JSON.stringify(allProducts[i]));
        }
        localStorage.setItem("savedTotalClicks", totalClicks);

    }

}



// productsVotes & draw chart // runs after finishing the maxAllowedClicks
function drawChart() {

    for (var i = 0; i < allProducts.length; i++) {
        productsVotes.push(allProducts[i].numberOfClicks);
        productsTimeShown.push(allProducts[i].timesShown);
    }


    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productsName,
            datasets: [{
                label: '# of Votes',
                data: productsVotes,
                backgroundColor: 'rgba(15, 75, 15, 0.37)',
                borderColor: 'rgba(230, 233, 61, 1)',
                borderWidth: 2
            }, {
                label: '# of Displays',
                data: productsTimeShown,
                backgroundColor: 'rgba(28, 71, 190, 0.37)',
                borderColor: 'rgba(98, 42, 112, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}