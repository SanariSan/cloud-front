const getBearerHeader = () => {
	//CALL HELPER WHICH accesses local storage, get value if exists
	return { Access: "Bearer 12345" };
};

export { getBearerHeader };
