import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        const response = await fetch('http://localhost:3000/orders');
        if (!response.ok) {
            throw new Error('Error al obtener las ordenes');
        }
        const orders = await response.json();

        return {
            orders
        };
    } catch (error) {
        console.error(error);
        return {
            orders: []
        };
    }
};