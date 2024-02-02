


const apiKey = "e4fd0c13b34b18ac61c8237f8699a3b9";
const mapkey="AIzaSyBetCDI-3dVnxE3He3457KGffLRtHCTlrM";
const units = "metric"; // You can change this to "imperial" or "standard" if needed
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=${units}&appid=${apiKey}&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector (".weather-icon" );

// Add this before the checkWeather function
function initMap() {
    const mapOptions = {
        zoom: 10,  // You can adjust the zoom level as needed
        center: { lat: 0, lng: 0 },  // Default center before getting real coordinates
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

async function getNews(city) {
    const newsApiKey = '70254651339f482db82e47c8923bf676';
    const newsApiUrl = `https://newsapi.org/v2/top-headlines?q=${city}&apiKey=${newsApiKey}`;

    try {
        const response = await $.ajax({
            url: newsApiUrl,
            method: 'GET',
        });

        // Check if there are articles in the response
        if (response.articles && response.articles.length > 0) {
            // Display the top 3 news on the webpage
            const newsContainer = document.getElementById('news');
            newsContainer.innerHTML = `<h2>News for ${city}</h2>`;

            // Iterate up to the first 3 articles
            for (let i = 0; i < Math.min(3, response.articles.length); i++) {
                const article = response.articles[i];
                newsContainer.innerHTML += `
                    <div>
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank" class="read-more-button">Read more</a>
                    </div>
                `;
                console.log("good");
            }
        } else {
            console.log('No news found for', city);
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }

    const news= document.querySelector("#news");
}




async function getAirQualityWaqiByCity(city) {
    const waqiApiUrl = `https://api.waqi.info/feed/${city}/?token=3b8806c72731ee60ba006ae04427193c7f28b9d4`;

    try {
        const response = await fetch(waqiApiUrl);
        const airQualityData = await response.json();

        // Get the HTML element by its ID
        const airQualityContainer = document.getElementById('air-quality-container');

        // Check if the API returned results
        if (response.ok) {
            // Update the content of the HTML element with air quality information
            airQualityContainer.innerHTML = `
                <h2>Air Quality Information</h2>
                <p>City: ${airQualityData.data.city.name}</p>
                <p>Air Quality Index (AQI): ${airQualityData.data.aqi}</p>
                <!-- Add more details as needed -->
            `;
        } else {
            console.error('Error fetching air quality data:', airQualityData);
        }
    } catch (error) {
        console.error('Error fetching air quality data:', error);
    }
}









async function checkWeather(city) {
    const response = await fetch(apiUrl + city);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {

        var data = await response.json();
        console.log(data);

        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: { lat: data.coord.lat, lng: data.coord.lon },
        });

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".coordinate").innerHTML = `${data.coord.lat}° ${data.coord.lon}°`;
        document.querySelector(".pressure").innerHTML=data.main.pressure;
        document.querySelector(".temperature").innerHTML=data.main.feels_like + "°c";
        document.querySelector(".code").innerHTML=data.cod +" ";
        document.querySelector(".rain").innerHTML = data.rain ? data.rain["3h"] + "mm" : "No rain data available";
        document.querySelector(".description").innerHTML=data.weather[0].description;
        document.querySelector(".temp-min-max").innerHTML=`${data.main.temp_min}°C ${data.main.temp_max}°C`;
        document.querySelector(".wind-direction").innerHTML=data.wind.deg;
        document.querySelector(".sunset-sunrise").innerHTML=`${data.sys.sunrise} ${data.sys.sunset}`;



        if (data.weather[0].main == "Clouds") {
            weatherIcon.sc = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.sc = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.sc = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document. querySelector(".error").style.display = "none";

        getNews(city);
        getAirQualityWaqiByCity(city);

    }
}


searchBtn.addEventListener("click",()=>{

    checkWeather(searchBox.value);
})





