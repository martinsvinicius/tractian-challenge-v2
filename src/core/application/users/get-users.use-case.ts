import {
  GetUsersParams,
  UserGateway
} from '@/core/domain/gateways/user.gateway'
import { User } from '@/core/domain/models/user'

export type GetUsersUseCaseParams = GetUsersParams

export class GetUsersUseCase {
  constructor(private userGateway: UserGateway) {}

  async execute(params?: GetUsersUseCaseParams): Promise<User[]> {
    const users = await this.userGateway.getUsers(params)

    return users
  }
}
