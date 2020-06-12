import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { DI } from "../index";
// // import { wrap } from "mikro-orm";
import { Wheezper, AddWheezperInput } from "../entities";

@Resolver()
export class WheezperResolver {
  @Query(() => [Wheezper])
  async wheezpers() {
    return await DI.wheezRepo.findAll();
  }

  @Mutation(() => Wheezper)
  async addWheezper(
    @Arg("wheez")
    wheez: AddWheezperInput
  ) {
    try {
      const newWheez = new Wheezper(
        wheez.text,
        wheez.owner,
        wheez.time_to_live,
        wheez.tag,
        wheez.thread_to_id
      );
      await DI.wheezRepo.persistAndFlush(newWheez);
      return newWheez;
    } catch (error) {
      throw new Error(error);
    }
  }
}
