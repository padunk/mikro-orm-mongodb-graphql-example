import { Entity, Property, OneToMany, Cascade, Collection } from "mikro-orm";
import { ObjectType, Field } from "type-graphql";
import { Wheezper, BaseEntity } from ".";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @Property()
  name?: string;

  @Field()
  @Property()
  user_name?: string;

  @Field()
  @Property()
  email!: string;

  @Field()
  @Property()
  password!: string;

  @Field()
  @Property()
  bio?: string;

  @Field()
  @Property()
  avatar?: string;

  @Field()
  @Property()
  website?: string;

  @Field(() => [Wheezper])
  @OneToMany(
    () => Wheezper,
    (w) => w.owner,
    { cascade: [Cascade.ALL], default: [] }
  )
  wheezpers = new Collection<Wheezper>(this);

  @Field()
  @Property()
  tokenVersion!: number;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }
}
