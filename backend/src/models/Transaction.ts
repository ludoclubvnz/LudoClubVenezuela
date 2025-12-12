import { Schema, model, Document, Types } from 'mongoose';

export interface ITransaction extends Document {
  user: Types.ObjectId;
  type: 'deposit' | 'withdrawal' | 'entry-fee' | 'refund';
  amount: number;
  currency: 'VES' | 'USD' | 'EUR';
  bcvRate?: number; // Store the BCV rate at the time of transaction
  status: 'pending' | 'completed' | 'rejected';
  game?: Types.ObjectId;
  details: {
    // Deposit details
    screenshotUrl?: string;
    fromBank?: string;
    fromAccountNumber?: string;
    // Withdrawal details
    toBank?: string;
    toPhoneNumber?: string;
    toVenezuelanId?: string;
    // Entry-fee details
    gameRoomCode?: string;
  };
  approvedBy?: Types.ObjectId; // Admin who approved the transaction
}

const transactionSchema = new Schema<ITransaction>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['deposit', 'withdrawal', 'entry-fee', 'refund'], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, enum: ['VES', 'USD', 'EUR'], required: true },
  bcvRate: { type: Number },
  status: { type: String, enum: ['pending', 'completed', 'rejected'], default: 'pending' },
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  details: {
    screenshotUrl: { type: String },
    fromBank: { type: String },
    fromAccountNumber: { type: String },
    toBank: { type: String },
    toPhoneNumber: { type: String },
    toVenezuelanId: { type: String },
    gameRoomCode: { type: String },
  },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default model<ITransaction>('Transaction', transactionSchema);
