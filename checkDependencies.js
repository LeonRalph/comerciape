const fs = require('fs');
const { exec } = require('child_process');

// Verifica si el directorio node_modules existe
if (!fs.existsSync('node_modules')) {
  console.log('Dependencias no encontradas. Instalando...');
  // Ejecuta npm install si no existe node_modules
  exec('npm install react-router-dom react-icons bootstrap jspdf express body-parser cors portfinder', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error al instalar las dependencias: ${err}`);
      return;
    }
    console.log('Dependencias instaladas correctamente.');
    console.log(stdout);
    console.error(stderr);
  });
} else {
  console.log('Las dependencias ya están instaladas.');
}