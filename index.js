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

var ipAdress = ""

// Loop through each interface and find the first non-internal IP address
for (const interfaceName in networkInterfaces) {
  const networkInterface = networkInterfaces[interfaceName];
  
  for (const alias of networkInterface) {
    // Check if it's an IPv4 address and not internal (i.e., not localhost)
    if (alias.family === 'IPv4' && !alias.internal) {
      ipAdress = `${alias.address}`
    }
  }
}


  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: "Sandviken-app address",
    text: `Raspberry PI Entur-Sandviken, copy/paste the IP address in your browser: ${ipAdress}:3000`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });



