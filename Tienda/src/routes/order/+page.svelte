<script lang="ts">
    import { Table, Tab } from "$lib/components/index";
    
    export let data: { orders: Order[] };
    type Order = {
        id: Number;
        productId: Number;
        quantity: Number;
        totalPrice: Number;
        customerName: String;
        status: String;
    };

    let items: Order[] = data.orders;
</script>

<div>
    <Tab labelButton={'Crear orden'} tableName={"Ordenes"}></Tab>
    <Table
        headers={[
            "id",
            "productId",
            "quantity",
            "totalPrice",
            "customerName",
            "status",
        ]}
        {items}
        tableName={"Ordenes"}
    ></Table>
</div>
