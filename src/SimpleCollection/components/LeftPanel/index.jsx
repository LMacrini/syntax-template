import React from "react";
import clsx from "clsx";
import { Link } from "@uniwebcms/module-sdk";

export default function LeftPanel(props) {
	const {
		website,
		page: { activeRoute },
	} = props;
	const pages = website.getPageHierarchy();

	const className = "";
	return (
		<div className="hidden lg:relative lg:block lg:flex-none h-full">
			<div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
			<div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
			<div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
			<div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
				<nav className={clsx("text-base lg:text-sm", className)}>
					<ul role="list" className="space-y-9">
						{pages.map((section) => (
							<li key={section.id}>
								<h2 className="font-display font-medium text-slate-900 dark:text-white">
									{section.label}
								</h2>
								<ul
									role="list"
									className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
								>
									{section.child_items.map((link) => (
										<li key={link.id} className="relative">
											<Link
												to={link.route}
												className={clsx(
													"block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full",
													link.route === activeRoute
														? "font-semibold text-sky-500 before:bg-sky-500"
														: "text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
												)}
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</div>
	);
}
