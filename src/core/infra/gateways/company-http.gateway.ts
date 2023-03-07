import { CompanyGateway } from '@/core/domain/gateways/company.gateway'
import { Company } from '@/core/domain/models/company'
import { AxiosInstance } from 'axios'

export class CompanyHttpGateway implements CompanyGateway {
  constructor(private http: AxiosInstance) {}

  async findCompanyById(id: number): Promise<Company> {
    const { data } = await this.http.get<Company>(`/companies/${id}`)

    return data
  }

  async getCompanies(): Promise<Company[]> {
    const { data } = await this.http.get<Company[]>('/companies')

    return data
  }
}
