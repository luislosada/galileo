import {latitud,longitud} from './tiempo';
if(latitud!=undefined || latitud!=null){
    let map = L.map("map").setView([41.66, -4.72], 5);

    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18,
    }).addTo(map);
    //añadiendo el marcador
    
    L.marker([latitud, longitud],{draggable: true}).addTo(map);
}
