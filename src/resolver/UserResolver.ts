import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../entities";
import { DI } from "../index";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return await DI.userRepo.findAll();
  }

  @Query(() => User)
  async userById(@Arg("id") id: string) {
    return await DI.userRepo.findOne({ id });
  }

  @Query(() => User)
  async userByName(@Arg("name") name: string) {
    return await DI.userRepo.findOne({ name });
  }

  @Query(() => User)
  async userByUserName(@Arg("username") username: string) {
    return await DI.userRepo.findOne({ user_name: username });
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
