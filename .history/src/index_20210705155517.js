const search=document.getElementById('search');
const searchBtn=document.getElementById('searchBtn');
const getLocation=document.getElementById('getLocation');
const mapShow=document.getElementById('mapShow');

let autoComplete;
function initMap(){
    autoComplete=new google.maps.places.Autocomplete(
        search);
    autoComplete.addListener('place_changed',onPlaceChanged);

}
function onPlaceChanged(){
    var place =Autocomplete.getPlace();

    if(!place.geometry){
        search.placeholder="Enter a place";
    }
    else{
        document.getElementById('details').innerHTML=place.name;
    }
}



if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition,showError);
}
else{
    alert('Geolocation is not support! Get your current Position failure! Please try type in search box.');
}

function showPosition(Position){
    lat=Position.coords.latitude;
    lon=Position.coords.longitude;
    latlon=new google.maps.LatLng(lat,lon)
    mapShow.style.height='500px';
    mapShow.style.width='100%';

    var myOptions={
        center:latlon,
        zoom:14,

    }
    var map=new google.maps.Map(mapShow,myOptions);
    var marker=new google.maps.Marker({Position:latlon,map:map,title:"You are here!"})

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred."
                break;
        }
    }
}