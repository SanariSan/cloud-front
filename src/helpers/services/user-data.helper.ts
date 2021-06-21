import { updateCurrentGroupInfo } from "../../store/current-group";
import { updateGroupOwnage } from "../../store/group-ownage";
import { updateKeystore } from "../../store/keystore";
import { updateProfileInfo } from "../../store/profile-info";
import { updateStorageInfo } from "../../store/storage-info";
import { updateUserGroupsList } from "../../store/user-groups";

const clearPersonalLocalStorage = () => {
	updateProfileInfo(null);
	updateGroupOwnage(null);
	updateUserGroupsList(null);
	updateCurrentGroupInfo(null);
	updateStorageInfo(null);
};

const clearWholeLocalStorage = () => {
	clearPersonalLocalStorage();
	updateKeystore(null, null);
};

export { clearPersonalLocalStorage, clearWholeLocalStorage };
