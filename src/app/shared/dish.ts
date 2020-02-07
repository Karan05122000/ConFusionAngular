import { Comments } from './comments';


export class Dish{
    id: string;
    name: string;
    description: string;
    category: string;
    featured: boolean;
    image: string;
    price: string;
    label: string;
    comments: Comments[];
};
