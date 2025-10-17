import { Server as SocketServer } from 'socket.io'
import { Server as NetServer } from 'http'
import { prisma } from '@/lib/prisma'

import { Notification as PrismaNotification, NotificationType } from '@prisma/client'

export type { NotificationType }
export type Notification = PrismaNotification

export interface NotificationInput {
  id: string
  type: NotificationType
  message: string
  createdAt: Date
  userId?: string
  read: boolean
}

export class NotificationService {
  private io: SocketServer

  constructor(server: NetServer) {
    this.io = new SocketServer(server)

    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id)

      socket.on('join', (userId: string) => {
        socket.join(`user-${userId}`)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
      })
    })
  }

  async sendNotification(notification: Omit<NotificationInput, 'id' | 'createdAt' | 'read'>) {
    const dbNotification = await prisma.notification.create({
      data: {
        type: notification.type,
        message: notification.message,
        userId: notification.userId,
      }
    })

    if (notification.userId) {
      this.io.to(`user-${notification.userId}`).emit('notification', dbNotification)
    } else {
      this.io.emit('notification', dbNotification)
    }
    
    return dbNotification
  }
}