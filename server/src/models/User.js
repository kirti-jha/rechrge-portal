import mongoose from 'mongoose'

const chargeSchema = new mongoose.Schema(
  {
    mobile: { type: Number, default: 0, min: 0 },
    dth: { type: Number, default: 0, min: 0 },
    pan: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
)

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['admin', 'retailor'],
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    charges: {
      type: chargeSchema,
      default: () => ({ mobile: 0, dth: 0, pan: 0 }),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export const User = mongoose.models.User || mongoose.model('User', userSchema)
