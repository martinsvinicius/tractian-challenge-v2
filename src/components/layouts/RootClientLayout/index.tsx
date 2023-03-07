'use client'

import queryClient from '@/config/queryClient'
import {
  CheckOutlined,
  DashboardOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { QueryClientProvider } from '@tanstack/react-query'
import { Layout, Menu, MenuProps } from 'antd'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { MenuClickEventHandler } from 'rc-menu/lib/interface'
import { ReactNode, useCallback, useMemo } from 'react'

import styles from './styles.module.scss'

export type RootClientLayoutProps = {
  children: ReactNode
}

const { Sider, Content } = Layout

const siderMenuItems: Required<MenuProps>['items'] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard'
  },
  {
    key: 'assets',
    icon: <SettingOutlined />,
    label: 'Assets'
  },
  {
    key: 'orders',
    icon: <CheckOutlined />,
    label: 'Orders'
  }
]

export default function RootClientLayout({ children }: RootClientLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  const defaultSelectedKeys = useMemo(() => {
    if (pathname === '/') return ['dashboard']

    const selectedItem = siderMenuItems.find((item) =>
      pathname.includes(String(item?.key))
    )

    return selectedItem?.key ? [String(selectedItem.key)] : []
  }, [pathname])

  const handleOnClickMenuItem = useCallback<MenuClickEventHandler>(
    ({ key }) => {
      if (key === 'dashboard') return router.push('/')

      return router.push(`/${key}`)
    },
    [router]
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Layout className={styles.wrapper}>
        <Sider trigger={null} className={styles.sider}>
          <div className={styles.logo}>
            <Image
              src='assets/images/logo-tractian.svg'
              alt='Tractian Logo'
              width={145}
              height={70}
            />
          </div>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={defaultSelectedKeys}
            items={siderMenuItems}
            onClick={handleOnClickMenuItem}
          />
        </Sider>

        <Layout className='site-layout'>
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </Layout>
    </QueryClientProvider>
  )
}
