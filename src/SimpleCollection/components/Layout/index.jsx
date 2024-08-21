import React from "react";

import Prose from "../Prose";
import DocsHeader from "../DocsHeader";

export default function Layout(props) {
	const { page, header, footer, body, leftPanel, rightPanel } = props;

	return (
		<div className="flex w-full flex-col">
			{header}
			<div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
				{leftPanel}
				<div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
					<article>
						<DocsHeader page={page} />
						<Prose>{body}</Prose>
					</article>
					{footer}
				</div>
				{rightPanel}
			</div>
		</div>
	);
}
