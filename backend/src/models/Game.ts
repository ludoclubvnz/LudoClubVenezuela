import { Schema, model, Document, Types } from 'mongoose';

export interface IGame extends Document {
  roomCode: string;
  createdBy: Types.ObjectId;
  players: Types.ObjectId[];
  spectators: Types.ObjectId[];
  status: 'waiting' | 'in-progress' | 'finished' | 'paused' | 'suspended';
  entryFee: {
    amount: number;
    currency: 'USD' | 'EUR';
  };
  winner?: Types.ObjectId;
  gameState: any; // Flexible to store game state
  chatHistory: {
    user: Types.ObjectId;
    message: string;
    timestamp: Date;
  }[];
  moveHistory: {
    player: Types.ObjectId;
    move: string;
    timestamp: Date;
  }[];
}

const gameSchema = new Schema<IGame>({
  roomCode: { type: String, required: true, unique: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  spectators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['waiting', 'in-progress', 'finished', 'paused', 'suspended'], default: 'waiting' },
  entryFee: {
    amount: { type: Number, required: true },
    currency: { type: String, enum: ['USD', 'EUR'], required: true },
  },
  winner: { type: Schema.Types.ObjectId, ref: 'User' },
  gameState: { type: Schema.Types.Mixed, default: {} },
  chatHistory: [{
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }],
  moveHistory: [{
    player: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    move: { type: String, required: true }, // e.g., "roll:6, move:p1-12"
    timestamp: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

export default model<IGame>('Game', gameSchema);
