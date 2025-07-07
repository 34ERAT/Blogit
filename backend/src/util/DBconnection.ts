import { PrismaClient } from "@prisma/client";

class DBconnection extends PrismaClient {
  private static instance: DBconnection;
  private constructor() {
    super();
    this.shutdownHooks();
  }
  public static getConnection(): DBconnection {
    if (!DBconnection.instance) this.instance = new DBconnection();
    return DBconnection.instance;
  }
  private shutdownHooks() {
    const shutdown = async () => {
      console.log("closing connection ");
      await this.$disconnect();
      console.log("closing connection ");
    };
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  }
}
export default DBconnection.getConnection();
