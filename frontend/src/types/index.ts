type User = {
  firstname: string;
  lastname: string;
};
export type Blog = {
  id: string;
  featuredImage: string;
  title: string;
  synopsis: string;
  createdAt: Date;
  updatedAt: Date;
  User: User;
};
