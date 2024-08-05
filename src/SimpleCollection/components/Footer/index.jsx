import React from "react";
import { Link } from "@uniwebcms/module-sdk";
import clsx from "clsx";

function ArrowIcon(props) {
	return (
		<svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
			<path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z" />
		</svg>
	);
}

function PageLink({ label, route, dir = "next", ...props }) {
	return (
		<div {...props}>
			<dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
				{dir === "next" ? "Next" : "Previous"}
			</dt>
			<dd className="mt-1">
				<Link
					href={route}
					className={clsx(
						"flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300",
						dir === "previous" && "flex-row-reverse"
					)}
				>
					{label}
					<ArrowIcon
						className={clsx(
							"h-4 w-4 flex-none fill-current",
							dir === "previous" && "-scale-x-100"
						)}
					/>
				</Link>
			</dd>
		</div>
	);
}

export default function footer(props) {
	const id = props.page.getPageId();
	const hierarchy = props.website.getPageHierarchy({
		nested: false,
		pageOnly: true,
	});
	const index = hierarchy.findIndex((page) => page.id === id);
	if (index === 0 && hierarchy.length === 1) {
		return null;
	}
	return (
		<dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
			{index > 0 && <PageLink dir="previous" {...hierarchy[index - 1]} />}
			{hierarchy[index + 1] !== undefined && (
				<PageLink className="ml-auto text-right" {...hierarchy[index + 1]} />
			)}
		</dl>
	);
}
