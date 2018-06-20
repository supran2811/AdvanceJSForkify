import axios from "axios";
import {apiKey  , proxy } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try{
      const res = await axios(`${proxy}http://food2fork.com/api/get?key=${apiKey}&rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.publisher_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch(error) {

    }
  }

  parseIngredients() {
    const unitsLong = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
    const unitShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pouund'];
    const units = [...unitShort , 'kg' , 'g'];

    this.ingredients = this.ingredients.map(el => {
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit,i) => {
        ingredient = ingredient.replace(unit,unitShort[i]);
        ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
      });
      
      const arrIng = ingredient.split(' ');
     
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
     
      let objIng;
      if(unitIndex === -1) {
        objIng = {
          count : 1,
          unit : '',
          ingredient
        };
      }
      else if(parseInt(arrIng[0],10) && unitIndex === -1) {
        objIng = {
          count : parseInt(arrIng[0],10),
          unit : '',
          ingredient : arrIng.slice(1).join(' ')
        };
      }
      else {
        
        const arrCount = arrIng.slice(0,unitIndex);
        let count;
        if(arrCount.length === 1){
          count = eval(arrCount[0].replace('-','+'));
        }
        else {
         count = eval(arrCount.join('+'));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient:arrIng.slice(unitIndex+1).join(' ')
        }
      }

      return objIng;
    });
  }

  calcTime() {
    const numOfIngs = this.ingredients.length;
    const periods = Math.ceil(numOfIngs/3);
    this.time = periods*15;
  }

  calcServing() {
    this.servingCount = 4;
  }
}