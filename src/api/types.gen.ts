// This file is auto-generated by @hey-api/openapi-ts

export type CreateRecipeDto = {
    [key: string]: unknown;
};

export type CreateUserDto = {
    /**
     * Username of the user
     */
    username: string;
    /**
     * Password of the user
     */
    password: string;
};

export type LoginResponseDto = {
    accessToken: string;
};

export type LoginUserDto = {
    /**
     * Username of the user
     */
    username: string;
    /**
     * Password of the user
     */
    password: string;
};

export type UpdateRecipeDto = {
    [key: string]: unknown;
};

export type UserResponseDto = {
    username: string;
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

export type LoginData = {
    body: LoginUserDto;
};

export type LoginResponse = (LoginResponseDto);

export type LoginError = unknown;

export type RegisterData = {
    body: CreateUserDto;
};

export type RegisterResponse = (unknown);

export type RegisterError = unknown;

export type ProfileResponse = (UserResponseDto);

export type ProfileError = unknown;