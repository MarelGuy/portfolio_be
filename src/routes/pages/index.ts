import { Router, Request, Response, NextFunction } from 'express';
import pageModel from '../../schemas/pageSchema.js';

const app: Router = Router();

let pageToSend;

// 0 = english
// 1 = italian

app.get('/get_page', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const langHeader = req.headers.lang as String;
        const pageHeader = parseInt(req.headers.page as string);

        const search_page = () => {
            let init_arr = [0, 0, 0, 0];
            init_arr[pageHeader] = 1;

            let projection = {
                nav: init_arr[0],
                home: init_arr[1],
                aboutme: init_arr[2],
                projects: init_arr[3]
            };

            let processed_projection = "";

            Object.entries(projection).some((key) => {
                if (key[1] === 1) {
                    processed_projection = `{"${key[0]}":${key[1]}}`;
                    return true;
                }
            });

            return JSON.parse(processed_projection);
        };

        const result = search_page();

        await pageModel.findOne({
            lang: langHeader,
            $or: [
                { "nav.page_i": pageHeader },
                { "home.page_i": pageHeader },
                { "aboutme.page_i": pageHeader },
                { "projects.page_i": pageHeader }
            ]
        }, result).then((value: any) => {
            pageToSend = value;
        });

        res.status(200).send(pageToSend!);
    } catch (err: unknown) {
        console.log(err);
        next(err);
    }
});

app.get('/cv', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let a = await pageModel.findById("65048e37de5b4304f8b99233");
        if (a)
            res.status(200).header({ "Content-Type": "application/pdf" }).send(a.cv);
        // res.sendFile("C:\\Users\\golan\\Documents\\portoflio\\portfolio_be\\src\\static\\loris_cuntreri_cv.pdf");
    } catch (err: unknown) {
        console.log(err);
        next(err);
    }
});

export default app;