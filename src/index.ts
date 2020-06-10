import "dotenv/config";
import "reflect-metadata";
import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "type-graphql";
import cors from "cors";
import {
  MikroORM,
  EntityManager,
  EntityRepository,
  RequestContext,
} from "mikro-orm";
import { User, UserFriends, Wheezper, BaseEntity } from "./entities";
import { UserResolver } from "./resolver/UserResolver";
// import { Response, Request } from "express";

const PORT = process.env.PORT || 5000;

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  userRepo: EntityRepository<User>;
  userFriendsRepo: EntityRepository<UserFriends>;
  wheezRepo: EntityRepository<Wheezper>;
};

(async () => {
  const app = express();
  app.use(
    cors({
      origin: process.env.PORT || `http://localhost:5000`,
      credentials: true,
    })
  );
  app.use(express.json());

  app.get("/", (_, res) => {
    res.send("hello world");
  });

  DI.orm = await MikroORM.init({
    entities: [User, UserFriends, Wheezper, BaseEntity],
    entitiesDirsTs: ["src/entities"],
    dbName: `mikro-orm-graphql`,
    type: "mongo",
    debug: true,
    clientUrl: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds263078.mlab.com:63078/mikro-orm-graphql`,
    logger: console.log.bind(console),
  });

  DI.em = DI.orm.em;
  DI.userRepo = DI.orm.em.getRepository(User);
  DI.userFriendsRepo = DI.orm.em.getRepository(UserFriends);
  DI.wheezRepo = DI.orm.em.getRepository(Wheezper);
  app.use((_, __, next) => RequestContext.create(DI.orm.em, next));

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: await buildSchema({
        resolvers: [UserResolver],
      }),
      graphiql: true,
      pretty: true,
    })
  );

  app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
})();
