export interface DebtCharge {
    name: string,
    description: string,
    amount: 0,
    status: number,
    paymentMethod: string,
    isDebtReminder: boolean,
    debtReminder: {
        duration: 0,
        startDate: Date,
        type: string
    },
    userId: string,
    type: string
}