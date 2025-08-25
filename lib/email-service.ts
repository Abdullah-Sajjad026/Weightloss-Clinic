import nodemailer from 'nodemailer';
import { CartItem } from '@/types/cart';

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Email template types
export interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  orderItems: Array<{
    productName: string;
    variant?: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    isPrescription: boolean;
  }>;
  prescriptionRequired: boolean;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
}

export interface StatusUpdateEmailData extends OrderEmailData {
  previousStatus: string;
  newStatus: string;
  statusNotes?: string;
  medicalReviewStatus?: string;
  medicalNotes?: string;
}

// Base email template wrapper
const createEmailTemplate = (content: string, title: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { font-size: 28px; margin-bottom: 5px; }
        .header p { opacity: 0.9; font-size: 16px; }
        .content { padding: 30px; }
        .order-info { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .order-number { font-size: 24px; font-weight: bold; color: #6366f1; margin-bottom: 10px; }
        .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .items-table th { background-color: #f1f5f9; padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0; }
        .items-table td { padding: 12px; border-bottom: 1px solid #e2e8f0; }
        .prescription-badge { background-color: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; }
        .status-badge { padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 500; text-transform: uppercase; }
        .status-pending { background-color: #fef3c7; color: #92400e; }
        .status-approved { background-color: #d1fae5; color: #065f46; }
        .status-shipped { background-color: #e0e7ff; color: #3730a3; }
        .status-delivered { background-color: #d1fae5; color: #065f46; }
        .total { font-size: 20px; font-weight: bold; text-align: right; margin-top: 20px; }
        .footer { background-color: #f1f5f9; padding: 30px; text-align: center; color: #6b7280; }
        .footer a { color: #6366f1; text-decoration: none; }
        .medical-notice { background-color: #fef7e7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
        .tracking-info { background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .button { display: inline-block; background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Northampton Weightloss (Powered by Regent Pharmacy)</h1>
            <p>Professional Weight Management Solutions</p>
        </div>
        
        ${content}
        
        <div class="footer">
            <p><strong>Need Help?</strong></p>
            <p>Contact us at <a href="mailto:${process.env.ADMIN_EMAIL}">${process.env.ADMIN_EMAIL}</a></p>
            <p>Track your order: <a href="https://yourwebsite.com/orders/track">Track Order</a></p>
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
                Northampton Weightloss (Powered by Regent Pharmacy)<br>
                Professional Healthcare Services<br>
                United Kingdom
            </p>
        </div>
    </div>
</body>
</html>
`;

// Order confirmation email template
export const createOrderConfirmationEmail = (data: OrderEmailData) => {
  const itemsHtml = data.orderItems.map(item => `
    <tr>
      <td>
        ${item.productName}
        ${item.variant ? `<br><small style="color: #6b7280;">${item.variant}</small>` : ''}
        ${item.isPrescription ? `<br><span class="prescription-badge">Prescription Required</span>` : ''}
      </td>
      <td style="text-align: center;">${item.quantity}</td>
      <td style="text-align: right;">£${item.unitPrice.toFixed(2)}</td>
      <td style="text-align: right; font-weight: 500;">£${item.totalPrice.toFixed(2)}</td>
    </tr>
  `).join('');

  const content = `
    <div class="content">
      <h2>Order Confirmation</h2>
      <p>Dear ${data.customerName},</p>
      <p>Thank you for your order! We've received your request and our team is processing it.</p>
      
      <div class="order-info">
        <div class="order-number">Order #${data.orderNumber}</div>
        <p>Order Date: ${new Date(data.createdAt).toLocaleDateString('en-GB', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
        <p>Order Total: <strong>£${data.totalAmount.toFixed(2)}</strong></p>
      </div>

      ${data.prescriptionRequired ? `
      <div class="medical-notice">
        <h3 style="color: #92400e; margin-bottom: 10px;">⚕️ Medical Review Required</h3>
        <p>Your order includes prescription medications. Our qualified medical team will review your order within 24 hours. You may be contacted if additional information is needed.</p>
      </div>
      ` : ''}

      <h3>Order Items</h3>
      <table class="items-table">
        <thead>
          <tr>
            <th>Product</th>
            <th style="text-align: center;">Quantity</th>
            <th style="text-align: right;">Unit Price</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      
      <div class="total">Total: £${data.totalAmount.toFixed(2)}</div>

      <h3>Shipping Address</h3>
      <p>
        ${data.shippingAddress.street}<br>
        ${data.shippingAddress.city}, ${data.shippingAddress.postalCode}<br>
        ${data.shippingAddress.country}
      </p>

      <h3>What's Next?</h3>
      <ol style="margin: 20px 0; padding-left: 20px;">
        ${data.prescriptionRequired ? 
          '<li>Medical Review (within 24 hours)</li>' : 
          '<li>Order Processing</li>'
        }
        <li>Preparation & Packaging</li>
        <li>Secure Delivery (2-3 working days)</li>
      </ol>

      <a href="https://yourwebsite.com/orders/track" class="button">Track Your Order</a>
    </div>
  `;

  return createEmailTemplate(content, 'Order Confirmation');
};

// Medical review status email
export const createMedicalReviewEmail = (data: StatusUpdateEmailData) => {
  const isApproved = data.medicalReviewStatus === 'APPROVED';
  const isRejected = data.medicalReviewStatus === 'REJECTED';
  
  const content = `
    <div class="content">
      <h2>Medical Review ${isApproved ? 'Approved' : isRejected ? 'Update' : 'Status'}</h2>
      <p>Dear ${data.customerName},</p>
      
      <div class="order-info">
        <div class="order-number">Order #${data.orderNumber}</div>
        <span class="status-badge ${isApproved ? 'status-approved' : isRejected ? 'status-pending' : 'status-pending'}">
          ${data.medicalReviewStatus?.replace('_', ' ')}
        </span>
      </div>

      ${isApproved ? `
        <p>Great news! Your order has been medically approved and is now ready for processing.</p>
        <div style="background-color: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #065f46;">✅ Order Approved</h3>
          <p style="color: #065f46;">Your prescription medication order has been reviewed and approved by our medical team. We'll now prepare your order for dispatch.</p>
        </div>
      ` : isRejected ? `
        <p>After careful review, we're unable to approve your prescription medication order at this time.</p>
        <div style="background-color: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #991b1b;">Medical Review Status</h3>
          <p style="color: #991b1b;">Your order cannot be processed as prescribed. Please contact our medical team to discuss alternative options.</p>
        </div>
      ` : `
        <p>Your order is currently under medical review. Our qualified healthcare professionals are carefully evaluating your prescription requirements.</p>
      `}

      ${data.medicalNotes ? `
        <div class="medical-notice">
          <h3 style="color: #92400e;">Medical Team Notes:</h3>
          <p>${data.medicalNotes}</p>
        </div>
      ` : ''}

      ${!isRejected ? `
        <h3>Next Steps</h3>
        <p>${isApproved ? 
          'Your order will be processed and dispatched within 1-2 working days.' : 
          'We may contact you if additional information is required.'
        }</p>
        <a href="https://yourwebsite.com/orders/track" class="button">Track Your Order</a>
      ` : `
        <h3>Need Assistance?</h3>
        <p>Our medical team is available to discuss your order and explore alternative treatment options.</p>
        <a href="https://yourwebsite.com/contact" class="button">Contact Medical Team</a>
      `}
    </div>
  `;

  return createEmailTemplate(content, `Medical Review ${isApproved ? 'Approved' : 'Update'}`);
};

// Shipping notification email
export const createShippingNotificationEmail = (data: StatusUpdateEmailData) => {
  const content = `
    <div class="content">
      <h2>Order Shipped! 📦</h2>
      <p>Dear ${data.customerName},</p>
      <p>Great news! Your order has been dispatched and is on its way to you.</p>
      
      <div class="order-info">
        <div class="order-number">Order #${data.orderNumber}</div>
        <span class="status-badge status-shipped">Shipped</span>
      </div>

      ${data.trackingNumber ? `
      <div class="tracking-info">
        <h3>📍 Tracking Information</h3>
        <p><strong>Tracking Number:</strong> ${data.trackingNumber}</p>
        ${data.estimatedDelivery ? `<p><strong>Estimated Delivery:</strong> ${new Date(data.estimatedDelivery).toLocaleDateString('en-GB')}</p>` : ''}
        <p>Your package is securely packaged for discreet delivery.</p>
      </div>
      ` : ''}

      <h3>Delivery Information</h3>
      <p><strong>Delivering to:</strong></p>
      <p>
        ${data.shippingAddress.street}<br>
        ${data.shippingAddress.city}, ${data.shippingAddress.postalCode}<br>
        ${data.shippingAddress.country}
      </p>

      <h3>Important Notes</h3>
      <ul style="margin: 20px 0; padding-left: 20px;">
        <li>Please ensure someone is available to receive the delivery</li>
        <li>All medications are packaged discretely</li>
        <li>Signature may be required upon delivery</li>
        ${data.prescriptionRequired ? '<li>This package contains prescription medications</li>' : ''}
      </ul>

      <a href="https://yourwebsite.com/orders/track" class="button">Track Your Order</a>
    </div>
  `;

  return createEmailTemplate(content, 'Order Shipped');
};

// Delivery confirmation email
export const createDeliveryConfirmationEmail = (data: StatusUpdateEmailData) => {
  const content = `
    <div class="content">
      <h2>Order Delivered! ✅</h2>
      <p>Dear ${data.customerName},</p>
      <p>Your order has been successfully delivered. We hope you're satisfied with your purchase!</p>
      
      <div class="order-info">
        <div class="order-number">Order #${data.orderNumber}</div>
        <span class="status-badge status-delivered">Delivered</span>
      </div>

      <div style="background-color: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #065f46;">🎉 Order Complete</h3>
        <p style="color: #065f46;">Your order has been delivered successfully. Thank you for choosing Northampton Weightloss (Powered by Regent Pharmacy) for your weight management journey.</p>
      </div>

      <h3>Order Summary</h3>
      <p><strong>Order Total:</strong> £${data.totalAmount.toFixed(2)}</p>
      <p><strong>Items:</strong> ${data.orderItems.length} item${data.orderItems.length !== 1 ? 's' : ''}</p>

      <h3>Important Medication Information</h3>
      <ul style="margin: 20px 0; padding-left: 20px;">
        <li>Store medications as directed on packaging</li>
        <li>Follow prescribed dosage instructions carefully</li>
        <li>Contact our medical team if you have any concerns</li>
        <li>Keep medications out of reach of children</li>
      </ul>

      <h3>Need Support?</h3>
      <p>Our medical team is here to support your weight loss journey. If you have any questions about your medication or treatment, please don't hesitate to contact us.</p>

      <a href="https://yourwebsite.com/contact" class="button">Contact Support</a>
    </div>
  `;

  return createEmailTemplate(content, 'Order Delivered');
};

// Generic status update email
export const createStatusUpdateEmail = (data: StatusUpdateEmailData) => {
  const content = `
    <div class="content">
      <h2>Order Status Update</h2>
      <p>Dear ${data.customerName},</p>
      <p>Your order status has been updated.</p>
      
      <div class="order-info">
        <div class="order-number">Order #${data.orderNumber}</div>
        <p><strong>Status:</strong> ${data.newStatus.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}</p>
        ${data.statusNotes ? `<p><strong>Notes:</strong> ${data.statusNotes}</p>` : ''}
      </div>

      <a href="https://yourwebsite.com/orders/track" class="button">Track Your Order</a>
    </div>
  `;

  return createEmailTemplate(content, 'Order Status Update');
};

// Email sending functions
export const sendOrderConfirmationEmail = async (data: OrderEmailData) => {
  const htmlContent = createOrderConfirmationEmail(data);
  
  const mailOptions = {
    from: `"Northampton Weightloss (Powered by Regent Pharmacy)" <${process.env.GMAIL_USER}>`,
    to: data.customerEmail,
    subject: `Order Confirmation - ${data.orderNumber}`,
    html: htmlContent,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    return { success: false, error };
  }
};

export const sendMedicalReviewEmail = async (data: StatusUpdateEmailData) => {
  const htmlContent = createMedicalReviewEmail(data);
  
  const mailOptions = {
    from: `"Northampton Weightloss (Powered by Regent Pharmacy)" <${process.env.GMAIL_USER}>`,
    to: data.customerEmail,
    subject: `Medical Review ${data.medicalReviewStatus === 'APPROVED' ? 'Approved' : 'Update'} - ${data.orderNumber}`,
    html: htmlContent,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Medical review email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Failed to send medical review email:', error);
    return { success: false, error };
  }
};

export const sendShippingNotificationEmail = async (data: StatusUpdateEmailData) => {
  const htmlContent = createShippingNotificationEmail(data);
  
  const mailOptions = {
    from: `"Northampton Weightloss (Powered by Regent Pharmacy)" <${process.env.GMAIL_USER}>`,
    to: data.customerEmail,
    subject: `Order Shipped - ${data.orderNumber}`,
    html: htmlContent,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Shipping notification email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Failed to send shipping notification email:', error);
    return { success: false, error };
  }
};

export const sendDeliveryConfirmationEmail = async (data: StatusUpdateEmailData) => {
  const htmlContent = createDeliveryConfirmationEmail(data);
  
  const mailOptions = {
    from: `"Northampton Weightloss (Powered by Regent Pharmacy)" <${process.env.GMAIL_USER}>`,
    to: data.customerEmail,
    subject: `Order Delivered - ${data.orderNumber}`,
    html: htmlContent,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Delivery confirmation email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Failed to send delivery confirmation email:', error);
    return { success: false, error };
  }
};

export const sendStatusUpdateEmail = async (data: StatusUpdateEmailData) => {
  const htmlContent = createStatusUpdateEmail(data);
  
  const mailOptions = {
    from: `"Northampton Weightloss (Powered by Regent Pharmacy)" <${process.env.GMAIL_USER}>`,
    to: data.customerEmail,
    subject: `Order Update - ${data.orderNumber}`,
    html: htmlContent,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Status update email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Failed to send status update email:', error);
    return { success: false, error };
  }
};