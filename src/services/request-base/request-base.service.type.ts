type TPath =
	| "/access/register"
	| "/access/login"
	| "/access/refresh"
	| "/access/change-password"
	| "/access/logout"
	| "/profile/1"
	| "/group/create"
	| "/group/join"
	| "/group/leave"
	| "/group/change-password"
	| "/group/search-by-name"
	| "/group/search-by-email"
	| "/files/browse/"
	| "/files/download/"
	| "/files/upload/"
	| "/files/create/"
	| "/files/rename/"
	| "/files/delete/";

type TMethods = "GET" | "POST" | "PUT" | "DELETE";

interface IRequest {
	path?: TPath | string;
	headers?: {};
	data?: {};
}

export type { TPath, TMethods, IRequest };
