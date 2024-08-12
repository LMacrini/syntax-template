import React, { useState, useEffect } from "react";
import { Media } from "@uniwebcms/module-sdk";

async function getVideoThumbnail(url) {
	const youtubeRegex =
		/\b(?:https?:\/\/)?(?:(?:www|m)\.)?youtu(?:\.be\/|be\.com\/(?:watch(?:\?(?:(?:feature=player_embedded|app=desktop)&)?v=|\/)|v\/|oembed\?url=http%3A\/\/www\.youtube\.com\/watch\?v%3D|attribution_link\?a=[0-9A-Za-z\-_]{10,20}&u=(?:%2F|\/)watch%3Fv%3D|e(?:mbed)?\/|shorts\/)|be-nocookie\.com\/embed\/)([0-9A-Za-z\-_]{10,20})/;

	const vimeoRegex =
		/(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/;

	const youtubeMatch = url.match(youtubeRegex);
	if (youtubeMatch) {
		const videoId = youtubeMatch[1];
		return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
	}

	const vimeoMatch = url.match(vimeoRegex);
	if (vimeoMatch) {
		const videoId = vimeoMatch[1];
		try {
			const response = await fetch(
				`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`
			);
			const data = await response.json();
			return data.thumbnail_url;
		} catch (error) {
			console.error("Failed to fetch Vimeo thumbnail:", error);
			return null;
		}
	}

	return null;
}

function VideoOverlay({ videos, children }) {
	return (
		<>
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
				<div className="flex w-full max-w-6xl mx-auto bg-white shadow-lg">
					<div className="flex-1 p-4">
						<VideoComponent video={activeVideo} />
					</div>
					<div className="w-1/4 p-4 bg-gray-100">
						<h2 className="mb-4 text-lg font-bold">Other Videos</h2>
						{videos.map((video) => (
							<div
								key={video.id}
								className="mb-4 cursor-pointer"
								onClick={() => setActiveVideo(video)}
							>
								<VideoComponent video={video} />
							</div>
						))}
					</div>
				</div>
				<button
					className="absolute top-4 right-4 text-white"
					onClick={closeOverlay}
				>
					Close
				</button>
			</div>

			<div className="grid grid-cols-3 gap-4">
				{videos.map((video) => (
					<div
						key={video.id}
						className="cursor-pointer"
						onClick={() => openOverlay(video)}
					>
						<VideoComponent video={video} />
					</div>
				))}
			</div>
		</>
	);
}

export default function Video(video) {
	const [miniPlayer, setMiniPlayer] = useState(false);
	const [overlay, setOverlay] = useState(false);

	const toggleMiniPlayer = () => {
		setOverlay(false);
		setMiniPlayer(!miniPlayer);
	};

	const toggleOverlay = () => {
		setMiniPlayer(false);
		setOverlay(!overlay);
	};

	const [thumbnail, setThumbnail] = useState(null);

	const { src } = video;

	const playerClasses = `
    ${miniPlayer && "fixed bottom-4 right-4 w-64 h-36 z-50"} 
	${overlay && "flex w-full max-w-6xl mx-auto bg-white shadow-lg"}
    `;

	const outerClasses = `
	${
		overlay &&
		"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
	}
	`;

	useEffect(() => {
		async function fetchThumbnail() {
			const thumb = await getVideoThumbnail(src);
			setThumbnail(thumb);
		}
		fetchThumbnail();
	}, [src]);

	const Buttons = () => (
		<>
			<button onClick={toggleMiniPlayer}>Mini Player</button>
			<br />
			<button onClick={toggleOverlay}>Overlay</button>
		</>
	);

	const FakeBlock = () => (
		<div className="bg-black" style={{ paddingBottom: "56.25%" }} />
	);

	return (
		<>
			<div
				className={outerClasses}
				onClick={(event) => {
					if (event.target === event.currentTarget) {
						toggleOverlay();
					}
				}}
			>
				<div className={playerClasses}>
					<div className={overlay && "flex-1 p-4"}>
						<Media
							className="mt-0"
							media={video}
							{...(thumbnail && { thumbnail: { url: thumbnail } })}
						/>
						{overlay && <Buttons />}
					</div>
				</div>
			</div>
			<div>{(overlay || miniPlayer) && <FakeBlock />}</div>
			{<Buttons />}
			{overlay && <div className="grid grid-cols-3 gap-4"></div>}
		</>
	);
}
