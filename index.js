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

function addAnimation(){
    document.querySelector('.loader').style.display = 'block';
    document.querySelector('.loader-container').classList.remove('invisible');
    document.querySelector('.loader-container').classList.add('visible');

}
function removeAnimation(){
    document.querySelector('.loader').style.display = 'block';
    document.querySelector('.loader-container').classList.add('invisible');
    document.querySelector('.loader-container').classList.remove('visible');
}
const gettimebtn=document.getElementById('gettimebtn')

async function riseset(){
    const selectDate=document.getElementById('selectdate').value;
    const checkingDate= new Date();
    const currentDate=checkingDate.toISOString().split('T')[0]
    
    
    const selectedIndex=cityDropdown.value;
    if(!selectedIndex){
        removeAnimation();
        alert('please select an option')
    }
    const city=cities[selectedIndex]
    if(!selectDate){
        removeAnimation();
        alert('please select an date')
    }
    if (selectDate>currentDate){
        removeAnimation();
        alert('your Date is should be less then or equals to today date')
        return
    }
    addAnimation();
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
        //console.log(data);
        displayResult(city.name,selectDate,data);
    }
    catch(error){
        console.error(error);
        alert("error fetching data please try again")
    }
    finally{
        removeAnimation();
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
    
    sunriseDiv.classList.add('sunrise-animate')
    sunsetDiv.classList.add('sunset-animate')

    sunriseDiv.innerHTML=
    `<img src="./assets/images/sunrise.png" alt="sunrise" loading='lazy'>
    <h2> ${cityName} </h2>
    <p><strong>SunRise: </strong> ${sunriseTime.toLocaleString()}</p>`

    sunsetDiv.innerHTML=
    `<img src="./assets/images/sunset.png" alt="sunset" loading='lazy'>
    <h2> ${cityName} </h2>
    <p><strong>SunSet: </strong> ${sunsetime.toLocaleString()}</p>`

    //Remove the animation classes after the animation ends
    sunriseDiv.addEventListener('animationend',()=>
    sunriseDiv.classList.remove('sunrise-animate'),
{true:true});  /*{true:once}:- when want to execute once the event function*/
    
     sunsetDiv.addEventListener('animationend',()=>sunsetDiv.classList.remove('sunset-animate'),
    {true:true});
}
