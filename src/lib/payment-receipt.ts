/**
 * Payment Receipt Generation
 * Creates printable receipts for transactions
 */

import { Transaction } from './transaction-history';
import { formatGHS } from './payments';
import { format } from 'date-fns';

export interface ReceiptData {
  receiptNumber: string;
  transaction: Transaction;
  date: string;
  amount: string;
  description: string;
  paymentMethod: string;
  status: string;
}

/**
 * Generate receipt data from transaction
 */
export function generateReceiptData(transaction: Transaction): ReceiptData {
  return {
    receiptNumber: transaction.id,
    transaction,
    date: format(new Date(transaction.timestamp), 'MMMM dd, yyyy HH:mm:ss'),
    amount: formatGHS(transaction.amount),
    description: transaction.description,
    paymentMethod: 'MTN Mobile Money',
    status: transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1),
  };
}

/**
 * Generate receipt HTML for printing
 */
export function generateReceiptHTML(receiptData: ReceiptData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Payment Receipt - ${receiptData.receiptNumber}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 40px;
      background: #f5f5f5;
    }
    .receipt {
      max-width: 500px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #e5e5e5;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #1e3a8a;
      margin-bottom: 10px;
    }
    .receipt-title {
      font-size: 18px;
      color: #666;
      margin-top: 10px;
    }
    .receipt-number {
      text-align: right;
      font-size: 12px;
      color: #999;
      margin-bottom: 20px;
    }
    .details {
      margin-bottom: 30px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .detail-label {
      font-weight: 600;
      color: #333;
    }
    .detail-value {
      color: #666;
      text-align: right;
    }
    .amount {
      font-size: 24px;
      font-weight: bold;
      color: #1e3a8a;
    }
    .status {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }
    .status.completed {
      background: #d1fae5;
      color: #065f46;
    }
    .status.failed {
      background: #fee2e2;
      color: #991b1b;
    }
    .status.pending {
      background: #fef3c7;
      color: #92400e;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e5e5e5;
      text-align: center;
      font-size: 12px;
      color: #999;
    }
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .receipt {
        box-shadow: none;
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <div class="logo">S24</div>
      <div class="receipt-title">Payment Receipt</div>
    </div>
    
    <div class="receipt-number">
      Receipt #: ${receiptData.receiptNumber}
    </div>
    
    <div class="details">
      <div class="detail-row">
        <span class="detail-label">Date</span>
        <span class="detail-value">${receiptData.date}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Description</span>
        <span class="detail-value">${receiptData.description}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Payment Method</span>
        <span class="detail-value">${receiptData.paymentMethod}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Transaction ID</span>
        <span class="detail-value" style="font-size: 11px;">${receiptData.transaction.transactionId}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Status</span>
        <span class="detail-value">
          <span class="status ${receiptData.status.toLowerCase()}">${receiptData.status}</span>
        </span>
      </div>
      <div class="detail-row" style="border-top: 2px solid #1e3a8a; margin-top: 20px; padding-top: 20px;">
        <span class="detail-label" style="font-size: 18px;">Amount</span>
        <span class="detail-value amount">${receiptData.amount}</span>
      </div>
    </div>
    
    <div class="footer">
      <p>Thank you for your purchase!</p>
      <p style="margin-top: 10px;">This is an automated receipt. No signature required.</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Open receipt in new window for printing
 */
export function printReceipt(transaction: Transaction): void {
  const receiptData = generateReceiptData(transaction);
  const html = generateReceiptHTML(receiptData);
  
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  }
}

