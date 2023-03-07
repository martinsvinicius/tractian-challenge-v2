import { Asset } from '@/core/domain/models/asset'
import { Button, Modal } from 'antd'
import { MinusCircleOutlined } from '@ant-design/icons'
import { useMutateAsset } from '@/hooks/useMutateAsset'
import { User } from '@/core/domain/models/user'
import queryClient from '@/config/queryClient'
import { useCallback, useMemo, useState } from 'react'
import { AssignAnUserModal } from '../AssignAnUserModal'
import { UserCard } from '@/components/UserCard'
import { useGetUsersByAsset } from '@/hooks/useGetUsersByAsset'

import styles from './styles.module.scss'

export interface ManageAssignedUsersModalProps {
  isModalOpen: boolean
  handleOk?: () => void
  handleCancel?: () => void
  asset: Asset
}

export function AssetManageAssignedUsersModal({
  isModalOpen,
  handleCancel,
  asset
}: ManageAssignedUsersModalProps) {
  const [isAssignAnUserModalOpen, setIsAssignAnUserModalOpen] = useState(false)

  const { data: usersData } = useGetUsersByAsset(asset)

  const assetMutation = useMutateAsset()

  const alreadyAssignedUsersIds = useMemo(() => {
    if (!usersData) return []

    return usersData.map((user) => user.id)
  }, [usersData])

  const toggleAssignAnUserModal = () => {
    setIsAssignAnUserModalOpen(!isAssignAnUserModalOpen)
  }

  const handleUnassignUser = useCallback(
    (userToUnassing: User) => {
      const newUsers = asset.assignedUserIds.filter(
        (id) => id !== userToUnassing.id
      )

      const newAsset = {
        ...asset,
        assignedUserIds: newUsers
      }

      const filteredUsers = usersData?.filter(
        (user) => user.id !== userToUnassing.id
      )
      queryClient.setQueryData(['users', asset.id], filteredUsers)

      assetMutation.mutate(newAsset)
    },
    [asset, assetMutation, usersData]
  )

  const handleAssignUser = useCallback(
    (userToAssign: User) => {
      const newUsers = [...asset.assignedUserIds, userToAssign.id]

      const newAsset = {
        ...asset,
        assignedUserIds: newUsers
      }

      const newUsersData = [userToAssign, ...usersData!]

      queryClient.setQueryData(['users', asset.id], newUsersData)

      assetMutation.mutate(newAsset)
    },
    [asset, assetMutation, usersData]
  )

  return (
    <Modal
      title='Manage Assigned Users'
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key='back' onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key='assign' type='primary' onClick={toggleAssignAnUserModal}>
          + Assign an user
        </Button>
      ]}
    >
      <AssignAnUserModal
        isModalOpen={isAssignAnUserModalOpen}
        handleCancel={toggleAssignAnUserModal}
        handleOk={toggleAssignAnUserModal}
        alreadyAssignedUsersIds={alreadyAssignedUsersIds}
        onSelectUser={handleAssignUser}
      />
      <div className={styles.content}>
        {usersData?.map((user) => {
          return (
            <UserCard
              key={user.id}
              user={user}
              options={[
                {
                  icon: <MinusCircleOutlined />,
                  key: 'unassign-user',
                  popconfirm: {
                    title: 'Unassign the user',
                    description: 'Are you sure you want to unassign this user?',
                    onConfirm: () => handleUnassignUser(user),
                    okText: 'Yes',
                    cancelText: 'No'
                  },
                  isLoading: assetMutation.isLoading
                }
              ]}
            />
          )
        })}
      </div>
    </Modal>
  )
}
