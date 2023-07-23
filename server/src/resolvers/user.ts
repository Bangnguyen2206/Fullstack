import {
  Ctx,
  Query,
  Resolver,
  UseMiddleware,
  Mutation,
  Arg,
} from 'type-graphql'
import { RegisterInput } from '../types/RegisterInput'
import { LoginInput } from '../types/LoginInput'
import { User } from '../entities/User'
import argon2 from 'argon2'
import { IMutationResponse } from '../types/MutationResponse'
import { UserMutationResponse } from '../types/UserMutationResponse'
import { createToken } from '../utils/Auth'

@Resolver()
export class UserResolver {
  @Query((_return) => [User])
  // Register
  @Mutation((_return) => UserMutationResponse)
  async register(
    @Arg('registerInput')
    registerInput: RegisterInput,
  ): Promise<UserMutationResponse> {
    const { username, password } = registerInput
    const existingUser = await User.findOne({ username: username })
    if (existingUser) {
      return {
        code: 400,
        success: false,
        message: 'Duplicated username',
      }
    }

    const hashedPassword = await argon2.hash(password)
    const newUser = await User.create({
      username,
      password: hashedPassword,
    })
    await newUser.save()
    return {
      code: 200,
      success: true,
      message: 'User registration successful',
      user: newUser,
    }
  }
  // Login
  @Mutation((_return) => UserMutationResponse)
  async login(
    @Arg('loginInput') { username, password }: LoginInput,
    @Ctx() { res }: any,
  ): Promise<UserMutationResponse> {
    const existingUser = await User.findOne({username})

    if (!existingUser) {
      return {
        code: 400,
        success: false,
        message: 'User not found',
      }
    }

    const isPasswordValid = await argon2.verify(existingUser.password, password)

    if (!isPasswordValid) {
      return {
        code: 400,
        success: false,
        message: 'Incorrect password',
      }
    }

    // sendRefreshToken(res, existingUser)

    return {
      code: 200,
      success: true,
      message: 'Logged in successfully',
      user: existingUser,
      accessToken: createToken('accessToken', existingUser),
    }
  }
}
