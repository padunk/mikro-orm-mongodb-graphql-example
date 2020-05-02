import {
  MongoEntity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "mikro-orm";
import { ObjectType, Field } from "type-graphql";
import { ObjectID } from "mongodb";

@ObjectType()
export abstract class BaseEntity implements MongoEntity<BaseEntity> {
  @Field(() => String)
  @PrimaryKey()
  _id!: ObjectID;

  @Field()
  @SerializedPrimaryKey()
  id!: string;

  @Field(() => String)
  @Property()
  createdAt = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
