import { UserGateway } from '@/core/domain/gateways/user.gateway'
import { Asset } from '@/core/domain/models/asset'
import { User } from '@/core/domain/models/user'

export class GetUsersByAssetUseCase {
  constructor(private userGateway: UserGateway) {}

  async execute(asset: Asset): Promise<User[]> {
    const { assignedUserIds } = asset
    const users = await this.userGateway.getUsers()

    return users.filter((user) => assignedUserIds.includes(user.id))
  }
}
