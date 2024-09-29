<script lang="ts">
    import Icon from "@iconify/svelte";
    import { Dropdown } from "$lib/components";
    let data;
    export let label: String;
    let selectedProductId = "";
    type InputStruct = {
        id: string;
        name: string;
        isDropdown?: boolean;
        dropDownTtitle?: string;
        items?:
            | { label?: string; value?: string }
            | number
            | string
            | null
            | any;
        type: string;
        disabled?: boolean;
        label: string;
        required: boolean;
    };

    export let inputsInformation: InputStruct[];
    export let buttonLabel: String;

    let successMessage = data?.successMessage || "";
    let errorMessage = data?.errorMessage || "";
</script>

<div class="flex flex-col max-w-lg mx-auto my-10 p-5 border rounded gap-2 bg-white rounded-lg">
    <!-- Botón de regresar -->
    <div class="flex gap-2 text-md font-semibold text-slate-950">
        <Icon
            icon="mdi:arrow-back"
            width="24"
            height="24"
            style="color:slate-950"
        />
        <button on:click={() => history.back()}> Regresar </button>
    </div>
    <h2 class="text-2xl font-bold mb-4">{label}</h2>

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
        {#each inputsInformation as input}
            {#if input.isDropdown}
                <div class="flex flex-col mb-4">
                    <label for={input.name} class="block text-sm font-medium"
                        >{input.label}</label
                    >

                    <Dropdown
                        items={input.items}
                        bind:value={selectedProductId}
                        canCreate={true}
                        id={input.id}
                        placeholder="Seleccione un producto"
                    ></Dropdown>
                    <input
                        type="hidden"
                        name="productId"
                        value={selectedProductId?.value}
                    />
                </div>
            {:else}
                <div class="mb-4">
                    <label for={input.name} class="block text-sm font-medium"
                        >{input.label}</label
                    >
                    <input
                        id={input.id}
                        name={input.name}
                        type={input.type}
                        min={input.type ? "0" : ""}
                        class="w-full px-4 py-2 border rounded"
                        required={input.required}
                        disabled={input.disabled}
                    />
                </div>
            {/if}
        {/each}

        <button
            type="submit"
            class="bg-slate-950 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
            {buttonLabel}
        </button>
    </form>
</div>
