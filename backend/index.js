import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import tasksRouter from './routes/tasksRouter.js';
const app = express();
const port = 5000;
const MONGO_CONNECT = 'mongodb+srv://vishal1807gupta:IxG9lxtV8OkxwpAQ@cluster0.gjql6.mongodb.net/todo-list?retryWrites=true&w=majority&appName=Cluster0';

app.use(cors()); //Yes, you are correct! CORS (Cross-Origin Resource Sharing) is a mechanism that allows a server to specify which domains (origins) are permitted to access its resources. By default, web browsers block requests to a different origin (domain, protocol, or port) than the one from which the page was loaded, for security reasons. Using CORS, you can enable your application to make requests to different origin servers.

app.use(express.json());  // This was creating issue for sending request so before sending request add this line because The app.use(express.json()) middleware in Express is used to parse incoming JSON-formatted request bodies and make them available on the req.body object in your route handlers. (converts json data to javascript object)

app.use('/users',userRouter);  // app.use() method in Express is used to register middleware functions in your application.
app.use('/tasks',tasksRouter);

app.get('/',(req,res)=>{
    res.send("Welcome to Vishal Club");
});

const startServer = async () => {
    try {
      await mongoose.connect(MONGO_CONNECT);
      app
        .listen(port, () => {console.log(`Server is listening on port: ${port}`)})
        .on('error', (e) => {
          console.log('Error: ', e.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
startServer();