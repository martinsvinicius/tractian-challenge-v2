import { User } from '../models/user'

export interface GetUsersParams {
  unitId?: number
}

export interface UserGateway {
  findUserById(id: number): Promise<User>
  getUsers(params?: GetUsersParams): Promise<User[]>
}
