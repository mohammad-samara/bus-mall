var productSection = document.getElementById('all-products');
var allProducts = [];
var totalClicks = 0;
var maxAllowedClicks = 25;

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


// all goats [img1, img2, img3, img4]
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

    currentLeftImage.timesShown += 1;
    currentMidImage.timesShown += 1;
    currentRightImage.timesShown += 1;
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
    }
}