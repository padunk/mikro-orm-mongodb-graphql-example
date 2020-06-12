import { Entity, Property, ManyToOne, OneToMany, Collection } from "mikro-orm";
import { ObjectID } from "mongodb";
import { User, BaseEntity } from ".";
import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@Entity()
export class Wheezper extends BaseEntity {
  @Field()
  @Property()
  text!: string;

  @Field(() => [String], { nullable: true })
  @Property()
  tag?: string[];

  @Field(() => Number)
  @Property()
  time_to_live!: number;

  @Field(() => [Wheezper])
  @OneToMany(
    () => Wheezper,
    (w) => w
  )
  threads?: any = new Collection<Wheezper>(this);

  @Field(() => User)
  @ManyToOne()
  owner!: User;

  @Field(() => Boolean)
  @Property()
  have_thread?: boolean;

  @Field(() => String)
  @Property()
  thread_to_id?: ObjectID;

  constructor(
    text: string,
    owner: User,
    time_to_live: number,
    tag?: string[],
    thread_to_id?: ObjectID
  ) {
    super();
    this.text = text;
    this.owner = owner;
    this.time_to_live = time_to_live;
    this.tag = tag;
    this.thread_to_id = thread_to_id;
  }
}

@InputType()
export class AddWheezperInput implements Partial<Wheezper> {
  @Field()
  @Property()
  text!: string;

  @Field(() => String)
  @Property()
  owner!: User;

  @Field()
  @Property()
  time_to_live!: number;

  @Field(() => [String], { defaultValue: [], nullable: true })
  @Property()
  tag?: string[];

  @Field(() => String, { defaultValue: "", nullable: true })
  @Property()
  thread_to_id?: ObjectID;
}
