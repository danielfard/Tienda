import type { PageServerLoad } from './$types';
import { redirect } from 'sveltekit-flash-message/server';
import { fail } from '@sveltejs/kit';
const serializeNonPOJOs = (value: object | null) => {
    return JSON.parse(JSON.stringify(value));
};

// Lógica para obtener el producto por ID desde la API local
export const load: PageServerLoad = async ({ params }) => {
    try {
        const res = await fetch(`http://localhost:3000/orders/${params.id}`);

        if (!res.ok) {
            return {
                status: res.status,
                error: new Error('Error al obtener la orden.')
            };
        }

        const product_res = await fetch(`http://localhost:3000/products`);
        if (!product_res.ok) {
            return {
                status: product_res.status,
                error: new Error('Error al obtener los produtos.')
            };
        }
        const order = await res.json();
        const products = await product_res.json()

        return { order: serializeNonPOJOs(order), products: serializeNonPOJOs(products) };
    } catch (error) {
        return {
            status: 500,
            error: new Error('Error de conexión con la API.')
        };
    }
};

export const actions = {
    deleteOrder: async (event) => {
        const form = await event.request.formData();
        const method = form.get('_method');
        const id = form.get('id');

        try {
            const response = await fetch(`http://localhost:3000/orders/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error al eliminar la orden: ${response.statusText}`);
            }


        } catch (error) {
            return fail(400, { message: 'Hubo un problema al eliminar la orden' });
        }
        throw redirect(303, `/order`, {
            type: 'success',
            message: 'Orden eliminada con éxito!'
        }, event);
    },

    updateOrder: async (event) => {
        const form = await event.request.formData();
        const id = form.get('id');
        const productId = form.get('productId');
        const quantity = form.get('quantity');
        const totalPrice = form.get('totalPrice');
        const customerName = form.get('customerName');
        const status = form.get('status');
        
        try {
            const response = await fetch(`http://localhost:3000/orders/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId,
                    quantity,
                    totalPrice,
                    customerName,
                    status
                }),
            });

            if (!response.ok) {
                throw new Error(`Error al actualizar la orden: ${response.statusText}`);
            }
        } catch (error) {
            return fail(500, { message: 'Hubo un problema al actualizar la orden' });
        }

        // Enviar el mensaje flash correctamente
        throw redirect(303, `/order/${id}`, {
            type: 'success',
            message: 'Orden actualizada con éxito!'
        }, event);
    }
};