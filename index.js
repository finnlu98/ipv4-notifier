const os = require('os');

// Get network interfaces
const networkInterfaces = os.networkInterfaces();

// Loop through each interface and find the first non-internal IP address
for (const interfaceName in networkInterfaces) {
  const networkInterface = networkInterfaces[interfaceName];
  
  for (const alias of networkInterface) {
    // Check if it's an IPv4 address and not internal (i.e., not localhost)
    if (alias.family === 'IPv4' && !alias.internal) {
      console.log(`IP Address: ${alias.address}`);
    }
  }
}
