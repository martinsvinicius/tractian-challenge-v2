import { useGetAssets } from '@/hooks/useGetAseets'
import { Select, SelectProps } from 'antd'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

import styles from '../page.module.scss'

export function SelectAsset() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { data: assetsData } = useGetAssets()

  const assetIdParam = searchParams.get('assetId')

  const selectOptions = useMemo<SelectProps['options']>(() => {
    if (!assetsData) return []

    const mappedAssets = assetsData.map((asset) => ({
      label: asset.name,
      value: asset.id
    }))

    return [
      {
        label: 'All',
        value: -1
      },
      ...mappedAssets
    ]
  }, [assetsData])

  const selectValue = useMemo<SelectProps['value']>(() => {
    if (!selectOptions?.length) return undefined

    if (assetIdParam) return +assetIdParam

    return selectOptions[0].value
  }, [assetIdParam, selectOptions])

  const handleOnChangeSelect = useCallback(
    (value: number) => {
      if (value === -1) {
        return router.push(pathname)
      }

      const params = new URLSearchParams(searchParams)
      params.set('assetId', value.toString())

      return router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams]
  )

  return (
    <Select
      id="select-asset"
      options={selectOptions}
      className={styles.select}
      value={selectValue}
      onChange={(value) => handleOnChangeSelect(value)}
    />
  )
}
