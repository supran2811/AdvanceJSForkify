import axios from "axios";

///http://food2fork.com/api/search 
/// API KEY e04f185892ab3a1eabf9753a98a74723

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const apiKey = "e04f185892ab3a1eabf9753a98a74723";
        try{
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${apiKey}&q=${this.query}`);
            this.results = res.data.recipes;
        } catch(error) {

        }
        
    }
}
