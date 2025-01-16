// This file is auto-generated by @hey-api/openapi-ts

import { z } from 'zod';

export const zRecipeIngredientRequestDto = z.object({
    name: z.string(),
    unit: z.string(),
    amount: z.number()
});

export const zRecipeRequestDto = z.object({
    name: z.string(),
    description: z.string().optional(),
    source: z.string().optional(),
    servings: z.number().optional(),
    duration: z.number().optional(),
    ingredients: z.array(zRecipeIngredientRequestDto).optional(),
    instructions: z.string().optional(),
    nutrition: z.string().optional(),
    notes: z.string().optional()
});

export const zRecipeIngredientResponseDto = z.object({
    name: z.string(),
    unit: z.string(),
    amount: z.number()
});

export const zRecipeResponseDto = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    source: z.string().optional(),
    servings: z.number().optional(),
    duration: z.number().optional(),
    ingredients: z.array(zRecipeIngredientResponseDto).optional(),
    instructions: z.string().optional(),
    nutrition: z.string().optional(),
    notes: z.string().optional(),
    imageUrl: z.string().optional()
});

export const zPaginationSortOrder = z.enum([
    'ASC',
    'DESC'
]);

export const zRecipeResponseFlatDto = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    source: z.string().optional(),
    servings: z.number().optional(),
    duration: z.number().optional(),
    instructions: z.string().optional(),
    nutrition: z.string().optional(),
    notes: z.string().optional(),
    imageUrl: z.string().optional()
});

export const zRecipePaginatedResponseDto = z.object({
    page: z.number().default(1),
    pageSize: z.number().default(10),
    orderBy: z.string().optional(),
    sortOrder: zPaginationSortOrder.optional(),
    filter: z.string().optional(),
    total: z.number(),
    content: z.array(zRecipeResponseFlatDto)
});

export const zIngredientRequestDto = z.object({
    name: z.string()
});

export const zIngredientResponseDto = z.object({
    id: z.string(),
    name: z.string()
});

export const zIngredientPaginatedResponseDto = z.object({
    page: z.number().default(1),
    pageSize: z.number().default(10),
    orderBy: z.string().optional(),
    sortOrder: zPaginationSortOrder.optional(),
    filter: z.string().optional(),
    total: z.number(),
    content: z.array(zIngredientResponseDto)
});

export const zAuthRequestDto = z.object({
    username: z.string(),
    password: z.string()
});

export const zAuthResponseDto = z.object({
    accessToken: z.string()
});

export const zAuthRegisterRequestDto = z.object({
    username: z.string(),
    password: z.string()
});

export const zUserResponseDto = z.object({
    id: z.string(),
    username: z.string()
});

export const zCreatePlanMealDto = z.object({
    dayIndex: z.number(),
    recipeId: z.string()
});

export const zCreatePlanDto = z.object({
    name: z.string(),
    days: z.number(),
    meals: z.array(zCreatePlanMealDto).optional()
});

export const zPlanResponseMealRecipeDto = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    source: z.string().optional(),
    servings: z.number().optional(),
    duration: z.number().optional(),
    instructions: z.string().optional(),
    nutrition: z.string().optional(),
    notes: z.string().optional(),
    imageUrl: z.string().optional()
});

export const zPlanResponseMealDto = z.object({
    id: z.string(),
    dayIndex: z.number(),
    recipe: zPlanResponseMealRecipeDto
});

export const zPlanResponseDto = z.object({
    id: z.string(),
    name: z.string(),
    days: z.number(),
    meals: z.array(zPlanResponseMealDto).optional()
});

export const zPlanResponseFlatDto = z.object({
    id: z.string(),
    name: z.string(),
    days: z.number()
});

export const zPlanResponsePaginatedSimpleDto = z.object({
    total: z.number(),
    content: z.array(zPlanResponseFlatDto)
});

export const zPlanRequestMealDto = z.object({
    dayIndex: z.number(),
    recipeId: z.string()
});

export const zPlanRequestDto = z.object({
    name: z.string(),
    days: z.number(),
    meals: z.array(zPlanRequestMealDto).optional()
});

export const zImportType = z.enum([
    'mela'
]);

export const zImportRecipeDto = z.object({
    url: z.string()
});

export const zGetRecipesResponse = zRecipePaginatedResponseDto;

export const zCreateRecipeResponse = zRecipeResponseDto;

export const zGetRecipeResponse = zRecipeResponseDto;

export const zUpdateRecipeResponse = zRecipeResponseDto;

export const zUploadImageResponse = zRecipeResponseDto;

export const zUpdateImageResponse = zRecipeResponseDto;

export const zGetIngredientsResponse = zIngredientPaginatedResponseDto;

export const zCreateIngredientResponse = zIngredientResponseDto;

export const zGetIngredientResponse = zIngredientResponseDto;

export const zUpdateIngredientsResponse = zIngredientResponseDto;

export const zUserLoginResponse = zAuthResponseDto;

export const zGetProfileResponse = zUserResponseDto;

export const zGetPlansResponse = zPlanResponsePaginatedSimpleDto;

export const zCreatePlanResponse = zPlanResponseDto;

export const zGetPlanResponse = zPlanResponseDto;

export const zUpdatePlanResponse = zPlanResponseDto;

export const zScrapRecipeResponse = zRecipeResponseDto;