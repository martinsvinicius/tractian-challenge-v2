import { AssignAnUserModal } from '@/components/modals/AssignAnUserModal'
import { UserAvatar } from '@/components/UserAvatar'
import queryClient from '@/config/queryClient'
import { User } from '@/core/domain/models/user'
import { WorkOrder } from '@/core/domain/models/work-order'
import { useGetAssetById } from '@/hooks/useGetAssetById'
import { useGetUsersByIds } from '@/hooks/useGetUsersByIds'
import { useMutateWorkOrder } from '@/hooks/useMutateWorkOrder'
import { Avatar, Button, Progress, Tooltip, Typography } from 'antd'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { FiUserPlus } from 'react-icons/fi'

import styles from './styles.module.scss'

export interface WorkOrderCardProps {
  workOrder: WorkOrder
}

type TextType = 'secondary' | 'success' | 'warning' | 'danger'

const { Title, Text, Paragraph } = Typography

const priorityTextTypeMap = new Map<string, TextType>([
  ['low', 'secondary'],
  ['medium', 'warning'],
  ['high', 'danger']
])

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  return color
}

export function WorkOrderCard({ workOrder }: WorkOrderCardProps) {
  const [isAssignAnUserModalOpen, setIsAssignAnUserModalOpen] = useState(false)
  const { data: assetData } = useGetAssetById(workOrder.assetId)

  const contextQueryKey = `${workOrder.title.trim()}-assigned-users}`
  const { data: assignedUsersData } = useGetUsersByIds(
    workOrder.assignedUserIds,
    contextQueryKey
  )

  const workOrderMutation = useMutateWorkOrder()

  const toggleAssignAnUserModal = () => {
    setIsAssignAnUserModalOpen(!isAssignAnUserModalOpen)
  }

  const assignedUsers = useMemo(() => {
    if (!assignedUsersData) return []

    return assignedUsersData.map((user) => ({
      ...user,
      color: generateRandomColor()
    }))
  }, [assignedUsersData])

  const tasksProgress = useMemo(() => {
    if (!workOrder) return 0

    const { checklist } = workOrder

    const completedTasks = checklist.filter((task) => task.completed).length

    const percentage = (completedTasks / checklist.length) * 100

    return Math.round(percentage)
  }, [workOrder])

  const handleSelectUser = useCallback(
    (user: User) => {
      const { assignedUserIds } = workOrder

      const newAssignedUserIds = [...assignedUserIds, user.id]

      workOrderMutation.mutate({
        ...workOrder,
        assignedUserIds: newAssignedUserIds
      })

      queryClient.setQueryData(
        ['users', contextQueryKey],
        [...assignedUsersData!, user]
      )
    },
    [workOrder, workOrderMutation, assignedUsersData, contextQueryKey]
  )

  const alreadyAssignedUsersIds = useMemo(() => {
    if (!assignedUsersData) return []

    return assignedUsersData.map((user) => user.id)
  }, [assignedUsersData])

  return (
    <div className={styles.box}>
      <AssignAnUserModal
        isModalOpen={isAssignAnUserModalOpen}
        handleCancel={toggleAssignAnUserModal}
        handleOk={toggleAssignAnUserModal}
        alreadyAssignedUsersIds={alreadyAssignedUsersIds}
        onSelectUser={handleSelectUser}
      />
      <div className={styles.options}>
        <Tooltip title='Assign an user to work order'>
          <Button type='primary' onClick={toggleAssignAnUserModal}>
            <FiUserPlus />
          </Button>
        </Tooltip>
      </div>

      {assetData && (
        <Image
          src={assetData.image}
          alt={assetData.name}
          width={80}
          height={80}
          className={styles.assetImage}
        />
      )}
      <Title level={3} className={styles.orderTitle}>
        {workOrder.title}
      </Title>
      <Paragraph type='secondary'>{workOrder.description}</Paragraph>

      <div className={styles.checklist}>
        {workOrder.checklist.map((task, index) => (
          <Text
            key={`${task.task.trim()}-${index}`}
            className={styles.checklistItem}
          >
            •{' '}
            <Text
              className={styles.taskText}
              type={task.completed ? 'secondary' : undefined}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none'
              }}
            >
              {task.task}
            </Text>
          </Text>
        ))}
      </div>

      <div className={styles.progressContainer}>
        <Progress percent={tasksProgress} />
      </div>

      <div className={styles.additionalInfo}>
        <Text type='secondary' strong>
          Assigned to:
        </Text>
        <Avatar.Group>
          {assignedUsers?.map((user) => (
            <Tooltip key={user.id} title={user.name}>
              <UserAvatar style={{ backgroundColor: user.color }} user={user} />
            </Tooltip>
          ))}
        </Avatar.Group>
      </div>

      <div className={styles.additionalInfo}>
        <Text type='secondary' strong>
          Priority:
        </Text>
        <Text type={priorityTextTypeMap.get(workOrder.priority)}>
          {workOrder.priority.toUpperCase()}
        </Text>
      </div>
    </div>
  )
}
