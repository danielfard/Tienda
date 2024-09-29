<script lang="ts">
    import Icon from "@iconify/svelte";
    import Select from "svelte-select";
    export let items: { label: any; value: any }[] | undefined | any;
    export let label: null | string = null;
    export let value:
        | { label?: string; value?: string }
        | number
        | string
        | null
        | any;
    export let placeholder = "Placeholder";
    export let readonly = false;
    export let disabled = false;
    export let errorText: any[] | undefined | null | any = undefined;
    export let size = "default";
    export let id = "";
    export let showChevron = false;
    export let searchable = true;
    export let canCreate = false;
    let listOpen = false;

    let filterText = "";

    export let clearable: boolean | undefined = undefined;

    function handleFilter(e) {

        if (e.detail.length === 0 && filterText.length > 0) {
            const prev = items?.filter((i) => !i.created);
            items = [
                ...prev,
                { value: filterText, label: filterText, created: true },
            ];
        }
    }
</script>

<div
    class:error={errorText}
    class:disabled
    class:readonly
    class="form-control relative w-full select-theme"
>
    {#if label}
        <label for="selectLabel" class="label pb-1 pl-0">
            <span id="selectLabel" class="label-text text-xs text-gray-600"
                >{label}</span
            >
        </label>
    {/if}
    {#if canCreate}
        <Select
            class="w-full cursorPointer  {readonly
                ? 'pointer-events-none'
                : ''}"
            bind:value
            bind:listOpen
            bind:filterText
            listOffset={8}
            showChevron
            {clearable}
            containerStyles={size === "small"
                ? "height:36px; min-height:36px"
                : ""}
            {items}
            {id}
            {placeholder}
            {disabled}
            inputAttributes={readonly ? { readonly: true } : {}}
            on:filter={handleFilter}
            {searchable}
            on:clear
            on:change
            floatingConfig={{
                strategy: "fixed",
            }}
        >
            <div slot="chevron-icon">
                {#if !readonly}
                    <Icon
                        name={listOpen ? "ChevronUp" : "ChevronDown"}
                        fill={disabled ? "#A8ABB2" : "#0F1218"}
                    />
                {/if}
            </div>
            <div class="empty">
                <p>No items found</p>
            </div>
            <div
                slot="item"
                class="item cursor-pointer flex items-center justify-between"
                let:item
            >
                {item.created ? "Agregar nuevo: " : ""}
                {item.label}
                {#if showChevron}
                    <Icon
                        icon="ic:baseline-chevron-right"
                        width="24"
                        height="24"
                        style="color: #0F1218"
                    />
                {/if}
            </div>
        </Select>
    {:else}
        <Select
            class="w-full cursorPointer  {readonly
                ? 'pointer-events-none'
                : ''}"
            bind:value
            bind:listOpen
            listOffset={8}
            showChevron
            {clearable}
            containerStyles={size === "small"
                ? "height:36px; min-height:36px"
                : ""}
            {items}
            {id}
            {placeholder}
            {disabled}
            inputAttributes={readonly ? { readonly: true } : {}}
            {searchable}
            on:clear
            on:change
            floatingConfig={{
                strategy: "fixed",
            }}
        >
            <div slot="chevron-icon">
                {#if !readonly}
                    <Icon
                        icon="mdi:chevron-{listOpen ? 'up' : 'down'}"
                        width="24"
                        height="24"
                        style="color: {disabled ? '#A8ABB2' : '#0F1218'}"
                    />
                {/if}
            </div>
            <div class="empty">
                <p>No se encontraron resultados</p>
            </div>
            <div
                slot="item"
                class="item cursor-pointer flex items-center justify-between"
                let:item
            >
                {item.label}
                {#if showChevron}
                    <Icon
                    icon="mdi:chevron-right"
                    width="24"
                    height="24"
                    style="color: #0F1218"
                />
                {/if}
            </div>
        </Select>
    {/if}
</div>

<style>
    .select-theme {
        --padding: 0 4px 0 16px;
        --height: 48px;
        --background: theme("colors.gray.50");
        --item-hover-bg: theme("colors.gray.100");
        --item-is-active-bg: theme("colors.gray.100");
        --item-hover-color: theme("colors.gray.900");
        --border: 0.5px solid theme("colors.gray.opacity");
        --border-radius: 8px;
        --placeholder-color: theme("colors.gray.900");
        --list-border-radius: 8px;
        --list-shadow: theme("boxShadow.medium");
        --item-is-active-color: theme("colors.gray.900");
    }
    .error {
        --border: 0.5px solid theme("colors.error.700");
        --border-hover: 0.5px solid theme("colors.error.700");
    }
    .disabled {
        --disabled-background: theme("colors.gray.50");
        --disabled-color: theme("colors.gray.400");
    }
    .readonly {
        --background: transparent;
        --border: 1px solid #d1d2d3;
    }
</style>
