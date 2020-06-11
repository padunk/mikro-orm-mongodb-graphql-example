import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User, EditUserInput } from "../entities";
import { DI } from "../index";
import { wrap } from "mikro-orm";

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

  @Mutation(() => User)
  async editUserData(
    @Arg("id")
    id: string,
    @Arg("data")
    newUserData: EditUserInput
  ) {
    try {
      const user = await DI.userRepo.findOne(id);

      if (!user) {
        return {
          status: 404,
          message: "User not found",
        };
      }
      wrap(user).assign(newUserData);
      await DI.userRepo.persist(user);
      return user;
    } catch (error) {
      return {
        error,
        status: 404,
        message: "User not found",
      };
    }
  }
}
