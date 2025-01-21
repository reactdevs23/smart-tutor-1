import { ROLES } from '@/lib/constant';
import { comparePassword } from '@/lib/hash';
import { sign } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import { error, success } from '@/lib/response.helper';

const POST = async (request: any) => {
    const requestData = await request?.json();
    const { password, email } = requestData;
    const isExistUser = await prisma.teacher.findFirst({
        where: {
            email: email
        }
    });

    if (!isExistUser) {
        return Response.json(error("Email or password Did not matched!"));
    }

    const isMatched = await comparePassword(password, isExistUser.password);
    if (!isMatched) {
        return Response.json(error("Email or password Did not matched!"));
    }

    if (!isExistUser.is_verified) {
        return Response.json(error("Your are not verified."));
    }

    delete isExistUser['password' as string];
    const token = await sign(isExistUser);

    return Response.json(success({ ...isExistUser, token, role: ROLES.TEACHER }));
}

export { POST };
