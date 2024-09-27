<script lang="ts">
    import { Table } from "../../lib/components/index";
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
    <Table
        headers={["id", "name", "price", "description"]}
        {items}
        tableName={"Productos"}
    ></Table>
</div>
