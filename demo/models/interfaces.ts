export interface IPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface IComment {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

export interface IAlbum {
	userId: number;
	id: number;
	title: string;
}

export interface IPhoto {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

export interface ITodo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

export interface IGeo {
	lat: string;
	lng: string;
}

export interface IAddres {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: IGeo;
}

export interface ICompany {
	name: string;
	catchPhrase: string;
	bs: string;
}

export interface IUser {
	id: number;
	name: string;
	username: string;
	email: string;
	address: IAddres;
	phone: string;
	website: string;
	company: ICompany;
}
