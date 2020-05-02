import { Entity, OneToOne, OneToMany, Collection } from "mikro-orm";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class UserFriends extends BaseEntity {
  @OneToOne({ mappedBy: "friendsList" })
  user_id!: User;

  @OneToMany(
    () => User,
    (u) => u._id
  )
  friends_list = new Collection<User>(this);
}
