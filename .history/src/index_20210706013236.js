var search = document.getElementById('search');
var getLocation = document.getElementById('getLocation');
var mapShow = document.getElementById('mapShow');
var details = document.getElementById('details');
var locationAndTime = document.getElementById('locationAndTime');

var UTCTimestamp;
getUTCTimestamp();
function getUTCTimestamp() {
    var d = new Date();
    UTCTimestamp = (d.getTime() + d.getTimezoneOffset() * 60 * 1000);
    details.innerHTML = `${UTCTimestamp}`;
    setTimeout(getUTCTimestamp, 1000);
}



//autoComplete
// let autoComplete;
// var map
// function initMap() {
//     autoComplete = new google.maps.places.Autocomplete(
//         search);
//     autoComplete.addListener('place_changed', onPlaceChanged);

// }
// function onPlaceChanged() {
//     var place = autoComplete.getPlace();

//     if (!place.geometry) {
//         search.placeholder = "Enter a place";
//     }
//     else{
//         if(place!=undefined){
//             console.log('a');
//             details.innerHTML=place.name;
//         }
//         else{
//             console.log('b')
//             details.innerHTML='';
//         }

//     }
// }


function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else {
        alert('Geolocation is not support! Get your current Position failure! Please try type in search box.');
    }

}

//get your location
getLocation.onclick = function () {
    initMap();
}

var lat = 0; lon = 0;
//UTC to location time
function UTCtoLocationTime(utc_offset) {
    var UTC_Timestamp = parseInt(details.innerHTML);
    var locationTimestamp = UTC_Timestamp + utc_offset * 60 * 1000;
    var LD = new Date(locationTimestamp);
    return `${LD.getFullYear()}-${LD.getMonth() + 1 < 10 ? '0' + (LD.getMonth() + 1) : LD.getMonth() + 1}-${LD.getDate()} ${LD.getHours()}:${LD.getMinutes()}:${LD.getSeconds()}`
}

function showPosition(Position) {
    lat = Position.coords.latitude;
    lon = Position.coords.longitude;
    latlon = new google.maps.LatLng(lat, lon)
    mapShow.style.height = '500px';
    mapShow.style.width = '100%';

    var myOptions = {
        center: latlon,
        zoom: 14,

    }
    var map = new google.maps.Map(mapShow, myOptions);
    var marker = new google.maps.Marker({ Position: latlon, map: map, title: "You are here!" })


    var search = document.getElementById('search');
    var searchBox = new google.maps.places.SearchBox(search);

    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];

    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();
        //get the utc_offset time
        var name = places[0].name;
        var utc_offset = places[0].utc_offset_minutes;
        // console.log(utc_offset);
        // console.log(UTCtoLocationTime(utc_offset))
        locationAndTime.innerHTML = `The local time in ${name} is ${UTCtoLocationTime(utc_offset)}`;

        if (places.length == 0)
            return;

        markers.forEach(function (m) { m.setMap(null); });
        markers = [];

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (p) {
            if (!p.geometry)
                return;

            markers.push(new google.maps.Marker({
                map: map,
                title: p.name,
                position: p.geometry.location
            }));

            if (p.geometry.viewport)
                bounds.union(p.geometry.viewport);
            else
                bounds.extend(p.geometry.location);
        });

        map.fitBounds(bounds);
    });
}


function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}