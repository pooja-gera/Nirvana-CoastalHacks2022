window.onscroll = function(){makeNavSticky()};
var navbar = document.getElementById('navbar');
var sticky = navbar.offsetTop;
function makeNavSticky(){
    if(window.pageYOffset >= sticky){
        navbar.classList.add('sticky');
    }else{
        navbar.classList.remove('sticky');
    }
}

var predictButton = document.querySelector(".predict-two")
console.log(predictButton);
let optionOne = document.querySelector(".option-one");
let optionTwo = document.querySelector(".option-two");
let containerOne = document.querySelector(".section-container")
let containerTwo = document.querySelector(".parttwo")

optionOne.addEventListener("click", () => {
    containerOne.scrollIntoView({behavior:"smooth"});
})
optionTwo.addEventListener("click", () => {
    containerTwo.scrollIntoView({behavior:"smooth"});
})

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude);
    lat = position.coords.latitude;
    long = position.coords.longitude;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(date);
    let text = document.querySelector(".text-two");
    fetch(`https://geo-services-by-mvpc-com.p.rapidapi.com/sun_positions?location=${lat}%2C${long}&date=${date}`, options)
        .then(response => response.json())
        .then(response => text.innerHTML = `Sunset time is : ${response.data.sunset}`)
        .catch(err => console.error(err));
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

predictButton.addEventListener("click", () => {
    getLocation();

});

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd7e287891bmshaee944ea936b106p1157a0jsn24be60ca2eb6',
        'X-RapidAPI-Host': 'geo-services-by-mvpc-com.p.rapidapi.com'
    }
};


