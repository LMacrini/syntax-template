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

export default function Video(video) {
	const [miniPlayer, setMiniPlayer] = useState(false);
	const toggleMiniPlayer = () => {
		setMiniPlayer(!miniPlayer);
	};
	const [thumbnail, setThumbnail] = useState(
		"https://vectorified.com/images/loading-icon-png-20.png"
	);

	const { src } = video;

	const playerClasses = `
    ${miniPlayer && "fixed bottom-4 right-4 w-64 h-36 z-50"}
    `;

	useEffect(() => {
		async function fetchThumbnail() {
			const thumb = await getVideoThumbnail(src);
			if (thumb) {
				setThumbnail(thumb);
			}
		}
		fetchThumbnail();
	}, [src]);

	return (
		<>
			<div className={playerClasses}>
				<Media media={video} thumbnail={{ url: thumbnail }} />
			</div>
			{miniPlayer && (
				<div className="bg-black" style={{ paddingBottom: "56.25%" }} />
			)}
			<button onClick={toggleMiniPlayer}>Mini Player</button>
		</>
	);
}
