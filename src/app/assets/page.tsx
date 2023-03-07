'use client'

import { useGetAssets } from '@/hooks/useGetAseets'
import { Typography } from 'antd'

import { useSearchParams } from 'next/navigation'
import { AssetCard } from './components/AssetCard'
import { SelectUnit } from './components/SelectUnit'

import styles from './page.module.scss'

const { Text } = Typography

export default function AssetsPage() {
  const searchParams = useSearchParams()
  const unitIdParam = searchParams.get('unitId')

  const { data: assetsData } = useGetAssets({
    unitId: unitIdParam ? +unitIdParam : undefined
  })

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Text strong>Change Unit</Text>
        <SelectUnit />
      </div>

      <div className={styles.content}>
        {assetsData?.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </main>
  )
}
