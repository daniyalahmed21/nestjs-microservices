import { Prop, Schema } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    clerkUserId: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, enum: ['user', 'admin'], default: 'user' })
    role: 'user' | 'admin';
}