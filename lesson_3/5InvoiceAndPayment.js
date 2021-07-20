function createInvoice(services = {}) {
  return {
    phone: services.phone !== undefined ? services.phone : 3000,
    internet: services.internet !== undefined ? services.internet : 5500,
    payments: [],
    total: function() {
      return this.phone + this.internet;
    },
    addPayment: function(payment) {
      this.payments.push(payment);
    },
    addPayments: function(payments) {
      payments.forEach(payment => this.addPayment(payment));
    },
    amountDue: function() {
      let total = this.payments.reduce((sum, curr) => sum + curr.total(), 0);
      return this.total() - total;
    }
  };
}

function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
    total: function() {
      return this.amount ? this.amount : this.phone + this.internet;
    }
  };
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.total());
console.log(invoice.amountDue());       // this should return 0