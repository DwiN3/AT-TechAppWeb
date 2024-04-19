import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { checkPostCount } from "../middlewares/checkPostCount.middleware";
import DataService from '../modules/services/data.service'

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class DataController implements Controller {
    public path = '/api/post';
    public router = Router();
    public dataService = new DataService;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, this.addPost);

        this.router.get(`${this.path}/:id`, this.getPostById);
        //this.router.get(`${this.path}s`, this.getAllPosts);
        //this.router.post(`${this.path}/:num`, checkPostCount, this.getNumPosts);
        
        this.router.delete(`${this.path}:id`, this.deletePost);
        //this.router.delete(`${this.path}s`, this.deleteAllPost);
    }

    private addPost = async (request: Request, response: Response, next: NextFunction) => {
        const {title, text, image} = request.body;
        const readingData = {
            title,
            text,
            image
        };
        try {
            await this.dataService.createPost(readingData);
            response.status(200).json(readingData);
        } catch (error) {
                console.log('eeee', error)
                console.error(`Validation Error: ${error.message}`);
                response.status(400).json({error: 'Invalid input data.'});
        }
    }

    private getPostById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query({_id: id});
        response.status(200).json(allData);
    }

    private deletePost = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteData({_id: id});
        response.sendStatus(200);
    };

    // private getNumPosts = async (request: Request, response: Response, next: NextFunction) => {
    //     const { num } = request.params;
    //     const amount = Number(num);
    
    //     if (isNaN(amount) || amount <= 0 || amount > testArr.length) {
    //         return response.status(400).json({ error: "Invalid number of posts." });
    //     }
    
    //     const selectedPosts = testArr.slice(0, amount);
    //     response.status(200).json(selectedPosts);
    // };
    

    // private getAllPosts = async (request: Request, response: Response, next: NextFunction) => {
    //     response.status(200).json(testArr);
    // };

    // private deleteAllPost = async (request: Request, response: Response, next: NextFunction) => {
    //     testArr.splice(0, testArr.length);
    //     response.status(200).json({ message: "All posts deleted." });
    // };
}

export default DataController;