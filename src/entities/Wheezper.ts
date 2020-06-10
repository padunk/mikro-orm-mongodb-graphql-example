import { Entity, Property, ManyToOne, OneToMany, Collection } from "mikro-orm";
import { ObjectID } from "mongodb";
import { User, BaseEntity } from ".";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Wheezper extends BaseEntity {
  @Field()
  @Property()
  text!: string;

  @Field(() => [String])
  @Property()
  tag?: string[];

  @Field(() => [String])
  @Property()
  timeToLive!: number;

  @Field(() => [Wheezper])
  @OneToMany(
    () => Wheezper,
    (w) => w
  )
  threads? = new Collection<Wheezper>(this);

  @Field(() => User)
  @ManyToOne()
  owner!: User;

  @Field(() => Boolean)
  @Property()
  main_wheez!: boolean;

  @Field(() => String)
  @Property()
  main_wheez_id?: ObjectID;

  constructor(text: string, owner: User) {
    super();
    this.text = text;
    this.owner = owner;
  }
}
