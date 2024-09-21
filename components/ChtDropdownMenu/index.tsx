import React, { memo } from 'react'
import * as DropdownMenu from 'zeego/dropdown-menu'
import { Props } from './props'

export const ChtChatDrawerDropdownMenu = memo(({ trigger, items }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Content
        loop={false}
        alignOffset={0}
        avoidCollisions
        collisionPadding={0}
      >
        {items.map(({ key, title, icon, onPress }) => (
          <DropdownMenu.Item key={key} textValue={title} onSelect={onPress}>
            <DropdownMenu.ItemTitle>{title}</DropdownMenu.ItemTitle>
            icon && <DropdownMenu.ItemIcon>{icon}</DropdownMenu.ItemIcon>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
})

export type { Props as ChtChatDrawerDropdownMenuProps }
