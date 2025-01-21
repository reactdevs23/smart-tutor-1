import { ROLES } from '@/lib/constant';
import { comparePassword } from '@/lib/hash';
import { sign } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import { error, success } from '@/lib/response.helper';

const POST = async (request: any) => {
    const requestData = await request?.json();
    const { password, email } = requestData;
    const isExist = await prisma.student.findFirst({
        where: {
            email: email
        }
    });

    if (!isExist) {
        return Response.json(error("Email or password Did not matched!"));
    }

    const isMatched = await comparePassword(password, isExist.password);
    if (!isMatched) {
        return Response.json(error("Email or password Did not matched!"));
    }

    if (!isExist.is_verified) {
        return Response.json(error("Your are not verified."));
    }

    delete isExist['password' as string];
    const token = await sign(isExist);

    return Response.json(success({ ...isExist, token, role: ROLES.STUDENT }));
}

export { POST };
