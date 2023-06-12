function Usuario(nombre, edad, telefono) {
  this.nombre = nombre;
  this.edad = edad;
  this.telefono = telefono;
}

function inicializarCancha() {
  const datosIniciales = {
    jugadores: []
  };

  sessionStorage.setItem('canchaData', JSON.stringify(datosIniciales));
}

function agregarJugador(nombre) {
  return new Promise((resolve, reject) => {
    const canchaData = JSON.parse(sessionStorage.getItem('canchaData'));

    if (canchaData.jugadores.length < 4) {
      canchaData.jugadores.push(nombre);
      sessionStorage.setItem('canchaData', JSON.stringify(canchaData));
      resolve(`Jugador ${nombre} agregado correctamente.`);
    } else {
      reject("El equipo ya está completo. No se pueden agregar más jugadores.");
    }
  });
}

function cambiarNombreJugador(posicion) {
  return new Promise((resolve, reject) => {
    const canchaData = JSON.parse(sessionStorage.getItem('canchaData'));

    if (posicion >= 1 && posicion <= 4) {
      const jugadorIndex = posicion - 1;
      const jugadorNombre = canchaData.jugadores[jugadorIndex];
      const nombreUsuario = sessionStorage.getItem('nombreUsuario');

      if (nombreUsuario) {
        canchaData.jugadores[jugadorIndex] = nombreUsuario;
        sessionStorage.setItem('canchaData', JSON.stringify(canchaData));
        resolve(`Nombre del jugador ${posicion} cambiado a ${nombreUsuario}.`);
      } else {
        reject("No se encontró nombre de usuario registrado.");
      }
    } else {
      reject("Posición de jugador inválida.");
    }
  });
}

function jugaNuevo() {
  const jugadorNuevo = document.getElementById("jugadorNuevo");
  jugadorNuevo.innerHTML = `
    <section class="sec2">
      <div class="div2">
        <h2>Registrate con NOSOTROS!</h2>
        <form onsubmit="registrarJugador(event)">
          <p>Nombre completo</p>
          <input type="text" id="nombreUsuario" placeholder="Mi nombre" required></input>
          <p>Categoría</p>
          <input type="number" id="edadUsuario" placeholder="Mi edad" required></input>
          <p>Número de teléfono</p>
          <input type="tel" id="telefonoUsuario" placeholder="ejemplo@hotmail.com" required></input><br>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </section>
  `;
  reiniciarDespuesDe15Segundos("jugadorNuevo");
}

function reiniciarDespuesDe15Segundos(elementId) {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    element.innerHTML = "";
  }, 15000);
}

function registrarJugador(event) {
  event.preventDefault();
  const nombreUsuario = document.getElementById("nombreUsuario").value;
  sessionStorage.setItem("nombreUsuario", nombreUsuario);

  const miElemento = document.getElementById("canchaPrueba");
  miElemento.innerHTML = `
    <button onclick="prueba1() ">Queres jugar con amigos</button>
  `;

}

function prueba1() {
  const prueba = document.getElementById("prueba");
  prueba.innerHTML = `
    <div class="rectangulo1">
      <button class="boton-esquina superior-izquierda" id="jugador1">Jugador 1</button>
      <button class="boton-esquina superior-derecha" id="jugador2">Jugador 2</button>
      <button class="boton-esquina inferior-izquierda" id="jugador3">Jugador 3</button>
      <button class="boton-esquina inferior-derecha" id="jugador4">Jugador 4</button>
      <div class="linea-horizontal"></div>
      <div class="linea-vertical"></div>
    </div>
  `;

  const nombreUsuario = sessionStorage.getItem("nombreUsuario");
  if (nombreUsuario) {
    const botonesJugador = document.getElementsByClassName("boton-esquina");
    for (let i = 0; i < botonesJugador.length; i++) {
      botonesJugador[i].addEventListener("click", function () {
        for (let j = 0; j < botonesJugador.length; j++) {
          if (j === i) {
            botonesJugador[j].innerHTML = nombreUsuario;
          } else {
            botonesJugador[j].disabled = true;
          }
        }
      });
    }
  }

  reiniciarDespuesDe15Segundos("prueba");
}

inicializarCancha();
