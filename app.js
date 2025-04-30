// Inicializar el mapa
const map = L.map('map').setView([20, 0], 2); // Centrado global

// Agregar la capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Datos de ejemplo
const marcas = [
  {
    nombre: "Marca A",
    pais: "México",
    sector: "Tecnología",
    coords: [19.4326, -99.1332]
  },
  {
    nombre: "Marca B",
    pais: "Japón",
    sector: "Moda",
    coords: [35.6895, 139.6917]
  }
];

// Llenar el filtro
const sectorFilter = document.getElementById('sectorFilter');
const sectoresUnicos = [...new Set(marcas.map(m => m.sector))];
sectoresUnicos.forEach(sector => {
  const option = document.createElement('option');
  option.value = sector;
  option.textContent = sector;
  sectorFilter.appendChild(option);
});

// Mostrar marcas en el mapa
function mostrarMarcas(filtro = "") {
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  marcas.forEach(marca => {
    if (!filtro || marca.sector === filtro) {
      L.marker(marca.coords).addTo(map)
        .bindPopup(`<strong>${marca.nombre}</strong><br>${marca.pais}<br>${marca.sector}`);
    }
  });
}

// Filtro interactivo
sectorFilter.addEventListener('change', e => {
  mostrarMarcas(e.target.value);
});

// Mostrar todas al iniciar
mostrarMarcas();
