import { Server as SocketServer } from 'socket.io'
import { Server as NetServer } from 'http'
import { prisma } from '@/lib/prisma'

export type NotificationType = 'ORDER' | 'SHIPPING' | 'SYSTEM'

export interface Notification {
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

  async sendNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) {
    const newNotification: Notification = {
      id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      read: false,
      ...notification,
    }

    if (notification.userId) {
      this.io.to(`user-${notification.userId}`).emit('notification', newNotification)
    } else {
      this.io.emit('notification', newNotification)
    }

    // Store notification in database
    await prisma.notification.create({
      data: {
        type: notification.type,
        message: notification.message,
        userId: notification.userId,
      }
    })

    return newNotification
  }
}