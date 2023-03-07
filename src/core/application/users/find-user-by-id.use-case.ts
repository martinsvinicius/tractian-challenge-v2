import { UserGateway } from '@/core/domain/gateways/user.gateway'
import { User } from '@/core/domain/models/user'

export class FindUserByIdUseCase {
  constructor(private userGateway: UserGateway) {}

  async execute(id: number): Promise<User> {
    return this.userGateway.findUserById(id)
  }
}
