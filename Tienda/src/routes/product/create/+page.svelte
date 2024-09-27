<script lang="ts">
    import { goto } from "$app/navigation";
    import Icon from "@iconify/svelte";
    export let data;
    let successMessage = data?.successMessage || "";
    let errorMessage = data?.errorMessage || "";
</script>

<div class="flex flex-col max-w-lg mx-auto my-10 p-5 border rounded gap-2">
    <!-- Botón de regresar -->
    <div class="flex gap-2 text-md font-semibold text-slate-950">
        <Icon
            icon="mdi:arrow-back"
            width="24"
            height="24"
            style="color:slate-950"
        />
        <button on:click={() => goto("/product")}> Regresar </button>
    </div>
    <h2 class="text-2xl font-bold mb-4">Crear Nuevo Producto</h2>

    <!-- Mostrar mensaje de éxito -->
    {#if successMessage}
        <p class="text-green-500">{successMessage}</p>
    {/if}

    <!-- Mostrar mensaje de error -->
    {#if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
    {/if}

    <!-- Formulario que envía los datos al servidor -->
    <form method="POST" action="?/create">
        <div class="mb-4">
            <label for="name" class="block text-sm font-medium"
                >Nombre del Producto</label
            >
            <input
                id="name"
                name="name"
                type="text"
                class="w-full px-4 py-2 border rounded"
                required
            />
        </div>

        <div class="mb-4">
            <label for="price" class="block text-sm font-medium"
                >Precio del Producto</label
            >
            <input
                id="price"
                name="price"
                type="number"
                min="0"
                class="w-full px-4 py-2 border rounded"
                required
            />
        </div>

        <div class="mb-4">
            <label for="description" class="block text-sm font-medium"
                >Descripción</label
            >
            <textarea
                id="description"
                name="description"
                class="w-full px-4 py-2 border rounded"
                required
            ></textarea>
        </div>

        <button
            type="submit"
            class="bg-slate-950 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
            Crear Producto
        </button>
    </form>
</div>
