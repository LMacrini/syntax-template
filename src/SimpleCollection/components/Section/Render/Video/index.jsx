import React, { useState } from "react";
import { Media } from "@uniwebcms/module-sdk";

export default function Video(video) {
	const [miniPlayer, setMiniPlayer] = useState(false);
	const toggleMiniPlayer = () => {
		setMiniPlayer(!miniPlayer);
	};

	const {src} = video;

	const playerClasses = `
    ${miniPlayer && "fixed bottom-4 right-4 w-64 h-36 z-50"}
    `;

	const youtubeRegex =
		/\b(?:https?:\/\/)?(?:(?:www|m)\.)?youtu(?:\.be\/|be\.com\/(?:watch(?:\?(?:(?:feature=player_embedded|app=desktop)&)?v=|\/)|v\/|oembed\?url=http%3A\/\/www\.youtube\.com\/watch\?v%3D|attribution_link\?a=[0-9A-Za-z\-_]{10,20}&u=(?:%2F|\/)watch%3Fv%3D|e(?:mbed)?\/|shorts\/)|be-nocookie\.com\/embed\/)([0-9A-Za-z\-_]{10,20})/;

	const match = src.match(youtubeRegex);
	const thumbnailUrl = match
		? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
		: null;

	return (
		<>
			<div className={playerClasses}>
				<Media media={video} thumbnail={{ url: thumbnailUrl }} />
			</div>
			{miniPlayer && (
				<div className="bg-black" style={{ paddingBottom: "56.25%" }} />
			)}
			<button onClick={toggleMiniPlayer}>Mini Player</button>
		</>
	);
}
