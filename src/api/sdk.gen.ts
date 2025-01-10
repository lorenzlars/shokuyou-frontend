// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options, formDataBodySerializer } from './client';
import type { GetRecipesData, GetRecipesResponse, CreateRecipeData, CreateRecipeResponse, DeleteRecipeData, GetRecipeData, GetRecipeResponse, UpdateRecipeData, UpdateRecipeResponse, DeleteImageData, UploadImageData, UploadImageResponse, UpdateImageData, UpdateImageResponse, GetIngredientsData, GetIngredientsResponse, CreateIngredientData, CreateIngredientResponse, DeleteIngredientsData, GetIngredientData, GetIngredientResponse, UpdateIngredientsData, UpdateIngredientsResponse, UserLoginData, UserLoginResponse, UserRegisterData, GetProfileData, GetProfileResponse } from './types.gen';

export const client = createClient(createConfig());

export class RecipesService {
    /**
     * Get all recipes with pagination
     */
    public static getRecipes<ThrowOnError extends boolean = false>(options: Options<GetRecipesData, ThrowOnError>) {
        return (options?.client ?? client).get<GetRecipesResponse, unknown, ThrowOnError>({
            ...options,
            url: '/v1/recipes'
        });
    }
    
    /**
     * Add a new recipes
     */
    public static createRecipe<ThrowOnError extends boolean = false>(options: Options<CreateRecipeData, ThrowOnError>) {
        return (options?.client ?? client).post<CreateRecipeResponse, unknown, ThrowOnError>({
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            url: '/v1/recipes'
        });
    }
    
    /**
     * Delete a single recipe
     */
    public static deleteRecipe<ThrowOnError extends boolean = false>(options: Options<DeleteRecipeData, ThrowOnError>) {
        return (options?.client ?? client).delete<unknown, unknown, ThrowOnError>({
            ...options,
            url: '/v1/recipes/{id}'
        });
    }
    
    /**
     * Get a single recipe
     */
    public static getRecipe<ThrowOnError extends boolean = false>(options: Options<GetRecipeData, ThrowOnError>) {
        return (options?.client ?? client).get<GetRecipeResponse, unknown, ThrowOnError>({
            ...options,
            url: '/v1/recipes/{id}'
        });
    }
    
    /**
     * Replace a single recipe
     */
    public static updateRecipe<ThrowOnError extends boolean = false>(options: Options<UpdateRecipeData, ThrowOnError>) {
        return (options?.client ?? client).put<UpdateRecipeResponse, unknown, ThrowOnError>({
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            url: '/v1/recipes/{id}'
        });
    }
    
    /**
     * Delete an image to from the recipe
     */
    public static deleteImage<ThrowOnError extends boolean = false>(options: Options<DeleteImageData, ThrowOnError>) {
        return (options?.client ?? client).delete<unknown, unknown, ThrowOnError>({
            ...options,
            url: '/v1/recipes/{id}/image'
        });
    }
    
    /**
     * Add an image to a recipe
     */
    public static uploadImage<ThrowOnError extends boolean = false>(options: Options<UploadImageData, ThrowOnError>) {
        return (options?.client ?? client).post<UploadImageResponse, unknown, ThrowOnError>({
            ...options,
            ...formDataBodySerializer,
            headers: {
                'Content-Type': null,
                ...options?.headers
            },
            url: '/v1/recipes/{id}/image'
        });
    }
    
    /**
     * Replace the image of the recipe
     */
    public static updateImage<ThrowOnError extends boolean = false>(options: Options<UpdateImageData, ThrowOnError>) {
        return (options?.client ?? client).put<UpdateImageResponse, unknown, ThrowOnError>({
            ...options,
            ...formDataBodySerializer,
            headers: {
                'Content-Type': null,
                ...options?.headers
            },
            url: '/v1/recipes/{id}/image'
        });
    }
    
}

export class IngredientsService {
    public static getIngredients<ThrowOnError extends boolean = false>(options: Options<GetIngredientsData, ThrowOnError>) {
        return (options?.client ?? client).get<GetIngredientsResponse, unknown, ThrowOnError>({
            ...options,
            url: '/v1/ingredients'
        });
    }
    
    public static createIngredient<ThrowOnError extends boolean = false>(options: Options<CreateIngredientData, ThrowOnError>) {
        return (options?.client ?? client).post<CreateIngredientResponse, unknown, ThrowOnError>({
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            url: '/v1/ingredients'
        });
    }
    
    public static deleteIngredients<ThrowOnError extends boolean = false>(options: Options<DeleteIngredientsData, ThrowOnError>) {
        return (options?.client ?? client).delete<unknown, unknown, ThrowOnError>({
            ...options,
            url: '/v1/ingredients/{id}'
        });
    }
    
    public static getIngredient<ThrowOnError extends boolean = false>(options: Options<GetIngredientData, ThrowOnError>) {
        return (options?.client ?? client).get<GetIngredientResponse, unknown, ThrowOnError>({
            ...options,
            url: '/v1/ingredients/{id}'
        });
    }
    
    public static updateIngredients<ThrowOnError extends boolean = false>(options: Options<UpdateIngredientsData, ThrowOnError>) {
        return (options?.client ?? client).put<UpdateIngredientsResponse, unknown, ThrowOnError>({
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            url: '/v1/ingredients/{id}'
        });
    }
    
}

export class AuthService {
    /**
     * Login the current user
     */
    public static userLogin<ThrowOnError extends boolean = false>(options: Options<UserLoginData, ThrowOnError>) {
        return (options?.client ?? client).post<UserLoginResponse, unknown, ThrowOnError>({
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            url: '/v1/auth/login'
        });
    }
    
    /**
     * Register a new user
     */
    public static userRegister<ThrowOnError extends boolean = false>(options: Options<UserRegisterData, ThrowOnError>) {
        return (options?.client ?? client).post<unknown, unknown, ThrowOnError>({
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            url: '/v1/auth/register'
        });
    }
    
    /**
     * Get the current user
     */
    public static getProfile<ThrowOnError extends boolean = false>(options?: Options<GetProfileData, ThrowOnError>) {
        return (options?.client ?? client).get<GetProfileResponse, unknown, ThrowOnError>({
            ...options,
            url: '/v1/auth/profile'
        });
    }
    
}