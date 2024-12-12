const cities = [
    {
        name: "Vijayawada",
        latitude: "16.5062",
        longitude: "80.6480",
        timeZoneId: "India/Vijayawada",
    },
    {
        name: "New York",
        latitude: "40.7128",
        longitude: "-74.0060",
        timeZoneId: "America/New_York",
    },
    {
        name: "London",
        latitude: "51.5074",
        longitude: "-0.1278",
        timeZoneId: "Europe/London",
    },
    {
        name: "Tokyo",
        latitude: "35.6895",
        longitude: "139.6917",
        timeZoneId: "Asia/Tokyo",
    },
];

const cityDropdown=document.getElementById('dropdowncity');

cities.forEach((city,index)=>{
    const option=document.createElement('option'); //create option tag dynamically
    option.value=index;//array index as value
    option.textContent=city.name;// create text contect for the option tag
    cityDropdown.appendChild(option); //added option tag to the select tag

})

const gettimebtn=document.getElementById('gettimebtn')

async function riseset(){
    const selectDate=document.getElementById('selectdate').value;
    
    const selectedIndex=cityDropdown.value;
    if(!selectedIndex){
        alert('please select an option')
    }
    const city=cities[selectedIndex]
    if(!selectDate){
        alert('please select an date')
    }
    const url=`https://sunrise-sunset-times.p.rapidapi.com/getSunriseAndSunset?date=${selectDate}&latitude=${city.latitude}&longitude=${city.longitude}&timeZoneId=${encodeURIComponent(city.timeZoneId)}`
    try{
        const response=await fetch(url,{
            method:'GET',
            headers:{
                "x-rapidapi-host": "sunrise-sunset-times.p.rapidapi.com",
                "x-rapidapi-key": "d8ff32785emsh9b0cc62678baeacp1d91afjsn693817f0218d",
            },

        });

        if(!response.ok){
            throw new console.error('failed to fetch the data');
        }
        const data= await response.json();
        console.log(data);
        displayResult(city.name,selectDate,data);
    }
    catch(error){
        console.error(error);
        alert("error fetching data please try again")
    }
}

gettimebtn.addEventListener('click',riseset);

function displayResult(cityName,date,results){
    const sunrise=results.sunrise.split('[')[0];//split the number
    //console.log(sunrise);
    const sunriseTime=new Date(sunrise);
    const sunset=results.sunset.split('[')[0];
    //console.log(sunset);
    const sunsetime=new Date(sunset);

    const sunriseDiv=document.getElementById('sunrise');
    const sunsetDiv=document.getElementById('sunset');

    sunriseDiv.innerHTML=`<img src="./assets/images/sunrise.png" alt="sunrise">
    <h2>Sunrise  times for ${cityName} on ${date}</h2>
    <p><strong>Sunrise: </strong> ${sunriseTime.toLocaleString()}</p>`

    sunsetDiv.innerHTML=`<img src="./assets/images/sunset.png" alt="sunset">
    <h2>Sunset  times for ${cityName} on ${date}</h2>
    <p><strong>Sunrise: </strong> ${sunsetime.toLocaleString()}</p>`

    // resultDiv.innerHTML=`<h2>Sunrise and sunset times for ${cityName} on ${date}</h2>
    // <p><strong>Sunrise: </strong> ${sunriseTime.toLocaleString()}</p>
    // <p><strong>Sunset: </strong> ${sunsetime.toLocaleString()}</p>`;
}