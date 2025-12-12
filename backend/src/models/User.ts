import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  fullName: string;
  email: string;
  venezuelanId: string;
  phoneNumber: string;
  stateOfResidence: string;
  dateOfBirth: Date;
  nickname: string;
  password: string;
  pin: string;
  kycStatus: 'pending' | 'approved' | 'rejected';
  avatar?: string;
  balances: {
    ves: number;
    usd: number;
    eur: number;
  };
  sanctions: {
    reason: string;
    date: Date;
  }[];
  comparePassword(password: string): Promise<boolean>;
  comparePin(pin: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  venezuelanId: { type: String, required: true, unique: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  stateOfResidence: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  nickname: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  pin: { type: String, required: true, minlength: 4, maxlength: 4 },
  kycStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  avatar: { type: String },
  balances: {
    ves: { type: Number, default: 0 },
    usd: { type: Number, default: 0 },
    eur: { type: Number, default: 0 },
  },
  sanctions: [{
    reason: { type: String, required: true },
    date: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('pin')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.pin = await bcrypt.hash(this.pin, salt);
  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.comparePin = async function (pin: string): Promise<boolean> {
  return bcrypt.compare(pin, this.pin);
};

export default model<IUser>('User', userSchema);
