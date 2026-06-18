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
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'retailor'],
      required: true,
    },
    passwordHash: {
      type: String,
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
    themePreference: {
      type: String,
      enum: ['light', 'dark'],
      default: 'dark',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

export const User = mongoose.models.User || mongoose.model('User', userSchema)
