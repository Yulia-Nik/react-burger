export interface IIngredientType {
	_id: string;
	name: string;
	type: 'bun' | 'main' | 'sauce';
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	additionalClass?: string;
};

export interface IBurgerIngredientType extends IIngredientType {
	ingredientId: string;
}

export interface IResultIngredientsData {
	bun?: Array<IIngredientType>;
	main?: Array<IIngredientType>;
	sauce?: Array<IIngredientType>;
};

export interface IRefreshToken {
	accessToken: string;
	refreshToken: string;
	success: boolean;
};

export interface IUserData {
	email: string;
	name: string;
};

export interface ILoginResponse {
	accessToken: string;
	refreshToken: string;
	success: boolean;
	user: IUserData;
	message?: string;
};

export interface IOrderType {
	createdAt: string;
	ingredients: Array<IIngredientType>;
	name: string;
	number: number;
	owner: IUserData & {
		createdAt: string;
		updatedAt: string;
	};
	price: number;
	status: string;
	updatedAt: string;
	_id: string;
};

export interface IOrderResponseData {
	name: string;
	order: IOrderType;
	success: boolean;
}
