import express from 'express'; 
import mongoose from 'mongoose';
import {registerValidation, loginValidation, postCreateValidation, commentCreateValidation } from "./validations/auth.js";
import {checkAuth, handleValidationErrors} from "./utils/index.js";
import { UserController, PostController, CommentController} from './controllers/index.js'
import multer from "multer";
import cors from 'cors';


mongoose
    .connect("mongodb+srv://admin:1234567@cluster0.x07aklv.mongodb.net/blog?retryWrites=true&w=majority")
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err));


const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null , 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });
// app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/tags', PostController.getLastTags);
// app.get('/comments', CommentController.getAllComments);
app.get('/posts/:id/comments', CommentController.getAllComments);
app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id',  checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
app.post('/posts/:id', commentCreateValidation, handleValidationErrors, CommentController.addComment);
app.delete('/posts/comments/delete', checkAuth, CommentController.deleteComment)

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('Server OK');
})



// app.post('/posts/:id', CommentController.addComment);


// app.get('/', (req, res) => {
//     res.send('Hello world!');
// });

// app.post('/auth/login', (req, res) => {
//     console.log(req.body);
//     if(req.body.email === "111test@test.ru") {
//         const token = JsonWebToken.sign({
//             email: req.body.email,
//             fullName: "Никон Чигоя",
//         },
//         "secret123"
//         );
//     }
    
//     res.json({
//         success: true,
//         token
//     });
// })