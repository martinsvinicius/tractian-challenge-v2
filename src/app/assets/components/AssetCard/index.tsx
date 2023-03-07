import { Asset } from '@/core/domain/models/asset'
import { Badge, BadgeProps, Button, Progress, Tooltip, Typography } from 'antd'
import { HistoryOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { BsThermometerHalf } from 'react-icons/bs'
import { FcFlashOn } from 'react-icons/fc'
import { SlSpeedometer } from 'react-icons/sl'
import { FiUsers } from 'react-icons/fi'
import { memo, useState } from 'react'
import { AssetHealthHistoryModal } from '@/components/modals/AssetHealthHistoryModal'

import styles from './styles.module.scss'
import { AssetManageAssignedUsersModal } from '@/components/modals/AssetManageAssignedUsersModal'

interface AssetCardProps {
  asset: Asset
}

const { Text } = Typography

const badgeStatusMap: Record<string, BadgeProps['color']> = {
  inAlert: 'red',
  inDowntime: 'yellow',
  inOperation: 'green'
}

function AssetCardComponent({ asset }: AssetCardProps) {
  const [isHealthHistoryModalOpen, setIsHealthHistoryModalOpen] =
    useState(false)
  const [isManageAssignedUsersModalOpen, setIsManageAssignedUsersModalOpen] =
    useState(false)

  const toggleHealthHistoryModal = () => {
    setIsHealthHistoryModalOpen(!isHealthHistoryModalOpen)
  }

  const toggleManageAssignedUsersModal = () => {
    setIsManageAssignedUsersModalOpen(!isManageAssignedUsersModalOpen)
  }

  return (
    <div key={asset.id} className={styles.asset}>
      <AssetHealthHistoryModal
        isModalOpen={isHealthHistoryModalOpen}
        handleCancel={toggleHealthHistoryModal}
        handleOk={toggleHealthHistoryModal}
        asset={asset}
      />
      <AssetManageAssignedUsersModal
        isModalOpen={isManageAssignedUsersModalOpen}
        handleCancel={toggleManageAssignedUsersModal}
        asset={asset}
      />

      <Image
        src={asset.image}
        width={150}
        height={140}
        alt={asset.name}
        className={styles.assetImage}
      />

      <div className={styles.assetContent}>
        <div className={styles.assetHeader}>
          <div className={styles.assetHeaderContent}>
            <Text strong>{asset.name}</Text>
            <div className={styles.badges}>
              <Badge
                color={badgeStatusMap[asset.status]}
                count={asset.status.toUpperCase()}
              />
              <Badge color='blue' count={asset.model.toUpperCase()} />
            </div>
          </div>

          <div className={styles.options}>
            <Tooltip title='Health history'>
              <Button type='primary' onClick={toggleHealthHistoryModal}>
                <HistoryOutlined />
              </Button>
            </Tooltip>

            <Tooltip title='Manage users'>
              <Button type='primary' onClick={toggleManageAssignedUsersModal}>
                <FiUsers />
              </Button>
            </Tooltip>
          </div>
        </div>

        <div className={styles.assetFooter}>
          <div>
            <Text strong>Details</Text>
            <div className={styles.details}>
              {!!asset.specifications.maxTemp && (
                <div className={styles.detail}>
                  <BsThermometerHalf />
                  <Text>{asset.specifications.maxTemp} °C</Text>
                </div>
              )}
              {!!asset.specifications.power && (
                <div className={styles.detail}>
                  <FcFlashOn />
                  <Text>{asset.specifications.power} kWh</Text>
                </div>
              )}
              {!!asset.specifications.rpm && (
                <div className={styles.detail}>
                  <SlSpeedometer />
                  <Text className={styles.rpmText}>
                    {asset.specifications.rpm} RPM
                  </Text>
                </div>
              )}
            </div>
          </div>

          <Tooltip title='Health score'>
            <Progress type='circle' percent={asset.healthscore} size={60} />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export const AssetCard = memo(AssetCardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.asset, nextProps.asset)
})
