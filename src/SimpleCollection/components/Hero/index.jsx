import React, { useEffect } from "react";
import ImageRenderer from "../ImageRenderer";
import clsx from "clsx";
import { Highlight } from "prism-react-renderer";

import idToId from "../idToId";
import Button from "../Button";
// import { HeroBackground } from '@/components/HeroBackground'
// import blurCyanImage from "./blur-cyan.png";
// import blurIndigoImage from "./blur-indigo.png";

export default function Hero(props) {
	const {
		block,
		block: {
			mainHeader,
			content: { content },
		},
	} = props;
	const ChildBlock = block.getChildBlockRenderer();
	const image = content[0];
	const buttons = content
		.filter(
			(item) =>
				item.type === "paragraph" &&
				item.content.some(({ marks }) =>
					marks?.some((mark) => mark.type === "link")
				)
		)
		.map((item) => item.content);

	const getButtonLink = (button) => {
		const marks = button.find(({ marks }) =>
			marks.some((mark) => mark.type === "link")
		).marks;

		return marks.find((mark) => mark.type === "link").attrs.href;
	};

	useEffect(() => {
		idToId(`Section${block.childBlocks[0].id}`, `childBlocks${block.id}`);
	}, []);

	return (
		<div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.75rem] dark:pb-32 dark:pt-[4.75rem]">
			<div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
				<div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
					<div className="relative z-10 md:text-center lg:text-left">
						{/* <Image
                  className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50"
                  src={blurCyanImage}
                  alt=""
                  width={530}
                  height={530}
                  unoptimized
                  priority
                /> */}
						<div className="relative">
							<p className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
								{mainHeader.title}
							</p>
							<p className="mt-3 text-2xl tracking-tight text-slate-400">
								{mainHeader.description}
							</p>
							<div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
								{buttons.map((button, index) => (
									<Button
										type="manual"
										variant={index ? "secondary" : "primary"}
										href={getButtonLink(button)}
									>
										{button.map((item) => item.text).join("")}
									</Button>
								))}
							</div>
						</div>
					</div>
					<div className="relative lg:static xl:pl-10">
						<div className="absolute inset-x-[-50vw] -bottom-48 -top-32 [mask-image:linear-gradient(transparent,white,white)] lg:-bottom-32 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 lg:[mask-image:none] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
							{/* <HeroBackground className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" /> */}
						</div>
						<div className="relative" id={`childBlocks${block.id}`}>
							{/* <Image
                    className="absolute -right-64 -top-64"
                    src={blurCyanImage}
                    alt=""
                    width={530}
                    height={530}
                    unoptimized
                    priority
                  /> */}
							{/* <Image
                    className="absolute -bottom-40 -right-44"
                    src={blurIndigoImage}
                    alt=""
                    width={567}
                    height={567}
                    unoptimized
                    priority
                  /> */}
							<ChildBlock
								block={block}
								childBlocks={block.childBlocks.slice(0, 1)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
