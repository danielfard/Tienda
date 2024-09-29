<script lang="ts">
    import { CreateForm } from "$lib/components/CreateForm";

    type InputStruct = {
        id: string;
        name: string;
        type: string;
        label: string;
        required: boolean;
    };

    let inputsInformation: InputStruct[] = [
        {
            id: "name",
            name: "name",
            type: "text",
            label: "Nombre del producto",
            required: true,
        },
        {
            id: "price",
            name: "price",
            type: "number",
            label: "Precio del producto",
            required: true,
        },
        {
            id: "description",
            name: "description",
            type: "text",
            label: "Descripcion del producto",
            required: true,
        },
    ];
</script>

<CreateForm
    label={"Crear producto"}
    buttonLabel={"Crear"}
    {inputsInformation}
/>
