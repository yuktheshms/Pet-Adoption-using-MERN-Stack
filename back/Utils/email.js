const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: "hgabhishek441@gmail.com",
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return info; // You can return the info object if needed
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw error; // You may choose to throw the error to handle it elsewhere
  }
};

module.exports = sendEmail;
