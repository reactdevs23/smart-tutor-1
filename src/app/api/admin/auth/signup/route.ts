import { ecryptPassword } from '@/lib/hash';
import prisma from '@/lib/prisma';
import { error, success } from '@/lib/response.helper';

const GET = (request: any) => {
    return Response.json({ success: true })
}

const POST = async (request: any) => {
    const requestData = await request?.json();
    const { password, email } = requestData;
    const isExistUser = await prisma.admin.findFirst({
        where: {
            email: email
        }
    });

    if (isExistUser) {
        return Response.json(error("Already Exist"));
    }

    const hashedPassword = await ecryptPassword(password);
    requestData.password = hashedPassword;
    const admin = await prisma.admin.create({ data: requestData });
    if (!admin) {
        Response.error();
    }

    delete admin['password' as string];
    return Response.json(success(admin));
}

export { GET, POST };