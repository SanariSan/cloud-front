import { useAtom } from "@dbeining/react-atom";
import React, { useEffect, useRef, useState } from "react";
import { PanelBrowseFilesComponent } from "../../../components/panel";
import { reqFsBrowse, reqFsDownload } from "../../../services/fs";
import { currentGroupInfoAtom } from "../../../store/current-group";
import { forcedRerenderAtom } from "../../../store/forced-rerender";
import { pathAtom, updatePath } from "../../../store/path";

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

	const handleDownload = (idx) => {
		console.log(idx);
		console.log(currentPathContent.files);
		reqFsDownload({
			groupId: currentGroupInfo.id,
			path,
			filename: currentPathContent.files[idx],
		})
			.then((data) => {
				console.log(data);
				const raw = data as string;

				let blob = new Blob([raw], { type: "binary" });
				let a = document.createElement("a");
				a.href = URL.createObjectURL(blob);
				a.download = currentPathContent.files[idx];
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
