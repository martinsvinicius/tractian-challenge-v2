import { CompanyGateway } from '@/core/domain/gateways/company.gateway'
import { Company } from '@/core/domain/models/company'

export class FindCompanyByIdUseCase {
  constructor(private companyGateway: CompanyGateway) {}

  async execute(id: number): Promise<Company> {
    return this.companyGateway.findCompanyById(id)
  }
}
