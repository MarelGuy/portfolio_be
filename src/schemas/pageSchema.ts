import { Schema, model } from "mongoose";

const pageSchema = new Schema({
    lang: String,
    nav: {
        page_i: Number,
    },
    home: {
        page_i: Number,
    },
    aboutme: {
        page_i: Number,
    },
    projects: { page_i: Number, arr: [Object] },
    cv: Buffer
});

const pageModel = model("pages", pageSchema);

export default pageModel;