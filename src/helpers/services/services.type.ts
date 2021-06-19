// Custom status codes map
export enum StatusCode {
	SUCCESS = "3000",
	FAILURE = "3001",
	INVALID_ACCESS_TOKEN = "3002",
}

// Response codes to custom names map
export enum ResponseStatus {
	SUCCESS = 200,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_ERROR = 500,
}
