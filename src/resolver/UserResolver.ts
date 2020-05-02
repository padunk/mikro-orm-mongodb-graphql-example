import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../entities";
import { DI } from "../index";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return await DI.userRepo.findAll();
  }

  @Mutation(() => User)
  async addUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    try {
      const user = new User(email, password);
      await DI.userRepo.persistAndFlush(user);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
