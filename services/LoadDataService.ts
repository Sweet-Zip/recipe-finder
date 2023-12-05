import { DataModel } from '@/models/DataModel';
import { parse } from 'papaparse';
export class LoadDataService {
    async loadCSV(): Promise<DataModel[]> {
        try {
            const response = await fetch('data/FoodData.csv');
            const text = await response.text();
            const result = parse(text, { header: true });
            const parsedData: DataModel[] = result.data.map((row: any) => {
                const data: DataModel = {
                    id: row.id || '',
                    title: row.title || '',
                    ingredients: row.ingredients ? row.ingredients.split(',').map((ingredient: string) => ingredient.trim()) : [],
                    instructions: row.instructions || '',
                    imageName: row.imageName || '',
                    cleanedIngredients: row.cleanedIngredients ? row.cleanedIngredients.split(',').map((cleanedIngredient: string) => cleanedIngredient.trim()) : [],
                };
                return data;
            });
            return parsedData;
        } catch (error) {
            console.log("Error", error);
            throw error;
        }
    }

    async loadCSVById(id: string | string []): Promise<DataModel[]> {
        try {
            const response = await fetch('data/FoodData.csv');
            const text = await response.text();
            const result = parse(text, { header: true });
            const parsedData: DataModel[] = result.data.map((row: any) => {
                const data: DataModel = {
                    id: row.id || '',
                    title: row.title || '',
                    ingredients: row.ingredients ? row.ingredients.split(',').map((ingredient: string) => ingredient.trim()) : [],
                    instructions: row.instructions || '',
                    imageName: row.imageName || '',
                    cleanedIngredients: row.cleanedIngredients ? row.cleanedIngredients.split(',').map((cleanedIngredient: string) => cleanedIngredient.trim()) : [],
                };
                return data;
            });

            // if (!id || (typeof id !== 'string' && !Array.isArray(id))) {
            //     return []; // Early return for invalid ID
            // }

            // if (typeof id === 'string') {
            //     const singleItem = parsedData.find((item) => item.id === id);
            //     return singleItem ? [singleItem] : [];
            // } else {
            //     return parsedData.filter((item) => id.includes(item.id));
            // }
            return parsedData.find((item) => item.id === id)
        } catch (error) {
            console.log("Error", error);
            throw error;
        }
    }
}
