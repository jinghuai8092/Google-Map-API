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



// if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(showPosition,showError);
// }
// else{
//     alert('Geolocation is not support! Get your current Position failure! Please try type in search box.');
// }

// function showPosition(Position){
//     lat=Position.coords.latitude;
//     lon=Position.coords.longitude;
//     latlon=new google.maps.LatLng(lat,lon)
// }