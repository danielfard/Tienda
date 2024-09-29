<script lang="ts">
    import { goto } from "$app/navigation"; // Importar la función para redirigir
    import { page } from "$app/stores";
    export let items: any[] = [];
    export const tableName: String = "";
    export let headers: String[] = [];

    function goToPage(id: string) {
        goto(`${$page.url.pathname}/${id}`);
    }
</script>

<!-- Estructura del componente -->
<div class="flex flex-col gap-4">
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
                        on:click={() => goToPage(item.id)}
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
