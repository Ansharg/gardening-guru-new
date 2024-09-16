const nodemailer = require('nodemailer');

module.exports.SendEmail = async (email, subject, id, token) => {
    try {
        const verificationLink = `https://gardening-guru-new.onrender.com/user/verify/${id}/${token}`
        const transporter = nodemailer.createTransport({
            // host: "smtp.forwardemail.net",
            service: "gmail",
            // port: 465,
            // secure: true,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASSWORD,
            },
            authMethod: "PLAIN"
        });
        await transporter.sendMail({
            from: `Gardening Guru <noreply.gardeningguru@gmail.com>`,
            to: email,
            subject: subject,
            html: `
            <p>Hi,</p>
            <p>Welcome to Gardening Guru! We're excited to have you on board.</p>
            <p>To get started, please verify your account by clicking the link below:</p>
            <p><a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #55A05c; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
            <p>If you encounter any issues or have any questions, feel free to reach out to our support team at support.gardeningguru@gmail.com.</p>
            <p>Thank you for joining us!</p>
            <p>Best regards,</p>
            <p>Team Gardening Guru</p>
        `
        })
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
}