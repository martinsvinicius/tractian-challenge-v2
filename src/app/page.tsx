'use client'

import { AssetsChart } from '@/components/charts/AssetsChart'
import { AssetsStatusChart } from '@/components/charts/AssetsStatusChart'
import { OrdersChart } from '@/components/charts/OrdersChart'

import styles from './page.module.scss'

export default function Home() {
  return (
    <main>
      <div className={styles.content}>
        <div className={styles.chart}>
          <AssetsChart />
        </div>

        <div className={styles.chart}>
          <AssetsStatusChart />
        </div>

        <div className={styles.chart}>
          <OrdersChart />
        </div>
      </div>
    </main>
  )
}
