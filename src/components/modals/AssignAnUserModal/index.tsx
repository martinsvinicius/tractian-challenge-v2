import { UserCard } from '@/components/UserCard'
import { User } from '@/core/domain/models/user'
import { useGetUsers } from '@/hooks/useGetUsers'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Modal, Typography } from 'antd'
import { useMemo } from 'react'

const { Text } = Typography

import styles from './styles.module.scss'

export interface AssignAnUserModalProps {
  isModalOpen: boolean
  handleOk?: () => void
  handleCancel?: () => void
  onSelectUser?: (user: User) => void
  alreadyAssignedUsersIds?: number[]
}

export function AssignAnUserModal({
  isModalOpen,
  handleOk = () => {},
  handleCancel = () => {},
  onSelectUser = () => {},
  alreadyAssignedUsersIds
}: AssignAnUserModalProps) {
  const { data: allUsersData } = useGetUsers()

  const allUsers = useMemo(() => {
    if (!allUsersData) return []

    if (!!alreadyAssignedUsersIds?.length) {
      return allUsersData.filter(
        (user) => !alreadyAssignedUsersIds.includes(user.id)
      )
    }

    return allUsersData
  }, [allUsersData, alreadyAssignedUsersIds])

  const handleSelectUser = (user: User) => {
    onSelectUser(user)
    handleOk()
  }

  return (
    <Modal
      title='Choose an user'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <div className={styles.content}>
        {!allUsers.length && (
          <Text type='secondary'>There are no users available to assign</Text>
        )}
        {allUsers?.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            options={[
              {
                icon: <PlusCircleOutlined />,
                key: 'assign-user',
                onClick: () => handleSelectUser(user),
                tooltip: 'Assign user'
              }
            ]}
          />
        ))}
      </div>
    </Modal>
  )
}
