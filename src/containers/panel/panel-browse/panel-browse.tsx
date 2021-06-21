import { useAtom } from "@dbeining/react-atom";
import React, { useEffect, useRef, useState } from "react";
import { PanelBrowseFilesComponent } from "../../../components/panel";
import { reqFsBrowse, reqFsDelete, reqFsDownload, reqFsRename } from "../../../services/fs";
import { currentGroupInfoAtom } from "../../../store/current-group";
import { forcedRerenderAtom, forceRerender } from "../../../store/forced-rerender";
import { pathAtom, updatePath } from "../../../store/path";
import mime from "mime-types";
import { toggleBlockLoader } from "../../../store/block-loader";

const PanelBrowseContainer: React.FC = () => {
	//browse path state
	//effects for update list
	//calls to api for actions, pass them as props
	const isActive = useRef(true);
	const currentGroupInfo = useAtom(currentGroupInfoAtom);
	const path = useAtom(pathAtom);
	const forcedRerender = useAtom(forcedRerenderAtom);
	const [currentPathContent, setCurrentPathContent] = useState({ files: [], folders: [] });

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);

	useEffect(() => {
		if (isActive.current && currentGroupInfo) {
			updatePath("/");
		}
	}, [currentGroupInfo]);

	useEffect(() => {
		if (isActive.current && currentGroupInfo && currentGroupInfo.id) {
			toggleBlockLoader(true);

			reqFsBrowse({ groupId: currentGroupInfo.id, path })
				.then(({ data }) => {
					setCurrentPathContent({ ...data });
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					toggleBlockLoader(false);
				});
		}
	}, [path, currentGroupInfo, forcedRerender]);

	const onClickFolder: any = (event, elName) => {
		event.preventDefault();

		updatePath(path + `${path === "/" ? "" : "/"}${elName}`);
	};
	const onClickFile: any = (event, elName) => {
		event.preventDefault();

		alert("this is file, can't do anything yet");
	};
	const onContextMenu: any = async (event, show) => {
		event.preventDefault();
		show(event);
	};

	const handleRenameFile = async (idx) => {
		if (!currentGroupInfo) {
			return;
		}

		const oldFilename = currentPathContent.files[idx];
		const newFilename = prompt("Enter new name");

		if (!newFilename) {
			return;
		}

		toggleBlockLoader(true);

		reqFsRename({
			groupId: currentGroupInfo.id,
			path: `${path}/${oldFilename}`,
			filename: `${path}/${newFilename}`,
		})
			.then(forceRerender)
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				toggleBlockLoader(false);
			});
	};

	const handleRenameFolder = async (idx) => {
		if (!currentGroupInfo) {
			return;
		}

		const oldFilename = currentPathContent.folders[idx];
		const newFilename = prompt("Enter new name");

		if (!newFilename) {
			return;
		}

		toggleBlockLoader(true);

		reqFsRename({
			groupId: currentGroupInfo.id,
			path: `${path}/${oldFilename}`,
			filename: `${path}/${newFilename}`,
		})
			.then(forceRerender)
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				toggleBlockLoader(false);
			});
	};

	const handleDeteleFile = async (idx) => {
		if (!currentGroupInfo) {
			return;
		}

		const filename = currentPathContent.files[idx];

		toggleBlockLoader(true);

		reqFsDelete({ groupId: currentGroupInfo.id, path: `${path}/${filename}` })
			.then(forceRerender)
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				toggleBlockLoader(false);
			});
	};

	const handleDeteleFolder = async (idx) => {
		if (!currentGroupInfo) {
			return;
		}

		const filename = currentPathContent.folders[idx];
		toggleBlockLoader(true);

		reqFsDelete({ groupId: currentGroupInfo.id, path: `${path}/${filename}` })
			.then(forceRerender)
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				toggleBlockLoader(false);
			});
	};

	const handleDownload = async (idx) => {
		if (!currentGroupInfo) {
			return;
		}

		const filename = currentPathContent.files[idx];

		toggleBlockLoader(true);

		reqFsDownload({
			groupId: currentGroupInfo.id,
			path,
			filename,
		})
			.then((data) => {
				let blob = new Blob([data], { type: mime.contentType(filename) });
				let a = document.createElement("a");
				let url = window.URL.createObjectURL(blob);
				a.href = url;
				a.download = filename;
				a.click();
				URL.revokeObjectURL(a.href);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				toggleBlockLoader(false);
			});
	};

	return (
		<>
			{currentGroupInfo ? (
				<PanelBrowseFilesComponent
					currentPathContent={currentPathContent}
					onClickFolder={onClickFolder}
					onClickFile={onClickFile}
					onContextMenu={onContextMenu}
					path={path}
					handleDownload={handleDownload}
					handleRenameFile={handleRenameFile}
					handleRenameFolder={handleRenameFolder}
					handleDeteleFile={handleDeteleFile}
					handleDeteleFolder={handleDeteleFolder}
				/>
			) : (
				<p>PLEASE CHOOSE GROUP TO START WORKING!</p>
			)}
		</>
	);
};

export { PanelBrowseContainer };
