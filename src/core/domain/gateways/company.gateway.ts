import { Company } from '../models/company'

export interface CompanyGateway {
  getCompanies(): Promise<Company[]>
  findCompanyById(id: number): Promise<Company>
}
