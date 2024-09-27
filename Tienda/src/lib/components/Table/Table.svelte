<script lang="ts">
    import { goto } from "$app/navigation"; // Importar la función para redirigir

    export let items: any[] = [];
    export let tableName: String;
    export let headers: String[] = [];

    let activeMenu = null; // Variable para controlar qué menú está abierto

    // Función para redirigir a la página de creación de productos
    function goToCreateProduct() {
        goto("/product/create"); // Redirigir a la ruta de creación de producto
    }

    function goToProduct(id) {
        goto(`/product/${id}`);
    }
</script>

<!-- Estructura del componente -->
<div class="flex flex-col gap-4">
    <div class="flex justify-between">
        <div class="text-2xl font-semibold text-slate-950">{tableName}</div>
        <!-- Botón que redirige a la página de creación de productos -->
        <button
            class="btn text-white bg-slate-950"
            on:click={goToCreateProduct}
        >
            Crear {tableName}
        </button>
    </div>

    <div class="overflow-x-auto">
        <table class="table-auto w-full">
            <!-- Encabezados de la tabla -->
            <thead>
                <tr>
                    {#each headers as item}
                        <th class="px-4 py-2 text-slate-950">{item}</th>
                    {/each}
                    <th class="px-4 py-2"></th>
                </tr>
            </thead>

            <!-- Cuerpo de la tabla -->
            <tbody>
                {#each items as item (item.id)}
                    <tr
                        class="border-t hover:bg-gray-200 cursor-pointer"
                        on:click={() => goToProduct(item.id)}
                    >
                        {#each headers as key}
                            <td class="px-4 py-2 text-center">{item[key]}</td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
