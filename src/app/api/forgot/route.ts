import getRandomSixDigit from '@/lib/code';
import { ROLES } from '@/lib/constant';
import sendMail from '@/lib/email';
import { ecryptPassword } from '@/lib/hash';
import prisma from '@/lib/prisma';
import { error, success } from '@/lib/response.helper';
import { webUrl } from '@/lib/verification';
import { NextRequest } from 'next/server';

const GET = async (request: NextRequest) => {
    let response = { is_valid: false };
    const token = await request.nextUrl.searchParams.get("token") as string;
    const code = await request.nextUrl.searchParams.get("code");
    const role = await request.nextUrl.searchParams.get("role") as string;
    const requestForgot = await prisma.resetPassword.findFirst({ where: { token, code: Number(code), role } });
    if (requestForgot) {
        response = { ...response, ...requestForgot };
        response.is_valid = true;
    }
    return Response.json(success(response));
}

const POST = async (request: any) => {
    const requestData = await request?.json();
    const { email, role } = requestData;
    const code = getRandomSixDigit();
    let user = role === ROLES.STUDENT ? await prisma.student.findFirst({ where: { email } }) : role === ROLES.TEACHER ? await prisma.teacher.findFirst({ where: { email } }) : await prisma.admin.findFirst({ where: { email } })
    if (!user) {
        return Response.json(error("Not Found!", 404));
    }

    let resetPasswordReq = await prisma.resetPassword.findFirst({
        where: {
            email, role
        }
    });

    if (!resetPasswordReq) {
        resetPasswordReq = await prisma.resetPassword.create({
            data: {
                email,
                role,
                code,
            }
        })
    }
    if (!resetPasswordReq) {
        return Response.json(error("Failed to Forgot password"));
    }

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
                    color: #4caf50;
                    font-size: 22px;
                    text-align: center;
                    font-weight: 600;
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
                    <h1>Verification Code</h1>
                </div>
                <div class="email-body">
                    <p>Hi,</p>
                    <p>
                    Thank you for request forgot password on our platform! Here your 6 digits verification code.
                    </p>
                    <div class="button-container">
                    <p class="verify-button">${resetPasswordReq.code}</p>
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

    await sendMail(resetPasswordReq.email as string, "Forgot password Verification code", template)

    return Response.json(success({ token: resetPasswordReq.token }));
}

const PATCH = async (request: any) => {
    try {
        const requestData = await request?.json();
        const { password, token, role } = requestData;

        const resetPasswordReq = await prisma.resetPassword.findFirst({
            where: {
                token, role
            }
        });

        if (!resetPasswordReq) {
            return Response.json(error("Failed to Forgot password"));
        }
        const hashedPassword = await ecryptPassword(password);

        let updatedUser: any = null;

        if (resetPasswordReq.role === ROLES.ADMIN) {
            const user = await prisma.admin.findFirst({ where: { email: resetPasswordReq.email as string } });
            if (!user) {
                return Response.json(error("Failed to Forgot password"));
            }

            updatedUser = await prisma.admin.update({ where: { id: user.id }, data: { password: hashedPassword } });
        }

        else if (resetPasswordReq.role === ROLES.STUDENT) {
            const user = await prisma.student.findFirst({ where: { email: resetPasswordReq.email as string } });
            if (!user) {
                return Response.json(error("Failed to Forgot password"));
            }

            updatedUser = await prisma.student.update({ where: { id: user.id }, data: { password: hashedPassword } });
        }

        else if (resetPasswordReq.role === ROLES.TEACHER) {
            const user = await prisma.teacher.findFirst({ where: { email: resetPasswordReq.email as string } });
            if (!user) {
                return Response.json(error("Failed to Forgot password"));
            }

            updatedUser = await prisma.teacher.update({ where: { id: user.id }, data: { password: hashedPassword } });
        }

        if (!updatedUser) {
            return Response.json(error("Failed to Forgot password"));
        }

        await prisma.resetPassword.delete({ where: { id: resetPasswordReq.id } });

        return Response.json(success("Password updated!"));
    } catch (error) {
        console.log("Forgot Password Error: ", error)
        return Response.json(error("Failed to Forgot password"));
    }
}

export { GET, POST, PATCH };
