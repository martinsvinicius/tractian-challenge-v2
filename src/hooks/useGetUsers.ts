import {
  GetUsersUseCase,
  GetUsersUseCaseParams
} from '@/core/application/users/get-users.use-case'
import { container, ContainerRegistry } from '@/core/infra/container'
import { useQuery } from '@tanstack/react-query'

const useCase = container.get<GetUsersUseCase>(
  ContainerRegistry.GetUsersUseCase
)

export const useGetUsers = (params?: GetUsersUseCaseParams) => {
  const paramsValues = params ? Object.values(params) : []

  return useQuery(['users', ...paramsValues], () => useCase.execute(params))
}
