import type { PageServerLoad } from './$types';
import { redirect } from 'sveltekit-flash-message/server';
import { fail } from '@sveltejs/kit';
const serializeNonPOJOs = (value: object | null) => {
    return JSON.parse(JSON.stringify(value));
};

// Lógica para obtener el producto por ID desde la API local
export const load: PageServerLoad = async ({ params }) => {
    try {
        const res = await fetch(`http://localhost:3000/products/${params.id}`);

        if (!res.ok) {
            return {
                status: res.status,
                error: new Error('Error al obtener el producto.')
            };
        }

        const product = await res.json();

        // Asegúrate de serializar el objeto antes de devolverlo
        return { product: serializeNonPOJOs(product) };
    } catch (error) {
        return {
            status: 500,
            error: new Error('Error de conexión con la API.')
        };
    }
};

export const actions = {
    deleteProduct: async (event) => {
        const form = await event.request.formData();
        const method = form.get('_method');
        const id = form.get('id');

        try {
            const response = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error al eliminar el producto: ${response.statusText}`);
            }


        } catch (error) {
            return fail(400, { message: 'Hubo un problema al eliminar el producto' });
        }
        // Enviar el mensaje flash correctamente
        throw redirect(303, `/product`, {
            type: 'success',
            message: 'Producto eliminado con éxito!'
        }, event);
    },

    updateProduct: async (event) => {
        const form = await event.request.formData();
        const id = form.get('id');
        const name = form.get('name');
        const description = form.get('description');
        const price = form.get('price');

        try {
            const response = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    price
                }),
            });

            if (!response.ok) {
                throw new Error(`Error al actualizar el producto: ${response.statusText}`);
            }
        } catch (error) {
            return fail(500, { message: 'Hubo un problema al actualizar el producto' });
        }

        // Enviar el mensaje flash correctamente
        throw redirect(303, `/product/${id}`, {
            type: 'success',
            message: 'Producto actualizado con éxito!'
        }, event);
    }
};