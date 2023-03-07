import { Asset } from '@/core/domain/models/asset'
import { formatTimestamp } from '@/utils/dateUtils'
import {
  Button,
  Col,
  Modal,
  Row,
  Timeline,
  TimelineItemProps,
  Typography
} from 'antd'
import { useMemo } from 'react'

import styles from './styles.module.scss'

export interface HealthHistoryModalProps {
  isModalOpen: boolean
  handleOk?: () => void
  handleCancel?: () => void
  asset: Asset
}

const colorsByHealthStatus: Record<string, string> = {
  inAlert: '#ff4d4f',
  unplannedStop: '#ff4d4f',
  plannedStop: '#faad14',
  inDowntime: '#faad14',
  inOperation: '#1890ff'
}

const labelsByHealthStatus: Record<string, string> = {
  inAlert: 'In Alert',
  unplannedStop: 'Unplanned Stop',
  inDowntime: 'In Downtime',
  inOperation: 'In Operation',
  plannedStop: 'Planned Stop'
}

const { Text } = Typography

export function AssetHealthHistoryModal({
  isModalOpen,
  handleOk,
  handleCancel,
  asset
}: HealthHistoryModalProps) {
  const mappedHealthHistory = useMemo<TimelineItemProps[]>(() => {
    return asset.healthHistory.map((history) => ({
      color: colorsByHealthStatus[history.status] || 'blue',
      children: (
        <Row gutter={[0, 16]}>
          <Col span={8}>
            <Text strong>
              {labelsByHealthStatus[history.status] || history.status}
            </Text>
          </Col>
          <Col>
            <Text>{formatTimestamp(history.timestamp)}</Text>
          </Col>
        </Row>
      )
    }))
  }, [asset])

  return (
    <Modal
      title={`${asset.name} - Health History`}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key='close' type='primary' onClick={handleCancel}>
          OK
        </Button>
      ]}
    >
      <div className={styles.content}>
        <Timeline items={mappedHealthHistory} />
      </div>
    </Modal>
  )
}
