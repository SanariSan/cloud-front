import { useAtom } from "@dbeining/react-atom";
import React, { useEffect, useRef, useState } from "react";
import { PanelBrowseFilesComponent } from "../../../components/panel";
import { reqFsBrowse, reqFsDownload } from "../../../services/fs";
import { currentGroupInfoAtom } from "../../../store/current-group";
import { forcedRerenderAtom } from "../../../store/forced-rerender";
import { pathAtom, updatePath } from "../../../store/path";
import mime from "mime-types";

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
		if (isActive.current && currentGroupInfo) {
			reqFsBrowse({ groupId: currentGroupInfo.id, path })
				.then(({ data }) => {
					setCurrentPathContent({ ...data });
				})
				.catch((err) => {
					console.log(err);
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

	const handleDownload = async (idx) => {
		const filename = currentPathContent.files[idx];

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
				/>
			) : (
				<p>PLEASE CHOOSE GROUP TO START WORKING!</p>
			)}
		</>
	);
};

export { PanelBrowseContainer };
