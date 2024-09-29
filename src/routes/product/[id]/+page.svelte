<script lang="ts">
    export let data; // 'data' proviene del load en +page.server.ts
    import { goto } from "$app/navigation";
    import Icon from "@iconify/svelte";

    let showAlert = false;
    type Product = {
        id: Number;
        name: String;
        price: Number;
        description: String;
    };
    let showDeleteModal = false; // Controla la visibilidad del modal
    let selectedProductId: string = "";
    let productDetail: Product = data.product;
    let editActivated: boolean = false;
    // Mostrar el modal de confirmación de eliminación y pasar el id del producto
    function confirmDelete(id: string) {
        selectedProductId = id; // Asigna el id del producto a eliminar
        showDeleteModal = true; // Muestra el modal
    }
    // Cancelar la eliminación
    function cancelDelete() {
        showDeleteModal = false; // Cierra el modal sin eliminar
    }
</script>

{#if productDetail}
    <div class="flex gap-2 text-md font-semibold text-slate-950">
        <Icon
            icon="mdi:arrow-back"
            width="24"
            height="24"
            style="color:slate-950"
        />
        <button on:click={() => goto("/product")}> Regresar </button>
    </div>
    <div class="mx-auto p-6">
        <div class="card w-full bg-base-100 shadow-xl">
            <div class="card-body">
                <h1 class="text-2xl font-semibold text-slate-950">
                    Información del producto
                </h1>
                <!-- Información del producto en forma de tarjetas -->
                <div class="flex flex-col gap-4">
                    <div class="card bg-base-200 p-4">
                        <h3 class="font-bold text-lg">ID del Producto</h3>
                        <p class="text-md text-gray-600">{productDetail.id}</p>
                    </div>
                    <div class="card bg-base-200 p-4">
                        <h3 class="font-bold text-lg">Nombre del producto</h3>
                        {#if editActivated}
                            <input
                                type="text"
                                placeholder="Nombre del producto"
                                class="input w-full max-w-xs"
                                bind:value={productDetail.name}
                            />
                        {:else}
                            <p class="text-md text-gray-600">
                                {productDetail.name}
                            </p>
                        {/if}
                    </div>

                    <div class="card bg-base-200 p-4">
                        <h3 class="font-bold text-lg">Precio</h3>
                        {#if editActivated}
                            <input
                                type="number"
                                placeholder="Precio"
                                class="input w-full max-w-xs"
                                bind:value={productDetail.price}
                            />
                        {:else}
                            <p class="text-md text-gray-600">
                                ${productDetail.price}
                            </p>
                        {/if}
                    </div>

                    <div class="card bg-base-200 p-4">
                        <h3 class="font-bold text-lg">Descripción</h3>
                        {#if editActivated}
                            <input
                                type="text"
                                placeholder="Descripción"
                                class="input w-full max-w-xs"
                                bind:value={productDetail.description}
                            />
                        {:else}
                            <p class="text-md text-gray-600">
                                {productDetail.description}
                            </p>
                        {/if}
                    </div>

                    <div class="flex mt-4 gap-4 justify-between">
                        <div class="flex gap-4">
                            <button
                                class="btn btn-primary"
                                on:click={() => {
                                    editActivated = !editActivated;
                                }}>{editActivated ? "Volver" : "Editar"}</button
                            >
                            <button
                                class="btn btn-error"
                                on:click={() => confirmDelete(productDetail.id)}
                                >Eliminar</button
                            >
                        </div>

                        <!-- Formulario para actualizar producto -->
                        <form
                            action="?/updateProduct"
                            method="post"
                            class={editActivated ? "" : "hidden"}
                        >
                            <input
                                type="hidden"
                                name="id"
                                value={productDetail.id}
                            />
                            <input
                                type="hidden"
                                name="name"
                                value={productDetail.name}
                            />
                            <input
                                type="hidden"
                                name="price"
                                value={productDetail.price}
                            />
                            <input
                                type="hidden"
                                name="description"
                                value={productDetail.description}
                            />

                            <button class="btn btn-primary" type="submit"
                                >Confirmar</button
                            >
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

{#if showDeleteModal}
    <div
        class="modal modal-open fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
    >
        <div class="modal-box">
            <h3 class="font-bold text-lg">Eliminar Producto</h3>
            <p class="py-4">
                ¿Estás seguro de que deseas eliminar el producto con ID: {selectedProductId}?
            </p>
            <div class="modal-action">
                <!-- Formulario para enviar la solicitud DELETE -->
                <form action="?/deleteProduct" method="post">
                    <input type="hidden" name="id" value={selectedProductId} />

                    <button type="submit" class="btn btn-error">Eliminar</button
                    >
                </form>
                <button class="btn" on:click={cancelDelete}>Cancelar</button>
            </div>
        </div>
    </div>
{/if}
