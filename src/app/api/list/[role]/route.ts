import { ROLES } from "@/lib/constant";
import prisma from "@/lib/prisma";
import { error, success } from "@/lib/response.helper";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { role: string } } | any
) => {
  const role = params?.role;
  let response: any[] = [];
  if (!role) {
    return Response.json(error("Role is missing!"), { status: 400 });
  }

  try {
    if (role === ROLES.STUDENT) {
      response = await prisma.student.findMany({
        where: { is_verified: true },
        select: {
          class: true,
          curriculum_type: true,
          description: true,
          email: true,
          id: true,
          name: true,
          profile_picture: true,
          subjects: true,
        },
      });
    } else if (role === ROLES.TEACHER) {
      response = await prisma.teacher.findMany({
        where: { is_verified: true },
        select: {
          curriculum_type: true,
          description: true,
          email: true,
          id: true,
          name: true,
          profile_picture: true,
          subjects: true,
          availibility: true,
          classes: true,
          salary: true,
        },
      });
    } else if (role === ROLES.ADMIN) {
      response = await prisma.admin.findMany({
        where: { is_verified: true },
        select: {
          description: true,
          email: true,
          id: true,
          name: true,
          profile_picture: true,
        },
      });
    }
    return Response.json(success(response));
  } catch (err) {
    console.error("Error fetching student:", err);
    return Response.json(success(response));
  }
};
