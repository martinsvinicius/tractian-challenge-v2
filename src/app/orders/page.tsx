'use client'

import { useGetWorkOrders } from '@/hooks/useGetWorkOrders'
import { Typography } from 'antd'

import { useSearchParams } from 'next/navigation'
import { SelectAsset } from './components/SelectAsset'
import { WorkOrderCard } from './components/WorkOrderCard'

import styles from './page.module.scss'

const { Text } = Typography

export default function OrdersPage() {
  const searchParams = useSearchParams()
  const assetIdParam = searchParams.get('assetId')

  const { data: workOrders } = useGetWorkOrders({
    assetId: assetIdParam ? +assetIdParam : undefined
  })

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Text strong>Change Asset</Text>
        <SelectAsset />
      </div>

      <div className={styles.content}>
        {workOrders?.map((workOrder) => (
          <WorkOrderCard key={workOrder.id} workOrder={workOrder} />
        ))}
      </div>
    </main>
  )
}
