import prisma from "@/prisma/db";

export const getUserRole = async (id: string) => {
  try {
    const role = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        privilege: true,
      },
    });

    return role?.privilege;
  } catch (error: any) {
    console.error(`failed to get user role : ${error.message}`);
  }
};
