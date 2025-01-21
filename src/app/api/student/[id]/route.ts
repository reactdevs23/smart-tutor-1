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
    const student = await prisma.student.findFirst({
      where: { id },
    });

    if (!student) {
      return Response.json(error("Not Found!"), { status: 404 });
    }

    return Response.json(success(student));
  } catch (err) {
    console.error("Error fetching student:", err);
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
    const data = await request?.json();

    console.log(data);

    if (!data || Object.keys(data).length === 0) {
      return Response.json(error("Request body is empty!"), { status: 400 });
    }

    const updatedStudent = await prisma.student.update({
      where: { id },
      data,
    });

    delete updatedStudent["password" as string];

    return Response.json(success(updatedStudent));
  } catch (err) {
    console.error("Error updating student:", err);

    if (err.code === "P2025") {
      return Response.json(error("Student not found or update failed!"), {
        status: 404,
      });
    }

    return Response.json(error("Internal Server Error"), { status: 500 });
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
    const student = await prisma.student.findFirst({
      where: { id },
    });

    if (!student) {
      return Response.json(error("Not Found!"), { status: 404 });
    }

    await prisma.student.delete({
      where: {
        id: student.id,
      },
    });

    return Response.json(success(student, 200, "Student Removed Success"));
  } catch (err) {
    console.error("Error fetching student:", err);
    return Response.json(error("Internal Server Error"), { status: 500 });
  }
};
