import { UserGateway } from '@/core/domain/gateways/user.gateway'
import { User } from '@/core/domain/models/user'
import { AxiosInstance } from 'axios'

export class UserHttpGateway implements UserGateway {
  constructor(private http: AxiosInstance) {}

  async findUserById(id: number): Promise<User> {
    const { data } = await this.http.get<User>(`/users/${id}`)

    return data
  }

  async getUsers(): Promise<User[]> {
    const { data } = await this.http.get<User[]>('/users')

    return data
  }
}
