import { UserGateway } from '@/core/domain/gateways/user.gateway'

export class GetUsersByIdsUseCase {
  constructor(private userGateway: UserGateway) {}

  async execute(ids: number[]) {
    const users = await this.userGateway.getUsers()

    return users.filter((user) => ids.includes(user.id))
  }
}
