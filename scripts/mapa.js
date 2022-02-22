
export function generarMapa(latitud, longitud) {
  console.log("Entro en mapa.js");
console.log("El valor de latitud es "+latitud);
console.log("El valor de longitud es "+longitud);
console.log("Entro en la condicion (no undefined)")
  /**(ELIMINO EL MAPA ) */
  
  
    let map=null;
    console.log("El valor de map");
    console.log(map);
    console.log(typeof map);
   
  

     map= L.map("map").setView([latitud, longitud], 5);
     console.log(map);
     console.log(typeof map);

    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18,
    }).addTo(map);
    console.log(map);
    //añadiendo el marcador
    console.log('Añadimos marca')
    
    L.marker([latitud, longitud],{draggable: true}).addTo(map);
    return map;
}
