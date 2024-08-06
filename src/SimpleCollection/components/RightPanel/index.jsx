"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Link, stripTags } from "@uniwebcms/module-sdk";
import clsx from "clsx";

function normalizeId(string) {
	return stripTags(string).replace(/\s/g, "-").toLowerCase();
}

function ToC(sections) {
	return sections
		.map((section) => {
			const result = [];
			let currentParent = null;

			section.content?.content
				?.filter((part) => part.type === "heading" && part.attrs?.level > 1)
				.forEach((header) => {
					const text = header.content.map((obj) => obj.text).join("");
					if (header.attrs.level === 2) {
						currentParent = {
							id: normalizeId(text),
							level: 2,
							title: text,
							children: [],
						};
						result.push(currentParent);
					} else if (header.attrs.level === 3 && currentParent) {
						currentParent.children.push({
							id: normalizeId(text),
							level: 3,
							title: text,
						});
					}
				});

			return result;
		})
		.flat();
}

export default function RightPanel(props) {
	const { page } = props;
	const sections = page.blockGroups.body.filter(
		(element) => element.Component.name === "Section"
	);
	const tableOfContents = ToC(sections);

	let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id);

	let getHeadings = useCallback((tableOfContents) => {
		return tableOfContents
			.flatMap((node) => [node.id, ...node.children.map((child) => child.id)])
			.map((id) => {
				let el = document.getElementById(id);
				if (!el) return null;

				let style = window.getComputedStyle(el);
				let scrollMt = parseFloat(style.scrollMarginTop);

				let top = window.scrollY + el.getBoundingClientRect().top - scrollMt;
				return { id, top };
			})
			.filter((x) => x !== null);
	}, []);

	useEffect(() => {
		if (tableOfContents.length === 0) return;
		let headings = getHeadings(tableOfContents);
		function onScroll() {
			let top = window.scrollY;
			let current = headings[0]?.id;
			for (let heading of headings) {
				if (top >= heading.top - 10) {
					current = heading.id;
				} else {
					break;
				}
			}
			setCurrentSection(current);
		}
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, [getHeadings, tableOfContents]);

	function isActive(section) {
		if (section.id === currentSection) {
			return true;
		}
		if (!section.children) {
			return false;
		}
		return section.children.findIndex(isActive) > -1;
	}

	return (
		<div className="hidden xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
			<nav aria-labelledby="on-this-page-title" className="w-56">
				{tableOfContents.length > 0 && (
					<>
						<h2
							id="on-this-page-title"
							className="font-display text-sm font-medium text-slate-900 dark:text-white"
						>
							On this page
						</h2>
						<ol role="list" className="mt-4 space-y-3 text-sm">
							{tableOfContents.map((section) => (
								<li key={section.id}>
									<h3>
										<Link
											href={`#${section.id}`}
											className={clsx(
												isActive(section)
													? "text-sky-500"
													: "font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
											)}
										>
											{section.title}
										</Link>
									</h3>
									{section.children.length > 0 && (
										<ol
											role="list"
											className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
										>
											{section.children.map((subSection) => (
												<li key={subSection.id}>
													<Link
														href={`#${subSection.id}`}
														className={
															isActive(subSection)
																? "text-sky-500"
																: "hover:text-slate-600 dark:hover:text-slate-300"
														}
													>
														{subSection.title}
													</Link>
												</li>
											))}
										</ol>
									)}
								</li>
							))}
						</ol>
					</>
				)}
			</nav>
		</div>
	);
}
