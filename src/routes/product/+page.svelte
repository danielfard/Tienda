<script lang="ts">
    import { Table, Tab } from "$lib/components";
    export let data: { products: Product[] };
    type Product = {
        id: Number;
        name: String;
        price: Number;
        description: String;
    };

    let items: Product[] = data.products;
</script>

<div>
    <Tab labelButton={'Crear producto'} tableName={"Productos"}></Tab>
    <br>
    <Table
        headers={["id", "name", "price", "description"]}
        {items}
        tableName={"Productos"}
    ></Table>
</div>
