const os = require('os');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Email config
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Get network interfaces
const networkInterfaces = os.networkInterfaces();

let ipAddress = null; // Use null to indicate no IP has been found
let emailSent = false;

// Loop through each interface and find the first non-internal IPv4 address
for (const interfaceName in networkInterfaces) {
  const networkInterface = networkInterfaces[interfaceName];

  for (const alias of networkInterface) {
    // Check if it's an IPv4 address and not internal (i.e., not localhost)
    if (alias.family === 'IPv4' && !alias.internal) {
      ipAddress = alias.address; // Assign the IP address
      break; // Stop when the first valid IP is found
    }
  }
  if (ipAddress) break; // Exit outer loop if IP is found
}

// Ensure a valid IP address was found before proceeding
if (ipAddress) {
    if (!emailSent) {
        const mailOptions = {
          from: process.env.EMAIL_FROM,
          to: process.env.EMAIL_TO,
          subject: "Sandviken-app address",
          text: `Raspberry PI Entur-Sandviken, copy/paste the IP address in your browser: ${ipAddress}:3000`,
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email: ", error);
          } else {
            console.log("Email sent: ", info.response);
            emailSent = true; // Only set to true after a successful send
          }
        });
      }
    } else {
        console.error("No valid IP address found")
    }
    
 setInterval( () => {
    console.log("running")
 }, 86400000)

/**  
  setInterval(sendEmail, 86400000);
} else {
  console.error("No valid external IP address found");
}*/
