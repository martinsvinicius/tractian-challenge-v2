import { FindCompanyByIdUseCase } from '@/core/application/companies/find-company-by-id.use-case'
import { container, ContainerRegistry } from '@/core/infra/container'
import { useQuery } from '@tanstack/react-query'

const useCase = container.get<FindCompanyByIdUseCase>(
  ContainerRegistry.FindCompanyByIdUseCase
)

export const useGetCompanyById = (id: number) => {
  return useQuery(['company', id], () => useCase.execute(id))
}
