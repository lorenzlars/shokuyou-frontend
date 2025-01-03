// This file is auto-generated by @hey-api/openapi-ts

export type RecipeRequestDto = {
    /**
     * Name of the recipe
     */
    name: string;
    /**
     * Description of the recipe
     */
    description?: string;
    /**
     * The recipe source
     */
    source?: string;
    /**
     * The number of servings
     */
    servings?: number;
    /**
     * The recipe duration in minutes
     */
    duration?: number;
    /**
     * The recipe ingredients
     */
    ingredients?: string;
    /**
     * The recipe instructions
     */
    instructions?: string;
    /**
     * The recipe nutrition
     */
    nutrition?: string;
    /**
     * The recipe notes
     */
    notes?: string;
};

export type RecipeResponseDto = {
    /**
     * The id of the recipe
     */
    id: string;
    /**
     * Name of the recipe
     */
    name: string;
    /**
     * Description of the recipe
     */
    description?: string;
    /**
     * The recipe source
     */
    source?: string;
    /**
     * The number of servings
     */
    servings?: number;
    /**
     * The recipe duration in minutes
     */
    duration?: number;
    /**
     * The recipe ingredients
     */
    ingredients?: string;
    /**
     * The recipe instructions
     */
    instructions?: string;
    /**
     * The recipe nutrition
     */
    nutrition?: string;
    /**
     * The recipe notes
     */
    notes?: string;
    /**
     * The image url the recipe image
     */
    imageUrl?: string;
};

export type PaginationSortOrder = 'ASC' | 'DESC';

export type PaginationResponseDto = {
    /**
     * The page number
     */
    page: number;
    /**
     * The page size
     */
    pageSize: number;
    /**
     * The order by attribute
     */
    orderBy?: string;
    /**
     * The sort order
     */
    sortOrder?: PaginationSortOrder;
    /**
     * The filter
     */
    filter?: string;
    /**
     * The content of the page
     */
    content: Array<Array<unknown>>;
    /**
     * The total number of items
     */
    total: number;
};

export type AuthRequestDto = {
    /**
     * Username of the user
     */
    username: string;
    /**
     * Password of the user
     */
    password: string;
};

export type AuthResponseDto = {
    /**
     * Access token for the user to authenticate
     */
    accessToken: string;
};

export type AuthRegisterRequestDto = {
    /**
     * Username of the user
     */
    username: string;
    /**
     * Password of the user
     */
    password: string;
};

export type UserResponseDto = {
    /**
     * The id of the user
     */
    id: string;
    /**
     * Username of the user
     */
    username: string;
};

export type GetRecipesData = {
    body?: never;
    path?: never;
    query: {
        /**
         * The page number
         */
        page: unknown;
        /**
         * The page size
         */
        pageSize: unknown;
        /**
         * The order by attribute
         */
        orderBy?: string;
        /**
         * The sort order
         */
        sortOrder?: PaginationSortOrder;
        /**
         * The filter
         */
        filter?: string;
    };
    url: '/v1/recipes';
};

export type GetRecipesResponses = {
    200: PaginationResponseDto & {
        content?: Array<RecipeResponseDto>;
    };
};

export type GetRecipesResponse = GetRecipesResponses[keyof GetRecipesResponses];

export type CreateRecipeData = {
    body: RecipeRequestDto;
    path?: never;
    query?: never;
    url: '/v1/recipes';
};

export type CreateRecipeResponses = {
    /**
     * Recipe successfully created
     */
    201: RecipeResponseDto;
};

export type CreateRecipeResponse = CreateRecipeResponses[keyof CreateRecipeResponses];

export type DeleteRecipeData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/recipes/{id}';
};

export type DeleteRecipeErrors = {
    /**
     * Recipe not found
     */
    404: unknown;
};

export type DeleteRecipeResponses = {
    /**
     * Successfully deleted the recipe
     */
    200: unknown;
};

export type GetRecipeData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/recipes/{id}';
};

export type GetRecipeErrors = {
    /**
     * Recipe not found
     */
    404: unknown;
};

export type GetRecipeResponses = {
    /**
     * Successfully retrieved the recipe
     */
    200: RecipeResponseDto;
};

export type GetRecipeResponse = GetRecipeResponses[keyof GetRecipeResponses];

export type UpdateRecipeData = {
    body: RecipeRequestDto;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/recipes/{id}';
};

export type UpdateRecipeErrors = {
    /**
     * Recipe not found
     */
    404: unknown;
};

export type UpdateRecipeResponses = {
    /**
     * Successfully updated the recipe
     */
    200: RecipeResponseDto;
};

export type UpdateRecipeResponse = UpdateRecipeResponses[keyof UpdateRecipeResponses];

export type DeleteImageData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/recipes/{id}/image';
};

export type DeleteImageErrors = {
    /**
     * No Recipe found to remove the image from
     */
    404: unknown;
};

export type DeleteImageResponses = {
    /**
     * Successfully removed the image
     */
    200: unknown;
};

export type UploadImageData = {
    body: {
        file: Blob | File;
    };
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/recipes/{id}/image';
};

export type UploadImageErrors = {
    /**
     * No Recipe found to add the image to
     */
    404: unknown;
};

export type UploadImageResponses = {
    /**
     * Successfully uploaded the image
     */
    200: RecipeResponseDto;
};

export type UploadImageResponse = UploadImageResponses[keyof UploadImageResponses];

export type UpdateImageData = {
    body: {
        file: Blob | File;
    };
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/recipes/{id}/image';
};

export type UpdateImageErrors = {
    /**
     * No Recipe found to update the image at
     */
    404: unknown;
};

export type UpdateImageResponses = {
    /**
     * Successfully uploaded the image
     */
    200: RecipeResponseDto;
};

export type UpdateImageResponse = UpdateImageResponses[keyof UpdateImageResponses];

export type UserLoginData = {
    body: AuthRequestDto;
    path?: never;
    query?: never;
    url: '/v1/auth/login';
};

export type UserLoginResponses = {
    /**
     * Successfully logged in
     */
    200: AuthResponseDto;
};

export type UserLoginResponse = UserLoginResponses[keyof UserLoginResponses];

export type UserRegisterData = {
    /**
     * Daten zur Erstellung eines neuen Benutzers
     */
    body: AuthRegisterRequestDto;
    path?: never;
    query?: never;
    url: '/v1/auth/register';
};

export type UserRegisterErrors = {
    /**
     * User already exists
     */
    409: unknown;
};

export type UserRegisterResponses = {
    /**
     * User successfully registered
     */
    201: unknown;
};

export type GetProfileData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/v1/auth/profile';
};

export type GetProfileResponses = {
    /**
     * Successfully retrieved the current user
     */
    200: UserResponseDto;
};

export type GetProfileResponse = GetProfileResponses[keyof GetProfileResponses];