'use client'

import { type FC } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IAuth } from '@/types/user'
import Link from 'next/link'
import { getEmailInitial } from '@/lib/utils'
import { logout } from '@/app/login/actions'

interface Props {
  auth: IAuth
}

const UserMenu: FC<Props> = ({ auth }) => {

  const handleLogout = async () => {
    await logout()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='shadow-md'>
          <AvatarImage src={auth.user.image} alt='User avatar' />
          <AvatarFallback>{getEmailInitial(auth.user.email)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href='/profile'>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem disabled>Billing</DropdownMenuItem>
        <DropdownMenuItem disabled>Subscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu;