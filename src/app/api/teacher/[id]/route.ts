import prisma from "@/lib/prisma";
import { error, success } from "@/lib/response.helper";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } } | any
) => {
  const id = params?.id;
  if (!id) {
    return Response.json(error("Id missing!"), { status: 400 });
  }

  try {
    const teacher = await prisma.teacher.findFirst({
      where: { id },
    });

    if (!teacher) {
      return Response.json(error("Not Found!"), { status: 404 });
    }

    return Response.json(success(teacher));
  } catch (err) {
    console.error("Error fetching teacher:", err);
    return Response.json(error("Internal Server Error"), { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } } | any
) => {
  const id = params?.id;
  if (!id) {
    return Response.json(error("Id missing!"), { status: 400 });
  }

  try {
    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return Response.json(error("Request body is empty!"), { status: 400 });
    }

    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data,
    });

    delete updatedTeacher["password" as string];

    return Response.json(success(updatedTeacher));
  } catch (err) {
    console.error("Error updating Teacher:", err);
    //  (err.code === "P2025") {
    //       return Response.json(error("Teacher not found or update failed!"), {
    //         status: 404,
    //       });
    //     }

    // if
    return Response.json(error("Teacher not found or update failed!"), {
      status: 500,
    });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } } | any
) => {
  const id = params?.id;
  if (!id) {
    return Response.json(error("Id missing!"), { status: 400 });
  }

  try {
    const teacher = await prisma.teacher.findFirst({
      where: { id },
    });

    if (!teacher) {
      return Response.json(error("Not Found!"), { status: 404 });
    }

    await prisma.teacher.delete({
      where: {
        id: teacher.id,
      },
    });

    return Response.json(success(teacher, 200, "Teacher Removed Success"));
  } catch (err) {
    console.error("Error fetching teacher:", err);
    return Response.json(error("Internal Server Error"), { status: 500 });
  }
};
