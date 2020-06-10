import { Entity, Collection, PrimaryKey } from "mikro-orm";
import { User } from "./User";
import { ObjectID } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class UserFriends {
  @PrimaryKey()
  _id!: ObjectID;

  @Field(() => [User])
  friends? = new Collection<User>(this);
}
