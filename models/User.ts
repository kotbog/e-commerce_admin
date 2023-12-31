import mongoose, {models} from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    telephone: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        enum: ['User', 'Admin', 'SuperAdmin'],
        default: 'User'
    },
    modified_at: {
        type: Date,
    },
    deleted_at: {
        type: Date
    }
});
UserSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 12)
});


export default models.User || mongoose.model('User', UserSchema);