import 'reflect-metadata'

import { Container } from 'inversify'
import { httpClient } from '../http'
import { AssetHttpGateway } from '../gateways/asset-http.gateway'
import { AxiosInstance } from 'axios'
import { GetAssetsUseCase } from '@/core/application/assets/get-assets.use-case'
import { AssetGateway } from '@/core/domain/gateways/asset.gateway'
import { WorkOrderHttpGateway } from '../gateways/work-order-http.gateway'
import { GetWorkOrdersUseCase } from '@/core/application/workOrders/get-work-orders.use-case'
import { WorkOrderGateway } from '@/core/domain/gateways/work-order.gateway'
import { GetWorkOrdersMetricsUseCase } from '@/core/application/workOrders/get-work-orders-metrics.use-case'
import { GetAssetsStatusMetricsUseCase } from '@/core/application/assets/get-assets-status-metrics.use-case'
import { UnitHttpGateway } from '../gateways/unit-http.gateway'
import { GetUnitsUseCase } from '@/core/application/units/get-units.use-case'
import { UnitGateway } from '@/core/domain/gateways/unit.gateway'
import { UserHttpGateway } from '../gateways/user-http.gateway'
import { GetUsersUseCase } from '@/core/application/users/get-users.use-case'
import { UserGateway } from '@/core/domain/gateways/user.gateway'
import { CompanyGateway } from '@/core/domain/gateways/company.gateway'
import { FindCompanyByIdUseCase } from '@/core/application/companies/find-company-by-id.use-case'
import { FindUnitByIdUseCase } from '@/core/application/units/find-unit-by-ud.use-case'
import { CompanyHttpGateway } from '../gateways/company-http.gateway'
import { UpdateAssetUseCase } from '@/core/application/assets/update-asset.use-case'
import { GetUsersByAssetUseCase } from '@/core/application/users/get-users-by-asset.use-case'
import { FindAssetByIdUseCase } from '@/core/application/assets/find-asset-by-id.use-case'
import { GetUsersByIdsUseCase } from '@/core/application/users/get-users-by-ids.use-case'
import { UpdateWorkOrderUseCase } from '@/core/application/workOrders/update-work-orders.use-case'

export const ContainerRegistry = {
  AxiosAdapter: Symbol.for('AxiosAdapter'),

  AssetGateway: Symbol.for('AssetGateway'),
  WorkOrderGateway: Symbol.for('WorkOrderGateway'),
  UnitGateway: Symbol.for('UnitGateway'),
  UserGateway: Symbol.for('UserGateway'),
  CompanyGateway: Symbol.for('CompanyGateway'),

  GetAssetsUseCase: Symbol.for('GetAssetsUseCase'),
  GetAssetsStatusMetricsUseCase: Symbol.for('GetAssetsStatusMetricsUseCase'),
  UpdateAssetUseCase: Symbol.for('UpdateAssetUseCase'),
  FindAssetByIdUseCase: Symbol.for('FindAssetByIdUseCase'),

  GetWorkOrdersUseCase: Symbol.for('GetWorkOrdersUseCase'),
  GetWorkOrdersMetricsUseCase: Symbol.for('GetWorkOrdersMetricsUseCase'),
  UpdateWorkOrderUseCase: Symbol.for('UpdateWorkOrderUseCase'),

  GetUnitsUseCase: Symbol.for('GetUnitsUseCase'),
  FindUnitByIdUseCase: Symbol.for('FindUnitByIdUseCase'),

  GetUsersUseCase: Symbol.for('GetUsersUseCase'),
  GetUsersByAssetUseCase: Symbol.for('GetUsersByAssetUseCase'),
  GetUsersByIdsUseCase: Symbol.for('GetUsersByIdsUseCase'),

  FindCompanyByIdUseCase: Symbol.for('FindCompanyByIdUseCase')
}

export const container = new Container()

// HTTP Adapter
container.bind(ContainerRegistry.AxiosAdapter).toConstantValue(httpClient)

// Gateways
container.bind(ContainerRegistry.AssetGateway).toDynamicValue((context) => {
  const axiosAdapter = context.container.get<AxiosInstance>(
    ContainerRegistry.AxiosAdapter
  )
  return new AssetHttpGateway(axiosAdapter)
})

container.bind(ContainerRegistry.WorkOrderGateway).toDynamicValue((context) => {
  const axiosAdapter = context.container.get<AxiosInstance>(
    ContainerRegistry.AxiosAdapter
  )
  return new WorkOrderHttpGateway(axiosAdapter)
})

container.bind(ContainerRegistry.UnitGateway).toDynamicValue((context) => {
  const axiosAdapter = context.container.get<AxiosInstance>(
    ContainerRegistry.AxiosAdapter
  )

  return new UnitHttpGateway(axiosAdapter)
})

container.bind(ContainerRegistry.UserGateway).toDynamicValue((context) => {
  const axiosAdapter = context.container.get<AxiosInstance>(
    ContainerRegistry.AxiosAdapter
  )

  return new UserHttpGateway(axiosAdapter)
})

container.bind(ContainerRegistry.CompanyGateway).toDynamicValue((context) => {
  const axiosAdapter = context.container.get<AxiosInstance>(
    ContainerRegistry.AxiosAdapter
  )

  return new CompanyHttpGateway(axiosAdapter)
})

// Use Cases
container.bind(ContainerRegistry.GetAssetsUseCase).toDynamicValue((context) => {
  const assetGateway = context.container.get<AssetGateway>(
    ContainerRegistry.AssetGateway
  )
  return new GetAssetsUseCase(assetGateway)
})

container
  .bind(ContainerRegistry.GetAssetsStatusMetricsUseCase)
  .toDynamicValue((context) => {
    const assetGateway = context.container.get<AssetGateway>(
      ContainerRegistry.AssetGateway
    )
    return new GetAssetsStatusMetricsUseCase(assetGateway)
  })

container
  .bind(ContainerRegistry.UpdateAssetUseCase)
  .toDynamicValue((context) => {
    const assetGateway = context.container.get<AssetGateway>(
      ContainerRegistry.AssetGateway
    )

    return new UpdateAssetUseCase(assetGateway)
  })

container
  .bind(ContainerRegistry.FindAssetByIdUseCase)
  .toDynamicValue((context) => {
    const assetGateway = context.container.get<AssetGateway>(
      ContainerRegistry.AssetGateway
    )

    return new FindAssetByIdUseCase(assetGateway)
  })

container
  .bind(ContainerRegistry.GetWorkOrdersUseCase)
  .toDynamicValue((context) => {
    const workOrderGateway = context.container.get<WorkOrderGateway>(
      ContainerRegistry.WorkOrderGateway
    )
    return new GetWorkOrdersUseCase(workOrderGateway)
  })

container
  .bind(ContainerRegistry.GetWorkOrdersMetricsUseCase)
  .toDynamicValue((context) => {
    const workOrderGateway = context.container.get<WorkOrderGateway>(
      ContainerRegistry.WorkOrderGateway
    )
    return new GetWorkOrdersMetricsUseCase(workOrderGateway)
  })

container
  .bind(ContainerRegistry.UpdateWorkOrderUseCase)
  .toDynamicValue((context) => {
    const workOrderGateway = context.container.get<WorkOrderGateway>(
      ContainerRegistry.WorkOrderGateway
    )
    return new UpdateWorkOrderUseCase(workOrderGateway)
  })

container.bind(ContainerRegistry.GetUnitsUseCase).toDynamicValue((context) => {
  const unitGateway = context.container.get<UnitGateway>(
    ContainerRegistry.UnitGateway
  )
  return new GetUnitsUseCase(unitGateway)
})

container
  .bind(ContainerRegistry.FindUnitByIdUseCase)
  .toDynamicValue((context) => {
    const unitGateway = context.container.get<UnitGateway>(
      ContainerRegistry.UnitGateway
    )
    return new FindUnitByIdUseCase(unitGateway)
  })

container.bind(ContainerRegistry.GetUsersUseCase).toDynamicValue((context) => {
  const userGateway = context.container.get<UserGateway>(
    ContainerRegistry.UserGateway
  )
  return new GetUsersUseCase(userGateway)
})

container
  .bind(ContainerRegistry.GetUsersByAssetUseCase)
  .toDynamicValue((context) => {
    const userGateway = context.container.get<UserGateway>(
      ContainerRegistry.UserGateway
    )

    return new GetUsersByAssetUseCase(userGateway)
  })

container
  .bind(ContainerRegistry.GetUsersByIdsUseCase)
  .toDynamicValue((context) => {
    const userGateway = context.container.get<UserGateway>(
      ContainerRegistry.UserGateway
    )

    return new GetUsersByIdsUseCase(userGateway)
  })

container
  .bind(ContainerRegistry.FindCompanyByIdUseCase)
  .toDynamicValue((context) => {
    const companyGateway = context.container.get<CompanyGateway>(
      ContainerRegistry.CompanyGateway
    )
    return new FindCompanyByIdUseCase(companyGateway)
  })
