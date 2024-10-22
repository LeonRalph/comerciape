const { spawn } = require('child_process');
const portfinder = require('portfinder');

// Busca un puerto disponible
portfinder.getPort((err, port) => {
  if (err) {
    console.error('No se pudo encontrar un puerto disponible:', err);
    process.exit(1);
  }

  // Ejecuta el comando para iniciar el servidor de React en el puerto encontrado
  const reactProcess = spawn('react-scripts', ['start', '--port', port], {
    stdio: 'inherit',
    shell: true,
  });

  reactProcess.on('exit', (code) => {
    console.log(`Servidor de React cerrado con código: ${code}`);
  });
});


