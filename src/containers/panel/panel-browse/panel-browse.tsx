import { useAtom } from "@dbeining/react-atom";
import mime from "mime-types";
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "semantic-ui-react";
import { PanelBrowseFilesComponent } from "../../../components/panel";
import { ResponseStatus } from "../../../helpers/services";
import { reqFsBrowse, reqFsDelete, reqFsDownload, reqFsRename } from "../../../services/fs";
import { reqGroupKick } from "../../../services/group";
import { toggleBlockLoader } from "../../../store/block-loader";
import { currentGroupInfoAtom } from "../../../store/current-group";
import { forcedRerenderAtom, forceRerender } from "../../../store/forced-rerender";
import { pathAtom, updatePath } from "../../../store/path";
import { translateAtom } from "../../../store/translate";
import s from "./panel-browse.module.scss";

const PanelBrowseContainer: React.FC = () => {
	const isActive = useRef(true);
	const translated = useAtom(translateAtom);
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
		if (!isActive.current || !currentGroupInfo) return;
		toggleBlockLoader(true);

		reqFsBrowse({ groupId: currentGroupInfo.id, path })
			.then(({ data }) => {
				setCurrentPathContent({ ...data });
			})
			.catch((err) => {
				if ([ResponseStatus.BAD_REQUEST, ResponseStatus.FORBIDDEN].includes(err.status)) {
					// alert(err.message);
				}
			})
			.finally(() => {
				toggleBlockLoader(false);
			});
	}, [path, currentGroupInfo, forcedRerender]);

	const onClickFolder: any = (event, elName) => {
		event.preventDefault();
		if (!isActive.current) return;

		updatePath(path + `${path === "/" ? "" : "/"}${elName}`);
	};
	const onClickFile: any = (event, elName) => {
		event.preventDefault();

		// alert("This is file, can't do anything here");
	};
	const onContextMenu: any = async (event, show) => {
		event.preventDefault();
		if (!isActive.current) return;

		show(event);
	};

	const handleRenameFile = async (idx) => {
		if (!isActive.current || !currentGroupInfo) {
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
				if (err.status === ResponseStatus.BAD_REQUEST) {
					alert(err.message);
				}
			})
			.finally(() => {
				toggleBlockLoader(false);
			});
	};

	const handleRenameFolder = async (idx) => {
		if (!isActive.current || !currentGroupInfo) {
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
				if (err.status === ResponseStatus.BAD_REQUEST) {
					alert(err.message);
				}
			})
			.finally(() => {
				toggleBlockLoader(false);
			});
	};

	const handleDeteleFile = async (idx) => {
		if (!isActive.current || !currentGroupInfo) {
			return;
		}

		const filename = currentPathContent.files[idx];

		toggleBlockLoader(true);

		reqFsDelete({ groupId: currentGroupInfo.id, path: `${path}/${filename}` })
			.then(forceRerender)
			.catch((err) => {
				if (err.status === ResponseStatus.BAD_REQUEST) {
					alert(err.message);
				}
			})
			.finally(() => {
				toggleBlockLoader(false);
			});
	};

	const handleDeteleFolder = async (idx) => {
		if (!isActive.current || !currentGroupInfo) {
			return;
		}

		const filename = currentPathContent.folders[idx];
		toggleBlockLoader(true);

		reqFsDelete({ groupId: currentGroupInfo.id, path: `${path}/${filename}` })
			.then(forceRerender)
			.catch((err) => {
				if (err.status === ResponseStatus.BAD_REQUEST) {
					alert(err.message);
				}
			})
			.finally(() => {
				toggleBlockLoader(false);
			});
	};

	const handleDownload = async (idx) => {
		if (!isActive.current || !currentGroupInfo) {
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
				if (err.status === ResponseStatus.BAD_REQUEST) {
					alert(err.message);
				}
			})
			.finally(() => {
				toggleBlockLoader(false);
			});
	};

	const handleGroupKick = async (el) => {
		if (!isActive.current || !currentGroupInfo) return;

		toggleBlockLoader(true);

		const res = await reqGroupKick({ groupId: currentGroupInfo.id, userId: el.id })
			.then((res) => {
				alert(res.message);
			})
			.then(forceRerender)
			.catch((err) => {
				if (err.status === ResponseStatus.BAD_REQUEST) {
					alert(err.message);
				}
			});

		toggleBlockLoader(false);
	};

	return (
		<>
			{currentGroupInfo ? (
				<PanelBrowseFilesComponent
					currentPathContent={currentPathContent}
					currentGroupInfo={currentGroupInfo}
					onClickFolder={onClickFolder}
					onClickFile={onClickFile}
					onContextMenu={onContextMenu}
					path={path}
					handleDownload={handleDownload}
					handleRenameFile={handleRenameFile}
					handleRenameFolder={handleRenameFolder}
					handleDeteleFile={handleDeteleFile}
					handleDeteleFolder={handleDeteleFolder}
					handleGroupKick={handleGroupKick}
				/>
			) : (
				<div className={s.placeHolder}>
					<span className={s.arrowWrap}>
						<Icon name="long arrow alternate up" size="huge" className={s.iconStyled} />
					</span>
					<h1>
						{translated
							? "ПОЖАЛУЙСТА ВЫБЕРИТЕ ГРУППУ ДЛЯ НАЧАЛА РАБОТЫ!"
							: "PLEASE CHOOSE GROUP TO START WORKING!"}
					</h1>
					<span className={s.arrowWrap}>
						<Icon
							name="long arrow alternate left"
							size="huge"
							className={s.iconStyled}
						/>
					</span>
				</div>
			)}
		</>
	);
};

export { PanelBrowseContainer };
