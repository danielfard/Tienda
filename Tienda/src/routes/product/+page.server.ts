import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        // Solicita los productos desde tu backend en el puerto 3000
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        const products = await response.json();

        // Devuelve los productos para que sean accesibles en el componente
        return {
            products
        };
    } catch (error) {
        console.error(error);
        // Manejo de errores, devuelve un objeto vacío o un mensaje de error
        return {
            products: []
        };
    }
};
