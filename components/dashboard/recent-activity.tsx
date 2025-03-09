"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Award, Coins } from "lucide-react"

export function RecentActivity() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9 mr-4">
          <AvatarFallback className="bg-primary/10">
            <Coins className="h-4 w-4 text-primary" />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Daily Reward Claimed</p>
          <p className="text-sm text-muted-foreground">You claimed 10 KEY tokens</p>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">Just now</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9 mr-4">
          <AvatarFallback className="bg-primary/10">
            <Award className="h-4 w-4 text-primary" />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Achievement Unlocked</p>
          <p className="text-sm text-muted-foreground">First Steps: Complete the tutorial</p>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">2h ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9 mr-4">
          <AvatarFallback className="bg-primary/10">
            <Coins className="h-4 w-4 text-primary" />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Keys Tokenized</p>
          <p className="text-sm text-muted-foreground">You tokenized 5 in-game keys to KEY tokens</p>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">1d ago</div>
      </div>
    </div>
  )
}

