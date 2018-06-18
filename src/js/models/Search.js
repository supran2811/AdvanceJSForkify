import axios from "axios";
import {apiKey , proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try{
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${apiKey}&q=${this.query}`);
            console.log(res);
            this.results = res.data.recipes;
        } catch(error) {
          console.log(error);
        }
        
    }
}
