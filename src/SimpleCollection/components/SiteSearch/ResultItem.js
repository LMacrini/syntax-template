import React from "react";
import { Image, Profile } from "@uniwebcms/module-sdk";
import Highlighter from "react-highlight-words";

function HighlightQuery({ text, query }) {
	return (
		<Highlighter
			highlightClassName="group-hover:underline bg-transparent text-sky-600 dark:text-sky-400"
			searchWords={[query]}
			autoEscape={true}
			textToHighlight={text}
		/>
	);
}

const ResultItem = (props) => {
	const {
		website,
		title,
		description,
		href,
		route,
		banner,
		avatar,
		contentType,
		contentId,
		content,
		query,
	} = props;

	console.log(props);

	const imgType = banner ? "banner" : avatar ? "avatar" : "";
	const version = banner || avatar || "";

	const { Link } = website.getRoutingComponents();

	const profile = Profile.newProfile(
		contentType || "website",
		contentId || website.getSiteId(),
		{
			head: {
				[`_${imgType}`]: version,
			},
		}
	);

	return (
		<li className="group block cursor-default rounded-lg px-9 py-5 hover:bg-slate-100 dark:hover:bg-slate-700/30">
			<Link to={route} className={`text-sm text-slate-700 group-hover:text-sky-600 dark:text-slate-300 dark:group-hover:text-sky-400`}> {/* px9 py5 */}
				<div className={`flex flex-col overflow-hidden`}>
					<span
						className={`text-lg truncate text-[#1a0dab] group-hover:underline`}
					>
						{title}
					</span>
					{/* <span className={`text-base leading-[1.2] truncate text-[#006621]`}>
						{href}
					</span> */}
					{/* <span
					className={`text-sm mt-1.5 leading-[18px] line-clamp-3 text-[#444]`}
                    >
					{content}
                    </span> */}
					<HighlightQuery text={content} query={query} />
				</div>
				{imgType && version ? (
					<div className={`w-[110px] flex-shrink-0 ml-4`}>
						<Image profile={profile} type={imgType}></Image>
					</div>
				) : null}
			</Link>
		</li>
	);
};

export default ResultItem;
