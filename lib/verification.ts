import sendMail from './email';
import { sign, verify } from './jwt';
import prisma from "./prisma";
export const webUrl = process.env.NEXTAUTH_URL;

export const requestVerification = async (role: string, email: string, user_id: string) => {
    try {
        let existingRequest = await prisma.verification.findFirst({ where: { user_id, email } });
        if (!existingRequest) {
            existingRequest = await prisma.verification.create({ data: { user_id, email, role } });
        }


        const token = await sign(existingRequest)

        const template =
            `
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .email-header {
                text-align: center;
                color: #333333;
            }
            .email-header h1 {
                margin: 0;
            }
            .email-body {
                margin-top: 20px;
                line-height: 1.6;
                color: #555555;
            }
            .email-body p {
                margin: 0 0 20px;
            }
            .email-body .ignore {
                text-align: center;
            }
            .button-container {
                text-align: center;
            }
            .button-container .ignore {
                margin-top: 20px;
            }
            .verify-button {
                display: inline-block;
                background-color: #4caf50;
                color: #ffffff !important;
                text-decoration: none;
                padding: 12px 25px;
                border-radius: 5px;
                font-weight: bold;
            }
            .email-footer {
                margin-top: 30px;
                text-align: center;
                font-size: 12px;
                color: #999999;
            }
            .email-footer a {
                color: #999999;
                text-decoration: none;
            }
            </style>
        </head>
        <body>
            <div class="email-container">
            <div class="email-header">
                <h1>Verify Your Email</h1>
            </div>
            <div class="email-body">
                <p>Hi,</p>
                <p>
                Thank you for signing up on our platform! Please confirm your email
                address to get started.
                </p>
                <div class="button-container">
                <a class="verify-button" href="${webUrl}/api/verification?user_id=${user_id}&token=${token}">Verify Email</a>
                <p class="ignore">
                    If you didn't request this, please ignore this email.
                </p>
                </div>
            </div>
            <div class="email-footer">
                <p>
                &copy; 2024
                <a href="${webUrl}" target="_blank"
                    >Smart Tutor</a
                >. All rights reserved.
                </p>
                <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
            </div>
            </div>
        </body>
        </html>
            
    `
        await sendMail(email, `Verification ${role?.toLowerCase()}`, template);
        return { verification_request: "success" }
    } catch (error) {
        console.log(error);
        return { verification_request: "failed" };

    }
}


export const requestVerify = async (token: string, user_id: string) => {
    const res = { verified: false }
    try {
        const { id, email, role }: any = await verify(token);
        const request = await prisma.verification.findFirst({ where: { user_id, id } });
        if (request) {
            res.verified = true;
            return { ...res, ...request };
        }
        return res
    } catch (error) {
        return res;
    }
}


export const removeRequest = async (email, user_id) => {
    const request = await prisma.verification.findFirst({ where: { email, user_id } });
    if (request)
        return await prisma.verification.delete({ where: { user_id, email, id: request.id } });
}