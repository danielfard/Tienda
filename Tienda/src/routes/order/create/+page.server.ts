import { redirect } from '@sveltejs/kit'; // Importa la función de redirección
import type { Actions } from './$types';
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

export const actions: Actions = {
    create: async ({ request, fetch }) => {
        const formData = await request.formData();
        const productId = formData.get('productId');
        const quantity = formData.get('quantity');
        const totalPrice = formData.get('totalPrice');
        const customerName = formData.get('customerName');
        const status = formData.get('status');
        console.log(formData)
        // Validar que los campos no estén vacíos
        if (!productId || !quantity || !totalPrice || !customerName || !status) {
            return {
                errorMessage: 'Todos los campos son obligatorios.',
            };
        }

        const newOrder = {
            productId,
            quantity: Number(quantity),
            totalPrice: Number(totalPrice),
            customerName,
            status
        };

        try {
            const response = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrder),
            });

            if (!response.ok) {
                throw new Error('Error al crear la orden.');
            }


        } catch (error) {
            console.error('Error al crear la orden:', error);
            return {
                errorMessage: 'Hubo un problema al crear la orden.',
            };
        }
        throw redirect(303, '/order');

    }
};
