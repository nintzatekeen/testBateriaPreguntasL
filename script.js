// Carga las preguntas desde el archivo preguntas.json
var QUESTIONS = [];

function shuffleArray(array) {
  // Crea una copia del array original
  var shuffledArray = array.slice(0);

  // Recorre el array desde el último elemento hasta el segundo
  for (var i = shuffledArray.length - 1; i > 0; i--) {
    // Genera un número aleatorio entre 0 y i
    var j = Math.floor(Math.random() * (i + 1));

    // Intercambia los elementos en las posiciones i y j
    var temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }

  return shuffledArray;
}

window.onload = () => {
  $.getJSON("preguntas.json", function (preguntas) {
    // Ordena las preguntas de forma aleatoria
    /*preguntas.sort(function() {
    return 0.5 - Math.random();
  });*/
    QUESTIONS = shuffleArray(preguntas);

    // Crea el HTML para cada pregunta
    var preguntasHtml = "";
      QUESTIONS.forEach(function (pregunta, indice) {
      preguntasHtml += '<div class="pregunta-container" id="wea-'+pregunta.id+'">';
      preguntasHtml +=
        "<h4>" + (indice + 1) + ". " + pregunta.pregunta + "</h4>";
      pregunta.respuestas.forEach(function (respuesta, ind) {
        preguntasHtml += '<div class="form-check">';
        preguntasHtml +=
          '<input class="form-check-input respuesta-input" data-num="' +
          pregunta.id +
          '" type="radio" name="pregunta-' +
          indice +
          '" id="pregunta-' +
          indice +
          "-" +
          ind +
          '" value="' +
          respuesta.texto +
          '">';
        preguntasHtml +=
          '<label class="form-check-label respuesta-label" for="pregunta-' +
          indice +
          "-" +
          ind +
          '">' +
          respuesta.texto +
          "</label>";
        preguntasHtml += "</div>";
      });
      preguntasHtml += "</div>";
    });

    // Agrega las preguntas al contenedor
    $("#preguntas-container").html(preguntasHtml);
  });

  $("#submit-btn").on("click", function () {
    
    var respuestasSeleccionadas = [];
    [...$("input:checked")].forEach((inp) => {
      respuestasSeleccionadas.push({ id: inp.dataset.num, resp: inp.value });
    });

      var puntaje = 0;

      // Compara las respuestas seleccionadas con las correctas
        QUESTIONS.forEach(function (pregunta) {
        let selec = respuestasSeleccionadas.filter((r) => r.id == pregunta.id)[0];
        let elemPreg = $("#wea-"+pregunta.id)[0];
        let elemPregH4 = elemPreg.querySelector("h4");
        if (
          selec &&
          selec.resp ==
            pregunta.respuestas.filter((resp) => resp.correcta)[0].texto
        ) {
          elemPregH4.style.color = "green";
          puntaje++;
        } else {
          elemPregH4.style.color = "red";
        }

        // pregunta.respuestas.forEach(function (respuesta) {
        //   if (respuesta.correcta && respuestasSeleccionadas.includes(respuesta.texto)) {
        //     puntaje++;
        //   } else if (!respuesta.correcta && respuestasSeleccionadas.includes(respuesta.texto)) {
        //     // puntaje--;
        //   }
        // });
      });

      // Muestra el puntaje en un alert
      alert("Obtuviste " + puntaje + " puntos de " + QUESTIONS.length);
  });
};
