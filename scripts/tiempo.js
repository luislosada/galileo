//let promesa=fetch(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=75e1a2b621msh0db007956fd515fp1720abjsn45f1ff299af0`);
let getData = (city) => {
  //let promesa = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=477d915fc69ba945df49fb7d329449ad`);
  //https://openweathermap.org/weather-conditions#How-to-get-icon-URL
  //++++++let promesa = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=sp&APPID=477d915fc69ba945df49fb7d329449ad`);
  //Contrastamos la info introducida x teclado con el fichero de ciudades json
  let ciudadesUnicas;
  let idBuscado;
  let promesa2 = fetch(`./sources/city.list.json`);
  promesa2.then(correcta2).then(tratamiento2);
  promesa2.catch(() => console.log("error"));
    function correcta2(respuesta) {
      console.log("LA RESPUESTA ES");
      console.log(respuesta);
      console.log("MODIFICANDO LA RESPUESTA");
      console.log(respuesta.status);
      if (respuesta.status !== 200) {
        console.log("CIUDAD NO ENCONTRADA");
      }

      return respuesta.json();
    }
          function tratamiento2(respuesta) {
            //tratamientod de los datos recibidos
            console.log("TRATAMIENTO LECTURA FICHERO JSON");
            let cityMatches = [];
            respuesta.forEach((ciudad) => {
              if (!cityMatches.includes(ciudad.name) && ciudad.name == city) {
                cityMatches.push(ciudad);
              }
            });
            console.log("Ciudades Encontradas ");
            console.log(cityMatches);
            let cityMatchesUnique = [];
            let paisesAnadidos = [];
            cityMatches.forEach((item, i) => {
              if (i == 0) {
                paisesAnadidos.push(item.country);
                cityMatchesUnique.push(cityMatches[i]);
              } else {
                if (!paisesAnadidos.includes(item.country)) {
                  cityMatchesUnique.push(item);
                  console.log("añadido al array de ciudades unicas");
                  console.log("añadido al array de paises unicos");
                  paisesAnadidos.push(item.country);
                }
              }
            });
            console.log("PAISES AÑADIIDOS");
            console.log(paisesAnadidos);
            console.log(cityMatchesUnique);
            cityMatchesUnique.sort();
            ciudadesUnicas=cityMatchesUnique;
            //que cargue el select cuando se haya encontrado 1 o + ciudades
            if(ciudadesUnicas.length>0){
              cargarSelect();
              getOptions();

            }else{
              console.log("CIUDAD NO ENCONTRADA");
            }
            
            console.log("FIN DE TRATAMIENTO2");
        }//fin de tratamiento2

        function cargarSelect() { 
          console.log("ENTRO EN CARGAr select")
          console.log(ciudadesUnicas); //ciudadesUnicas puede valer
          /*Array vacio si no encuentra ciudad,1 o n elementos*/ 
          let opcionesUsuario = document.getElementById("countries");
          $("#countries").html("");
          $("#countries").append("<select>");
          $("select").attr("id", "seleccion");
          //CARGAR SELECT
      
          let options = "";
          console.log($(ciudadesUnicas));
          $(ciudadesUnicas).each(function (i, el) {
            console.log(el);
            options += `<option value=${el.id}>${el.country}</option>`;
            console.log("vuelta");
          });
          $("select").append(options);
        }
   
    /*Metodo que gestiona el nº de options generados, */
    //0 options =>No se ha encontrado la ciudad
    //1 opcion =>Solo existe una ciudad con ese nombre =>que haga la busqueda sin seleccionarlo
    //N opciones =>Requiere una releccion

    function getOptions() {
      console.log("ENTRO EN getOPTIONS()");
      let tamanio = $("option").length;
      console.log("NUMERO DE OPTIONS " + tamanio);
      let key;

      if(tamanio == 1){
        console.log("SOLO UNA OPCION");
          console.log("Su valor es " + $("#seleccion").val());
          key = $("#seleccion").val();
          consultaAPI(key);;
      }
      else{
        //mas de una opcion
        console.log("ENTRO EN VARIAS OPCIONES");
        // Añadimos el primer item ("Seleccione una ciudad")
        $("#seleccion").prepend(
          "<option selected >Seleccione una ciudad</option>"
        );
        
        $("#seleccion").change(function () {
          let cityID = $("#seleccion").val();
          console.log("You have selected the country - " + cityID);
          key = $("#seleccion").val();
          console.log(key);
          consultaAPI(key);
        });
      }
      
      
    }
    function consultaAPI(cityID) {

    console.log("linea antes de llamar a promesa, CITYID VALE " + cityID);
    let promesa = fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&lang=sp&APPID=477d915fc69ba945df49fb7d329449ad`
    );

    promesa.then(correcta).then(tratamiento);
    promesa.catch(() => console.log("error"));
    function correcta(respuesta) {
      console.log("LA RESPUESTA ES");
      console.log(respuesta);
      console.log("MODIFICANDO LA RESPUESTA");
      console.log(respuesta.status);
      if (respuesta.status !== 200) {
        console.log("CIUDAD NO ENCONTRADA");
      }

      return respuesta.json();
    }
    function tratamiento(respuesta) {
      //tratamientod de los datos recibidos
      console.log(promesa);
      console.log(respuesta);
      let temperatura = respuesta.main.temp;
      let ciudad = respuesta.name;
      let pais = respuesta.sys.country;
      let temperaturaMin = respuesta.main.temp_min;
      let temperaturaMax = respuesta.main.temp_max;
      let estado = respuesta.weather[0].description;
      let latitud=respuesta.coord.lat;
      let longitud=respuesta.coord.lon;
      console.log("LATITUD");
      console.log(latitud)
      console.log("LONGITUD");
      console.log(longitud);

      let estadoIcon = respuesta.weather[0].icon;
      //pintar datos
      temperaturaValor.innerText = temperatura;
      ubicacionNombre.innerText = ciudad + ", " + pais;
      minValor.innerText = temperaturaMin;
      maxValor.innerText = temperaturaMax;
      estadoDescripcion.innerText = estado;

      estadoIcono.innerHTML = `<img src=https://openweathermap.org/img/w/${estadoIcon}.png>`;
      export { latitud, longitud };
    }
    }
  
  
  

  
};
window.onload = () => {
  let ciudadBuscada = document.querySelector("#txtCiudad").value;

  getData("Valladolid");
  txtCiudad.addEventListener("change", getDataUser);
  function getDataUser(evento) {
    let valor = evento.target.value;

    getData(valor);
  }

};
