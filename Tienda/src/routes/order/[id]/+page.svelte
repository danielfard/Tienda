<script lang="ts">
    export let data; // 'data' proviene del load en +page.server.ts
    import { goto } from "$app/navigation";
    import Icon from "@iconify/svelte";
    import { Dropdown } from "$lib/components";
    let showAlert = false;

    type Order = {
        id: Number;
        productId: Number;
        quantity: Number;
        totalPrice: Number;
        customerName: String;
        status: String;
    };
    type Product = {
        id: Number;
        name: Number;
        price: String;
    };
    let showDeleteModal = false;
    let selectedOrderId: string = "";
    let orderDetail: Order = data?.order;
    let Allproducts: Product[] = data?.products;
    let editActivated: boolean = false;

    function confirmDelete(id: string) {
        selectedOrderId = id; // Asigna el id de la orden a eliminar
        showDeleteModal = true; // Muestra el modal
    }

    function cancelDelete() {
        showDeleteModal = false; // Cierra el modal sin eliminar
    }

    let productItems = Allproducts.map((product) => {
        return { label: product.name, value: Number(product.id) };
    });
    let selectedProductId = "";
    $: selectedProductId;
    let selectedItem = productItems.filter(
        (product) => product.value == orderDetail.productId,
    )[0];

    $: selectedProductId = selectedItem;
    let idSelected = selectedProductId?.value;
</script>

{#if orderDetail}
    <div class="flex gap-2 text-md font-semibold text-slate-950">
        <Icon
            icon="mdi:arrow-back"
            width="24"
            height="24"
            style="color:slate-950"
        />
        <button on:click={() => goto("/order")}> Regresar </button>
    </div>
    <div class="mx-auto p-6">
        <div class="card w-full bg-base-100 shadow-xl">
            <div class="card-body">
                <h1 class="text-2xl font-semibold text-slate-950">
                    Información de la orden
                </h1>
                <!-- Información del producto en forma de tarjetas -->
                <div class="flex flex-col gap-4">
                    <div class="card bg-base-200 p-4">
                        <h3 class="font-bold text-lg">ID de la orden</h3>
                        <p class="text-md text-gray-600">
                            {orderDetail.id}
                        </p>
                    </div>
                    <div class="card bg-base-200 p-4">
                        <h3 class="font-bold text-lg">Nombre del producto</h3>
                        {#if editActivated}
                            <Dropdown
                                items={productItems}
                                bind:value={selectedProductId}
                                id={"productId"}
                                placeholder="Seleccione un producto"
                            ></Dropdown>
                        {:else}
                            <p class="text-md text-gray-600">
                                {selectedItem?.label}
                            </p>
                        {/if}
                    </div>
                    <div class="card bg-base-200 p-4">
                        <h3 class="font-bold text-lg">Nombre del cliente</h3>
                        {#if editActivated}
                            <input
                                type="text"
                                placeholder="Nombre del cliente"
                                class="input w-full max-w-xs"
                                bind:value={orderDetail.customerName}
                            />
                        {:else}
                            <p class="text-md text-gray-600">
                                {orderDetail.customerName}
                            </p>
                        {/if}
                    </div>
                    <div class="card bg-base-200 p-4">
                        <h3 class="font-bold text-lg">Cantidad</h3>
                        {#if editActivated}
                            <input
                                type="number"
                                placeholder="Cantidad"
                                class="input w-full max-w-xs"
                                bind:value={orderDetail.quantity}
                            />
                        {:else}
                            <p class="text-md text-gray-600">
                                {orderDetail.quantity}
                            </p>
                        {/if}
                    </div>

                    <div class="card bg-base-200 p-4">
                        <h3 class="font-bold text-lg">Total</h3>
                        {#if editActivated}
                            <input
                                type="number"
                                placeholder="Total"
                                class="input w-full max-w-xs"
                                bind:value={orderDetail.totalPrice}
                            />
                        {:else}
                            <p class="text-md text-gray-600">
                                {orderDetail.totalPrice}
                            </p>
                        {/if}
                    </div>

                    <div class="card bg-base-200 p-4">
                        <h3 class="font-bold text-lg">Estatus</h3>
                        {#if editActivated}
                            <input
                                type="text"
                                placeholder="Estatus"
                                class="input w-full max-w-xs"
                                bind:value={orderDetail.status}
                            />
                        {:else}
                            <p class="text-md text-gray-600">
                                {orderDetail.status}
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
                                on:click={() => confirmDelete(orderDetail.id)}
                                >Eliminar</button
                            >
                        </div>

                        <form
                            action="?/updateOrder"
                            method="post"
                            class={editActivated ? "" : "hidden"}
                        >
                            <input
                                type="hidden"
                                name="id"
                                value={orderDetail.id}
                            />
                            <input
                                type="hidden"
                                name="productId"
                                value={selectedProductId?.value}
                            />
                            <input
                                type="hidden"
                                name="quantity"
                                value={orderDetail.quantity}
                            />
                            <input
                                type="hidden"
                                name="totalPrice"
                                value={orderDetail.totalPrice}
                            />
                            <input
                                type="hidden"
                                name="customerName"
                                value={orderDetail.customerName}
                            />
                            <input
                                type="hidden"
                                name="status"
                                value={orderDetail.status}
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
            <h3 class="font-bold text-lg">Eliminar Orden</h3>
            <p class="py-4">
                ¿Estás seguro de que deseas eliminar la orden con ID: {selectedOrderId}?
            </p>
            <div class="modal-action">
                <!-- Formulario para enviar la solicitud DELETE -->
                <form action="?/deleteOrder" method="post">
                    <input type="hidden" name="id" value={selectedOrderId} />

                    <button type="submit" class="btn btn-error">Eliminar</button
                    >
                </form>
                <button class="btn" on:click={cancelDelete}>Cancelar</button>
            </div>
        </div>
    </div>
{/if}
