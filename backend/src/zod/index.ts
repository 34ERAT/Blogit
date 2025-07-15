import z from "zod";

export const signup = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(
    ({ password, confirmPassword: confirmpassword }) =>
      password == confirmpassword,
    {
      message: "password  don't match",
      path: ["confirmPassword"],
    },
  );
export const signin = z.object({
  userName: z.string().optional(),
  eMail: z.string().email().optional(),
  password: z.string(),
});
export const new_Blog = z.object({
  featuredImage: z.string(),
  title: z.string(),
  synopsis: z.string(),
  content: z.string(),
});
export const blogid = z.object({
  blogId: z.string().uuid(),
});
export const userid = z.string().uuid();
export const editblog = z.object({
  featuredImage: z.string().optional(),
  title: z.string().optional(),
  synopsis: z.string().optional(),
  content: z.string().optional(),
});
export const resetPassword = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword == data.confirmPassword, {
    message: "password  don't match",
    path: ["confirmPassword"],
  });
