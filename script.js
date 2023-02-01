
const currentData = document.querySelector(".current-data");
const inputData = document.querySelector('.input-data')
const addressEl = document.getElementById('address-el')
const submitBtn = document.getElementById('submit-btn')


window.addEventListener('DOMContentLoaded', async function () {

    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        fetchTimeData(lat, long)

    })
})

submitBtn.addEventListener('click', async () => {
    const address = addressEl.value;
    if (address) {
        fetchAddressData(address)
    } else {
        let errorMsg = `<p class="error">Please enter a valid address!</p>`
        inputData.innerHTML = errorMsg;
    }
})




async function fetchTimeData(lat, long) {

    const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=55f07b2d1a704cbcb5b9c574b767ad10`);

    const locationResp = await response.json();
    locationData = locationResp.results[0];
    displayLocationData(locationData)


}


function displayLocationData(item) {
    let displayZoneData = `<p>Name Of Time Zone : ${item.timezone.name}</p>
    <p>Lat : ${item.lat}</p><p>Long : ${item.lon}</p>
    <p>Offset STD : ${item.timezone.offset_STD}</p>
    <p>Offset STD Seconds : ${item.timezone.offset_STD_seconds}</p>
    <p>Offset DST : ${item.timezone.offset_DST}</p>
    <p>Offset DST Seconds : ${item.timezone.offset_DST_seconds}</p>
    <p>Country : ${item.country}</p>
    <p>Postcode : ${item.postcode}</p>
    <p>City : ${item.city}</p>`

    currentData.innerHTML = displayZoneData;
}





async function fetchAddressData(address) {

    // const address = 'Carrer del Pintor Navarro Llorens, 7, 46008 València, Valencia, Spain';

    try {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=55f07b2d1a704cbcb5b9c574b767ad10`);

        const addressResp = await response.json();
        addressData = addressResp.features[0].properties;
        

        if (addressData) {
            displayAddressData(addressData)
        } else {
            throw new Error();
        }
    }
    catch (error) {
        let errorMsg = `<p class="error">Please enter a valid address!</p>`
        inputData.innerHTML = errorMsg;
    }

    // await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=55f07b2d1a704cbcb5b9c574b767ad10`)
    //     .then(resp => resp.json())
    //     .then((geocodingResult) => {
    //         console.log(geocodingResult);
    //     });
}


function displayAddressData(item) {
    let displayAddressData = `<h1 class="title">Your Result</h1><div class="inner-data">
    <p>Name Of Time Zone : ${item.timezone.name}</p>
    <p>Lat : ${item.lat}</p> <p>Long : ${item.lon}</p>
    <p>Offset STD : ${item.timezone.offset_STD}</p>
    <p>Offset STD Seconds : ${item.timezone.offset_STD_seconds}</p>
    <p>Offset DST : ${item.timezone.offset_DST}</p>
    <p>Offset DST Seconds : ${item.timezone.offset_DST_seconds}</p>
    <p>Country : ${item.country}</p>
    <p>Postcode : ${item.postcode}</p>
    <p>City : ${item.city}</p></div>`

    inputData.innerHTML = displayAddressData;
}
