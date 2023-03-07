import { GetUsersByIdsUseCase } from '@/core/application/users/get-users-by-ids.use-case'
import { container, ContainerRegistry } from '@/core/infra/container'
import { useQuery } from '@tanstack/react-query'

const useCase = container.get<GetUsersByIdsUseCase>(
  ContainerRegistry.GetUsersByIdsUseCase
)

export const useGetUsersByIds = (ids: number[], contextKey?: string) => {
  return useQuery(['users', contextKey], () => useCase.execute(ids))
}
