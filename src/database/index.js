import mongoose from "mongoose";
import config from "../config/database";

class database {
    constructor(){
        this.connection = mongoose.connect(
            config.uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
        ;
    };
};

export default new database().connection;