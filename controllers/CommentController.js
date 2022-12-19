import CommentModel from '../models/Comments.js'
import PostModel from '../models/Post.js'
import UserModel from '../models/User.js'
import mongoose from 'mongoose'


export const addComment = async (req, res) => {
    try {
        // debug.log(req.body);
         const {comment, id, idOfUser} = req.body;

        
        const user = await UserModel.findOne({_id: idOfUser});
        // try {
        //     await CommentModel.findOneAndUpdate(comment, {
        //         user: user,
        //     });
        const dates = new Date();
        // } catch (err) {
        //     console.log(err);
        // }
        if (!comment) {
            return res.json({message: "Комментарий не может быть пустым!"});
        }
        const newComment = new CommentModel({
            comment: comment, 
            user: user,
            id: id,
            date: dates.getFullYear() + '-' + (dates.getMonth() + 1) + '-' + dates.getDate() + ' '
            + (dates.getHours() + 3 > 10 ? (dates.getHours() + 3) : ("0" + (dates.getHours())))   + ':' + (dates.getMinutes() > 10 ? dates.getMinutes() : "0" + dates.getMinutes()) + ':' + (dates.getSeconds() > 10 ? dates.getSeconds() : "0" + dates.getSeconds())
         });
        // const doc = await newComment.save();
        res.json(newComment);

        

        
            await PostModel.findByIdAndUpdate(id, {
                $push: { comments: newComment },
            })
            

        

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось написать коммент",
        });

    }
}

export const getAllComments = async (req, res) => {
    try { 
        const posts = await PostModel.find().populate("user").exec();
        res.json(posts.comments);
    } catch(err) {
        res.status(500).json({
            message: "Не удалось вернуть комментарии",
        });
        
    } 
}


export const deleteComment = async (req, res) => {
    try { 
        const {id,comment} = req.body;

        console.log(id)
        console.log(comment)

      
       
        
        // idOfComment = mongoose.mongo.ObjectId(idOfComment);
        // idOfComment = mongoose.mongo.ObjectId(idOfComment);
        // idOfPage = idOfPage.toNumber();
        // idOfComment = idOfComment.toNumber();
        // CommentModel.findOneAndDelete({
        //     _id: idOfComment,
        // }, (err, doc) => {
        //     if(err) {
        //         console.log(err);
        //         return res.status(500).json({
        //             message: "Не удалось удалить комментарий",
        //         });
        //     }
        //     if(!doc) {
        //         return res.status(404).json({
        //             message: "Комментарий не найден"
        //         });
        //     }
        // });
        // await PostModel.findByIdAndUpdate(idOfComment, {
        //     $pop: { comments: idOfComment },
        // })
        // const comment = comments.findOne({_id : idOfComment});
        // await PostModel.updateOne({"_id" : idOfPage}, {
        //     $pull: {"comments" : {"_id": idOfComment}}
        // });
        await PostModel.findByIdAndUpdate(id, {
            $pull: {"comments" : {"comment" : comment}}
        });

        res.json({ 
            id,
            comment
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось удалить комментарий",
        });
        
    }
}

// (err, doc) => {
//     if(err) {
//         console.log(err);
//         return res.status(500).json({
//             message: "Не удалось удалить комментарий",
//         });
//     }
//     if(!doc) {
//         return res.status(404).json({
//             message: "Комментарий не найден"
//         });
//     }
// }