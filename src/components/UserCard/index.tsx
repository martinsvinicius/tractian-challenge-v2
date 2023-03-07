import { User } from '@/core/domain/models/user'
import { useGetCompanyById } from '@/hooks/useGetCompanyById'
import { useGetUnitById } from '@/hooks/useGetUnitById'
import {
  Avatar,
  Button,
  Popconfirm,
  PopconfirmProps,
  Tooltip,
  Typography
} from 'antd'
import { ReactNode } from 'react'
import { UserAvatar } from '../UserAvatar'

import styles from './styles.module.scss'

const { Text } = Typography

export interface UserCardOptions {
  key: string
  icon: ReactNode
  onClick?: () => void
  isLoading?: boolean
  popconfirm?: PopconfirmProps
  tooltip?: string
}

export interface UserCardProps {
  user: User
  options?: UserCardOptions[]
}

export function UserCard({ user, options }: UserCardProps) {
  const { data: unitData } = useGetUnitById(user.unitId)
  const { data: companyData } = useGetCompanyById(user.companyId)

  return (
    <div key={user.id} className={styles.userCard}>
      <div>
        <UserAvatar size={50} user={user} />
        <div className={styles.userCardContent}>
          <div className={styles.userCardHeader}>
            <Text strong>{user.name}</Text>
            <Text type='secondary'>{user.email}</Text>
          </div>
          <div className={styles.userCardFooter}>
            <div>
              <Text strong>Unit: </Text>
              <Text type='secondary'>{unitData?.name}</Text>
            </div>

            <div>
              <Text strong>Company: </Text>
              <Text type='secondary'>{companyData?.name}</Text>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.options}>
        {options?.map((option) => {
          if (option.popconfirm) {
            return (
              <Popconfirm key={option.key} {...option.popconfirm}>
                <Button type='ghost' size='large' loading={option.isLoading}>
                  {!option.isLoading && option.icon}
                </Button>
              </Popconfirm>
            )
          }

          return (
            <Tooltip key={option.key} title={option.tooltip}>
              <Button
                type='ghost'
                size='large'
                loading={option.isLoading}
                onClick={option.onClick}
              >
                {!option.isLoading && option.icon}
              </Button>
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
}
