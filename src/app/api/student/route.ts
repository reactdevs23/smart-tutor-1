import prisma from "@/lib/prisma";
import { error, success } from "@/lib/response.helper";
import { NextRequest } from "next/server"

const GET = async (request: NextRequest) => {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
        return Response.json(error("Id missing!"))
    }

    const student = await prisma.student.findFirst({
        where: {
            id: id
        }
    });

    if (!student) {
        return Response.json(error("Not Found!"))
    }

    return Response.json(success(student))
}

export { GET }