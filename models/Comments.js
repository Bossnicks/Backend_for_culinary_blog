import mongoose from "mongoose";
import UserModel from "./User.js";

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        
    },
    // viewsCount: {
    //     type: Number,
    //     default: 0
    // },
    user: {
        //ref: 'User',
        type: Object,
        required: true
    },
    date: {
        type: Object,
        required: true
    }
},
{
    timestamps: true,
}
);



export default mongoose.model("Comment", CommentSchema);