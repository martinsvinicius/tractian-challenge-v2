import { User } from '@/core/domain/models/user'
import { Avatar, AvatarProps } from 'antd'

export interface UserAvatarProps extends AvatarProps {
  user: User
}

const getNameAbbreviation = (name: string) => {
  const [firstName, lastName] = name.split(' ')

  return `${firstName[0]}${lastName[0]}`
}

export function UserAvatar({ user, ...rest }: UserAvatarProps) {
  return <Avatar {...rest}>{getNameAbbreviation(user.name)}</Avatar>
}
