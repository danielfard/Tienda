<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from '$app/stores';
    export let tableName: string;
    export let labelButton: string;
</script>

<div class="flex justify-between ">
    <div class="text-2xl font-semibold text-slate-950 content-center">
        {tableName}
    </div>
    <button
        class="btn text-white bg-slate-950"
        on:click={() => {
            goto(`${$page.url.pathname}/create`);
        }}
    >
        {labelButton}
    </button>
</div>
