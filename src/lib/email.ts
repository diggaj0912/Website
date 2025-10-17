import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set')
}

const resend = new Resend(process.env.RESEND_API_KEY)

import type { EmailData, OrderItem } from '@/types/email'

export class EmailService {
  private from = 'notifications@your-domain.com' // Update this with your verified domain

  async sendOrderConfirmation(to: string, orderNumber: string, items: OrderItem[]) {
    const subject = `Order Confirmation #${orderNumber}`
    const html = `
      <h1>Thank you for your order!</h1>
      <p>Your order #${orderNumber} has been confirmed.</p>
      <h2>Order Details:</h2>
      <ul>
        ${items.map(item => `
          <li>${item.quantity}x ${item.name} - $${item.price}</li>
        `).join('')}
      </ul>
    `

    return this.sendEmail({ to, subject, html })
  }

  async sendShippingUpdate(to: string, orderNumber: string, status: string, trackingNumber?: string) {
    const subject = `Shipping Update for Order #${orderNumber}`
    const html = `
      <h1>Shipping Update</h1>
      <p>Your order #${orderNumber} has been ${status}.</p>
      ${trackingNumber ? `<p>Tracking number: ${trackingNumber}</p>` : ''}
    `

    return this.sendEmail({ to, subject, html })
  }

  async sendPasswordReset(to: string, resetToken: string) {
    const subject = 'Password Reset Request'
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`
    const html = `
      <h1>Password Reset Request</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    `

    return this.sendEmail({ to, subject, html })
  }

  private async sendEmail({ to, subject, html }: EmailData) {
    try {
      const { data, error } = await resend.emails.send({
        from: this.from,
        to,
        subject,
        html
      })

      if (error) {
        throw new Error(error.message)
      }

      return { success: true, messageId: data?.id }
    } catch (error) {
      console.error('Failed to send email:', error)
      throw new Error('Failed to send email')
    }
  }
}