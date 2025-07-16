const semestres = [
  { nombre: "01 SEMESTRE", ramos: [
    "Historia del Pensamiento Político y Teoría del Estado",
    "Fuentes, Proceso y Bienes en el Derecho Romano",
    "Historia del Derecho Antiguo y Medieval",
    "Fundamentos de Filosofía Práctica",
    "Introducción al Estudio del Derecho Positivo Chileno",
    "Taller de Memoria 1",
    "Inglés 1",
    "Antropología Cristiana"
  ]},
  { nombre: "02 SEMESTRE", ramos: [
    "Teoría de la Constitución e Historia Política y Constitucional de Chile",
    "Familia y Patrimonio en el Derecho Romano",
    "Historia del Derecho Moderno y Contemporáneo",
    "Teoría de la Normatividad",
    "Judicatura",
    "Inglés 2",
    "Ética Cristiana"
  ]},
  // Puedes seguir agregando más semestres aquí
];

function crearMalla() {
  const container = document.getElementById("malla-container");

  semestres.forEach((sem, idx) => {
    const div = document.createElement("div");
    div.classList.add("semestre");
    div.innerHTML = `<h2>${sem.nombre}</h2>`;
    div.id = `sem-${idx}`;

    sem.ramos.forEach((ramo, r) => {
      const ramoDiv = document.createElement("div");
      ramoDiv.classList.add("ramo");
      ramoDiv.draggable = true;
      ramoDiv.textContent = ramo;

      // Evento para marcar como aprobado
      ramoDiv.addEventListener("click", () => {
        ramoDiv.classList.toggle("aprobado");
      });

      // Drag and Drop
      ramoDiv.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", ramoDiv.outerHTML);
        ramoDiv.remove();
      });

      div.appendChild(ramoDiv);
    });

    // Permitir soltar
    div.addEventListener("dragover", (e) => e.preventDefault());
    div.addEventListener("drop", (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData("text/plain");
      const dropZone = e.target.closest(".semestre");
      if (dropZone) {
        dropZone.insertAdjacentHTML("beforeend", data);
        const nuevosRamos = dropZone.querySelectorAll(".ramo");
        nuevosRamos.forEach(ramo => {
          ramo.addEventListener("click", () => ramo.classList.toggle("aprobado"));
        });
      }
    });

    container.appendChild(div);
  });
}

crearMalla();
