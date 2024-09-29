<script lang="ts">
    import { CreateForm } from "$lib/components";

    export let data: { products: Product[] };
    type Product = {
        id: Number;
        name: String;
        price: Number;
    };

    let statuses = [
        { label: "Pendiente de pago", value: "Pendiente" },
        { label: "Orden Pagada", value: "Pagada" },
    ];

    type InputStruct = {
        id: string;
        name: string;
        type: string;
        isDropdown?: boolean;
        items?:
            | { label?: string; value?: string }
            | number
            | string
            | null
            | any;
        label: string;
        initialValue?: string;
        selectedProductId?:
            | { label?: string; value?: string }
            | number
            | string
            | null
            | any;
        disabled?: boolean;
        required: boolean;
    };

    // Transformar el arreglo de productos
    let transformedProducts = data.products.map((product) => ({
        label: product.name,
        value: product.id,
        price: product.price,
    }));

    let inputsInformation: InputStruct[] = [
        {
            id: "productId",
            name: "productId",
            type: "text",
            isDropdown: true,
            items: transformedProducts,
            selectedProductId: transformedProducts[0],
            label: "Producto",
            required: true,
        },
        {
            id: "quantity",
            name: "quantity",
            type: "number",
            label: "Cantidad del producto",
            required: true,
        },
        {
            id: "totalPrice",
            name: "totalPrice",
            type: "number",
            label: "Precio total",
            required: true,
        },
        {
            id: "customerName",
            name: "customerName",
            type: "text",
            label: "Nombre del cliente",
            required: true,
        },
        {
            id: "status",
            name: "status",
            type: "text",
            label: "Estatus",
            isDropdown: true,
            selectedProductId: statuses[0],
            items: statuses,
            required: true,
        },
    ];
</script>

<CreateForm label={"Crear orden"} buttonLabel={"Crear"} {inputsInformation} />
