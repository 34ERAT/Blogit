type User = {
  firstname: string;
  lastname: string;
};
export type NewBlog = {
  id?: string;
  featuredImage: string;
  title: string;
  synopsis: string;
  createdAt?: Date;
  updatedAt?: Date;
  User?: User;
  content?: string;
};

export type CreateBlog = {
  title: string;
  synopsis: string;
  content: string;
};
