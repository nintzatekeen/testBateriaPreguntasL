// Carga las preguntas desde el archivo preguntas.json

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


$.getJSON('preguntas.json', function (preguntas) {

  // Ordena las preguntas de forma aleatoria
  /*preguntas.sort(function() {
    return 0.5 - Math.random();
  });*/
  preguntas = shuffleArray(preguntas);


  // Crea el HTML para cada pregunta
  var preguntasHtml = '';
  preguntas.forEach(function (pregunta, indice) {
    preguntasHtml += '<div class="pregunta-container">';
    preguntasHtml += '<h4>' + (indice + 1) + '. ' + pregunta.pregunta + '</h4>';
    pregunta.respuestas.forEach(function (respuesta, ind) {
      preguntasHtml += '<div class="form-check">';
      preguntasHtml += '<input class="form-check-input respuesta-input" type="radio" name="pregunta-' + indice + '" id="pregunta-' + ind + '-' + respuesta.texto + '" value="' + respuesta.texto + '">';
      preguntasHtml += '<label class="form-check-label respuesta-label" for="pregunta-' + ind + '-' + respuesta.texto + '">' + respuesta.texto + '</label>';
      preguntasHtml += '</div>';
    });
    preguntasHtml += '</div>';
  });

  // Agrega las preguntas al contenedor
  $('#preguntas-container').html(preguntasHtml);

});

// Maneja el evento del botón de enviar respuestas
$('#submit-btn').on('click', function () {

  // Obtiene las respuestas seleccionadas por el usuario
  var respuestasSeleccionadas = $('input:checked').map(function () {
    return $(this).val();
  }).get();

  // Carga las preguntas desde el archivo preguntas.json
  $.getJSON('preguntas.json', function (preguntas) {

    var puntaje = 0;

    // Compara las respuestas seleccionadas con las correctas
    preguntas.forEach(function (pregunta) {
      pregunta.respuestas.forEach(function (respuesta) {
        if (respuesta.correcta && respuestasSeleccionadas.includes(respuesta.texto)) {
          puntaje++;
        } else if (!respuesta.correcta && respuestasSeleccionadas.includes(respuesta.texto)) {
          puntaje--;
        }
      });
    });

    // Muestra el puntaje en un alert
    alert('Obtuviste ' + puntaje + ' puntos de ' + preguntas.length);

  });

});
