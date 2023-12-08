import { DataModel } from '@/models/DataModel';
// import fs from 'fs';
import { parse } from 'papaparse';
export class LoadDataService {

    async loadCSV(): Promise<DataModel[]> {
        try {
            const response = await fetch('data/FoodData.csv');
            const text = await response.text();
            const result = parse(text, { header: true });
            const parsedData: DataModel[] = result.data.map((row: any) => ({
                id: row.id || '',
                title: row.title || '',
                ingredients: row.ingredients ? row.ingredients.split(',').map((ingredient: string) => ingredient.trim()) : [],
                instructions: row.instructions || '',
                imageName: row.imageName || '',
                cleanedIngredients: row.cleanedIngredients ? row.cleanedIngredients.split(',').map((cleanedIngredient: string) => cleanedIngredient.trim()) : [],
            }));
            return parsedData;
        } catch (error) {
            console.log('Error', error);
            throw error;
        }
    }

    async loadCSVById(id: string | string[]): Promise<DataModel | null> {
        try {
            const response = await fetch('/data/FoodData.csv');
            const text = await response.text();
            const result = parse(text, { header: true });
            const parsedData: DataModel[] = result.data.map((row: any) => {
                // Map the item to a DataModel object
                const data: DataModel = {
                    id: row.id || '',
                    title: row.title || '',
                    ingredients: row.ingredients ? row.ingredients.split(/',\s*'|\['|'\]/).map((ingredient: string) => ingredient.replace(/'/g, '')).filter((ingredient: string) => ingredient !== '') : [],
                    instructions: row.instructions || '',
                    imageName: row.imageName || '',
                    cleanedIngredients: row.cleanedIngredients ? row.cleanedIngredients.split(/',\s*'|\['|'\]/).map((cleanedIngredient: string) => cleanedIngredient.replace(/'/g, '')).filter((cleanedIngredient: string) => cleanedIngredient !== '') : [],
                };
                return data;
            });

            const item = parsedData.find((row: any) => row.id === id);
            return item || null;
        } catch (error) {
            console.log("Error", error);
            throw error;
        }
    }


}
