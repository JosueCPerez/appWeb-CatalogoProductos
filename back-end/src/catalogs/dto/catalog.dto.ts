export class CreateCatalogDto {
    codigo: number;
    name: string;
    description?: string;
}

export class UpdateCatalogDto{
    name?: string;
    description?: string;
}