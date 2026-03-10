import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async upsertAuthUser(input: {
        clerkUserId: string;
        email: string;
        name: string;
    }) {
        const { clerkUserId, email, name } = input;

        const user = await this.userModel.findOneAndUpdate(
            { clerkUserId },
            { email, name },
            { upsert: true, new: true }
        );

        return user;
    }

    async findByClerkUserId(clerkUserId: string) {
        return this.userModel.findOne({ clerkUserId }).exec();
    }
}