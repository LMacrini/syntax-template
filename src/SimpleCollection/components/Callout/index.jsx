import React from "react";
import clsx from "clsx";

import { Icon } from "../Icon";
import Parser from "../SimpleParser";

const styles = {
	info: {
		container:
			"bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10",
		title: "text-sky-900 dark:text-sky-400",
		body: "text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300",
	},
	warning: {
		container:
			"bg-amber-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10",
		title: "text-amber-900 dark:text-amber-500",
		body: "text-amber-800 [--tw-prose-underline:theme(colors.amber.400)] [--tw-prose-background:theme(colors.amber.50)] prose-a:text-amber-900 prose-code:text-amber-900 dark:text-slate-300 dark:[--tw-prose-underline:theme(colors.sky.700)] dark:prose-code:text-slate-300",
	},
};

const icons = {
	info: (props) => <Icon icon="lightbulb" {...props} />,
	warning: (props) => <Icon icon="warning" color="amber" {...props} />,
};

export default function Callout(props) {
	if (props === undefined) {
		return;
	}

	const {
		block: {
      content: { content },
			main: {
				header: { title },
				body: { paragraphs },
			},
		},
	} = props;

	let { type } = props.block.getBlockProperties();

	if (!(type in icons)) {
		type = "info";
	}
	let IconComponent = icons[type];

	return (
		<div className={clsx("my-8 flex rounded-3xl p-6", styles[type].container)}>
			<IconComponent className="h-8 w-8 flex-none" />
			<div className="ml-4 flex-auto">
				<p className={clsx("m-0 font-display text-xl", styles[type].title)}>
					{title}
				</p>
				<div className={clsx("prose mt-2.5", styles[type].body)}>
					{content.map((paragraph) => (
						<Parser text={paragraph} />
					))}
				</div>
			</div>
		</div>
	);
}
