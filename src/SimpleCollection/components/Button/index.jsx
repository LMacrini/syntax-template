import React from "react";
import {Link} from "@uniwebcms/module-sdk";
import clsx from "clsx";

const variantStyles = {
	primary:
		"rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500",
	secondary:
		"rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400",
};

function EmptyButton({ variant, ...props }) {
	// const variant = 'primary'
	let className = "";
	className = clsx(variantStyles[variant], className);

	return typeof props.href === "undefined" ? (
		<button className={className} {...props} />
	) : (
		<Link className={className} {...props} />
	);
}

export default function Button(props) {
	if (props.type !== "manual") {
		let { type, href } = props.block.getBlockProperties();
		if (!(type in variantStyles)) {
			type = "primary";
		}
		const {
			block: {
				main: {
					body: { paragraphs },
				},
			},
		} = props;
		return (
			<EmptyButton href={href} variant={type} {...props}>
				{paragraphs.join("\n").trim()}
			</EmptyButton>
		);
	}
  return <EmptyButton variant="primary" {...props}/>
}
