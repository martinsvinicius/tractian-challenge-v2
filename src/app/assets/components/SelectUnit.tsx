import { useGetUnits } from '@/hooks/useGetUnits'
import { Select, SelectProps } from 'antd'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

import styles from '../page.module.scss'

export function SelectUnit() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { data: unitsData } = useGetUnits()

  const unitIdParam = searchParams.get('unitId')

  const selectOptions = useMemo<SelectProps['options']>(() => {
    if (!unitsData) return []

    const mappedUnits = unitsData.map((unit) => ({
      label: unit.name,
      value: unit.id
    }))

    return [
      {
        label: 'All',
        value: -1
      },
      ...mappedUnits
    ]
  }, [unitsData])

  const selectValue = useMemo<SelectProps['value']>(() => {
    if (!selectOptions?.length) return undefined

    if (unitIdParam) return +unitIdParam

    return selectOptions[0].value
  }, [unitIdParam, selectOptions])

  const handleOnChangeSelect = useCallback(
    (value: number) => {
      if (value === -1) {
        return router.push(pathname)
      }

      const params = new URLSearchParams(searchParams)
      params.set('unitId', value.toString())

      return router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams]
  )

  return (
    <Select
      options={selectOptions}
      className={styles.select}
      value={selectValue}
      onChange={(value) => handleOnChangeSelect(value)}
    />
  )
}
