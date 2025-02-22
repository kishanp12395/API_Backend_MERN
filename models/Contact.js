import { mongoose } from "mongoose";

// Contact schema & model

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
        },
        phone: {
            type: String,
            required: true,
            match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
        },

    }, { timestamps: true }
);

export const Contact = mongoose.model('Contact', contactSchema);
