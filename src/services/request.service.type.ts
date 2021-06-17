export type TPath = "/access" | "/access/login" | "/access/register";

export interface IRequest {
	path: TPath;
	headers: {};
	data: {};
}
