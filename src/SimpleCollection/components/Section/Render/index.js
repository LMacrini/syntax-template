import React, { Fragment } from "react";
import Divider from "./Divider";
import Image from "./Image";
import Video from "./Video";
import styles from "../Section.module.scss";
import Warning from "./Warning";
import { stripTags } from "@uniwebcms/module-sdk";
import { Highlight } from "prism-react-renderer";
import clsx from "clsx";

const Render = function (props) {
	const { block, content, page } = props;
	const { params } = block;

	const blockId = block.id;

	if (!content || !content.length) return null;

	return content.map((block, index) => {
		const { type, content, language = "" } = block;

		switch (type) {
			case "paragraph":
				return (
					<p
						className={(params.lead === "true" ? "lead " : "") + styles.Block}
						key={index}
						dangerouslySetInnerHTML={{ __html: content }}
					></p>
				);
			case "heading":
				const { level } = block;
				const Heading = `h${level}`;

				const style =
					level === 1 ? `text-4xl` : level === 2 ? `text-3xl` : "text-2xl";

				return (
					<Heading
						key={index}
						id={`${stripTags(content).replace(/\s/g, "-").toLowerCase()}`}
						// className={`${style}` + ` ${styles.Block}`}
						dangerouslySetInnerHTML={{ __html: content }}
					></Heading>
				);
			case "image":
				return <Image key={index} {...block} page={page} />;
			case "video":
				return <Video key={index} {...block} page={page} />;
			case "warning":
				return <Warning key={index} {...block} />;
			case "divider":
				return <Divider key={index} {...block} />;
			case "orderedList":
				return (
					<ol key={index} className={`list-decimal` + ` ${styles.Block}`}>
						{content.map((item, i) => {
							return (
								<li key={i}>
									<Render {...props} content={item} />
								</li>
							);
						})}
					</ol>
				);
			case "bulletList":
				return (
					<ul key={index} className={`list-disc` + ` ${styles.Block}`}>
						{content.map((item, i) => {
							return (
								<li key={i}>
									<Render {...props} content={item} />
								</li>
							);
						})}
					</ul>
				);
			case "blockquote":
				return (
					<blockquote key={index} className={styles.Block}>
						<Render {...props} content={content} />
					</blockquote>
				);

			case "codeBlock":
				return (
					<Highlight
						code={content.trimEnd()}
						language={language}
						theme={{ plain: {}, styles: [] }}
					>
						{({ className, style, tokens, getTokenProps }) => (
							<pre
								className={clsx(
									"rounded-xl bg-slate-900 shadow-lg dark:bg-slate-800/60 dark:shadow-none dark:ring-1 dark:ring-slate-300/10 text-base p-[12px] pl-[16px] pr-[16px]",
									className
								)}
								style={style}
							>
								<code>
									{tokens.map((line, lineIndex) => (
										<Fragment key={lineIndex}>
											{line
												.filter((token) => !token.empty)
												.map((token, tokenIndex) => (
													<span
														key={tokenIndex}
														{...getTokenProps({ token })}
													/>
												))}
											{"\n"}
										</Fragment>
									))}
								</code>
							</pre>
						)}
					</Highlight>
				);
		}
	});
};

export default Render;
