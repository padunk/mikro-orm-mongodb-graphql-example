import { Entity, Property, OneToMany, Cascade, Collection } from "mikro-orm";
import { ObjectType, Field, InputType } from "type-graphql";
import { Wheezper, BaseEntity } from ".";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field({ nullable: true })
  @Property()
  name?: string;

  @Field({ nullable: true })
  @Property()
  user_name?: string;

  @Field()
  @Property()
  email!: string;

  @Field()
  @Property()
  password!: string;

  @Field({ nullable: true })
  @Property()
  bio?: string;

  @Field({ nullable: true })
  @Property()
  avatar?: string;

  @Field({ nullable: true })
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

@InputType()
export class EditUserInput implements Partial<User> {
  @Field({ nullable: true })
  @Property()
  name?: string;

  @Field({ nullable: true })
  @Property()
  username?: string;

  @Field({ nullable: true })
  @Property()
  email?: string;

  @Field({ nullable: true })
  @Property()
  password?: string;

  @Field({ nullable: true })
  @Property()
  bio?: string;

  @Field({ nullable: true })
  @Property()
  avatar?: string;

  @Field({ nullable: true })
  @Property()
  website?: string;

  constructor(
    name: string,
    username: string,
    email: string,
    password: string,
    bio: string,
    avatar: string,
    website: string
  ) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.bio = bio;
    this.avatar = avatar;
    this.website = website;
  }
}
