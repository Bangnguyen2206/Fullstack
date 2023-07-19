import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id!: number
  // @Unique(['email'])
  @Field()
  @Column({ unique: true })
  username!: string

  @Column()
  password!: string
}
