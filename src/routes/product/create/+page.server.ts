import { redirect } from '@sveltejs/kit'; // Importa la función de redirección
import type { Actions } from './$types';

export const actions: Actions = {
    create: async ({ request, fetch }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        const price = formData.get('price');
        const description = formData.get('description');

        // Validar que los campos no estén vacíos
        if (!name || !price || !description) {
            return {
                errorMessage: 'Todos los campos son obligatorios.',
            };
        }

        // Crear un objeto para el nuevo producto
        const newProduct = {
            name,
            price: Number(price), // Asegurarse de que el precio sea un número
            description,
        };

        // Enviar los datos al backend en el puerto 3000
        try {
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error('Error al crear el producto.');
            }


        } catch (error) {
            console.error('Error al crear el producto:', error);
            return {
                errorMessage: 'Hubo un problema al crear el producto.',
            };
        }
        // Redirigir al usuario al listado de productos tras la creación exitosa
        throw redirect(303, '/product'); // Redirige a la página donde se muestran todos los productos

    }
};
