declare module 'razorpay' {
  interface RazorpayOptions {
    key_id: string;
    key_secret: string;
  }

  interface RazorpayOrder {
    amount: number;
    currency: string;
    receipt: string;
    notes?: Record<string, any>;
  }

  interface RazorpayPayment {
    id: string;
    amount: number;
    currency: string;
    status: string;
    order_id: string;
    invoice_id: string | null;
    international: boolean;
    method: string;
    amount_refunded: number;
    refund_status: string | null;
    captured: boolean;
    description: string;
    card_id: string | null;
    bank: string | null;
    wallet: string | null;
    vpa: string | null;
    email: string;
    contact: string;
    notes: Record<string, any>;
    fee: number;
    tax: number;
    error_code: string | null;
    error_description: string | null;
    error_source: string | null;
    error_step: string | null;
    error_reason: string | null;
    created_at: number;
  }

  interface RazorpaySubscription {
    id: string;
    entity: string;
    plan_id: string;
    status: string;
    current_start: number | null;
    current_end: number | null;
    ended_at: number | null;
    quantity: number;
    notes: Record<string, any>;
    charge_at: number;
    start_at: number;
    end_at: number;
    auth_attempts: number;
    total_count: number;
    paid_count: number;
    customer_notify: boolean;
    created_at: number;
    expire_by: number;
    short_url: string;
    has_scheduled_changes: boolean;
    change_scheduled_at: number | null;
    source: string | null;
    offer_id: string | null;
    remaining_count: number;
  }

  interface RazorpayPlan {
    id: string;
    entity: string;
    interval: number;
    period: 'daily' | 'weekly' | 'monthly' | 'yearly';
    item: {
      name: string;
      amount: number;
      currency: string;
      description: string;
    };
    notes: Record<string, any>;
    created_at: number;
  }

  interface RazorpayCustomer {
    id: string;
    entity: string;
    name: string;
    email: string;
    contact: string;
    gstin: string | null;
    notes: Record<string, any>;
    created_at: number;
  }

  class Razorpay {
    constructor(options: RazorpayOptions);
    
    // Orders API
    orders: {
      create(order: RazorpayOrder): Promise<any>;
      fetch(orderId: string): Promise<any>;
      all(params?: any): Promise<any>;
      fetchPayments(orderId: string): Promise<any>;
      fetchTransferOrder(orderId: string): Promise<any>;
    };

    // Payments API
    payments: {
      capture(paymentId: string, amount: number, currency: string): Promise<any>;
      fetch(paymentId: string): Promise<RazorpayPayment>;
      all(params?: any): Promise<any>;
      refund(paymentId: string, amount?: number): Promise<any>;
      transfer(paymentId: string, transfers: any[]): Promise<any>;
      bankTransfer(paymentId: string): Promise<any>;
      fetchCardDetails(paymentId: string): Promise<any>;
      fetchPaymentDowntime(): Promise<any>;
      fetchPaymentDowntimeById(downtimeId: string): Promise<any>;
      fetchMultipleRefund(paymentId: string): Promise<any>;
      fetchRefund(paymentId: string, refundId: string): Promise<any>;
    };

    // Subscriptions API
    subscriptions: {
      create(params: any): Promise<RazorpaySubscription>;
      fetch(subscriptionId: string): Promise<RazorpaySubscription>;
      all(params?: any): Promise<any>;
      cancel(subscriptionId: string): Promise<any>;
      createAddon(subscriptionId: string, params: any): Promise<any>;
    };

    // Plans API
    plans: {
      create(params: any): Promise<RazorpayPlan>;
      fetch(planId: string): Promise<RazorpayPlan>;
      all(params?: any): Promise<any>;
    };

    // Customers API
    customers: {
      create(params: any): Promise<RazorpayCustomer>;
      fetch(customerId: string): Promise<RazorpayCustomer>;
      edit(customerId: string, params: any): Promise<any>;
      all(params?: any): Promise<any>;
    };

    // Invoices API
    invoices: {
      create(params: any): Promise<any>;
      fetch(invoiceId: string): Promise<any>;
      all(params?: any): Promise<any>;
      cancel(invoiceId: string): Promise<any>;
      issue(invoiceId: string): Promise<any>;
      delete(invoiceId: string): Promise<any>;
      notifyBy(invoiceId: string, medium: 'sms' | 'email'): Promise<any>;
    };

    // Refunds API
    refunds: {
      fetch(refundId: string): Promise<any>;
      all(params?: any): Promise<any>;
    };

    // Webhooks API
    webhooks: {
      all(params?: any): Promise<any>;
      fetch(webhookId: string): Promise<any>;
      create(params: any): Promise<any>;
      edit(webhookId: string, params: any): Promise<any>;
    };
  }

  export = Razorpay;
}
