import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { checkPostCount } from "../middlewares/checkPostCount.middleware";

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class DataController implements Controller {
    public path = '/api/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, this.addPost);

        this.router.get(`${this.path}/:id`, this.getPost);
        this.router.get(`${this.path}s`, this.getAllPosts);
        //this.router.post(`${this.path}/:num`, this.getNumPosts);
        this.router.post(`${this.path}/:num`, checkPostCount, this.getNumPosts);
        
        this.router.delete(`${this.path}:id`, this.deletePost);
        this.router.delete(`${this.path}s`, this.deleteAllPost);
    }

    private getPost = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const postId = Number(id);

        if (! Number.isInteger(postId) || postId >= testArr.length || postId < 0) {
            return response.status(404).json({ error: "Post not found." });
        }
        
        response.status(200).json(testArr[postId]);
    }
    
    private addPost = async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body;
        testArr.push(elem);
        response.status(200).json(testArr);
    };

    private deletePost = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const postId = Number(id);

        if (postId >= testArr.length || postId < 0) {
            return response.status(404).json({ error: "Post not found." });
        }
        
        testArr.splice(postId, 1);
        response.status(200).json({ error: "Post deleted." });
    }

    private getNumPosts = async (request: Request, response: Response, next: NextFunction) => {
        const { num } = request.params;
        const amount = Number(num);
    
        if (isNaN(amount) || amount <= 0 || amount > testArr.length) {
            return response.status(400).json({ error: "Invalid number of posts." });
        }
    
        const selectedPosts = testArr.slice(0, amount);
        response.status(200).json(selectedPosts);
    };
    

    private getAllPosts = async (request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(testArr);
    };

    private deleteAllPost = async (request: Request, response: Response, next: NextFunction) => {
        testArr.splice(0, testArr.length);
        response.status(200).json({ message: "All posts deleted." });
    };
}

export default DataController;