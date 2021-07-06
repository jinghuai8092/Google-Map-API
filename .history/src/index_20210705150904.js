const search=document.getElementById('search');
const searchBtn=document.getElementById('searchBtn');
const getLocation=document.getElementById('getLocation');
const mapShow=document.getElementById('mapShow');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition,showError);
}
else{
    alert('Geolocation is not support! Get your current Position failure! Please try type in search box.');
    
}