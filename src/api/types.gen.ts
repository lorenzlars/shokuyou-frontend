// This file is auto-generated by @hey-api/openapi-ts

export type CreateRecipeDto = {
    [key: string]: unknown;
};

export type UpdateRecipeDto = {
    [key: string]: unknown;
};

export type GetHelloResponse = (unknown);

export type GetHelloError = unknown;

export type CreateRecipeData = {
    body: CreateRecipeDto;
};

export type CreateRecipeResponse = (unknown);

export type CreateRecipeError = unknown;

export type GetRecipesResponse = (unknown);

export type GetRecipesError = unknown;

export type GetRecipeByIdData = {
    path: {
        id: string;
    };
};

export type GetRecipeByIdResponse = (unknown);

export type GetRecipeByIdError = unknown;

export type UpdateRecipeByIdData = {
    body: UpdateRecipeDto;
    path: {
        id: string;
    };
};

export type UpdateRecipeByIdResponse = (unknown);

export type UpdateRecipeByIdError = unknown;

export type RemoveRecipeByIdData = {
    path: {
        id: string;
    };
};

export type RemoveRecipeByIdResponse = (unknown);

export type RemoveRecipeByIdError = unknown;