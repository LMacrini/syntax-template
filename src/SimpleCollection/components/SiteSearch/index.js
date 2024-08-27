import React, { useState, useEffect, useRef, useCallback } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import ResultItem from "./ResultItem";
import FlexSearch from "flexsearch";

function SearchIcon(props) {
	return (
		<svg aria-hidden="true" viewBox="0 0 20 20" {...props}>
			<path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z" />
		</svg>
	);
}

const SearchBox = (props) => {
	const { input, setInput, website, handleKeyDown, box } = props;

	useEffect(() => {
		if (box.current) {
			box.current.focus();
		}
	}, []);

	const placeholder = website.localize({
		en: "Find something...",
		fr: "Trouvez quelque chose...",
	});

	return (
		<div className="group relative flex h-12">
			<SearchIcon
				onClick={() => {
					handleSearch(input);
				}}
				className="cursor-pointer absolute left-4 top-0 h-full w-5 fill-slate-400 dark:fill-slate-500"
			/>
			<input
				className={`flex-auto appearance-none bg-transparent pl-12 text-slate-900 outline-none placeholder:text-slate-400 focus:w-full focus:flex-none sm:text-sm dark:text-white [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden pr-4`}
				placeholder={placeholder}
				value={input}
				ref={box}
				onChange={(e) => {
					setInput(e.target.value);
				}}
				onKeyDown={handleKeyDown}
			/>
		</div>
	);
};

const SearchResult = React.memo((props) => {
	const { input, result, website, setResult, searchFn, box } = props;
	const [fallback, setFallback] = useState(null);
	const [ariaSelected, setAriaSelected] = useState(0);
	const navigate = useNavigate();

	const listRef = useRef(null);

	const switchAriaSelected = (index) => () => {
		setAriaSelected(index);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setAriaSelected(null);

			const result = searchFn(input);
			if (result instanceof Promise) {
				result.then((data) => {
					setResult(data);
				});
			} else {
				setResult(result);
			}

			if (input === "") {
				setFallback(null);
			} else {
				setFallback(
					<p className="px-4 py-8 text-center text-sm text-slate-700 dark:text-slate-400">
						No results for &ldquo;
						<span className="break-words text-slate-900 dark:text-white">
							{input}
						</span>
						&rdquo;
					</p>
				);
			}
		}, 250);

		return () => clearTimeout(timer);
	}, [input]);

	const hits = result?.[0]?.result;

	if (result) {
		if (!result.length) return fallback;

		if (!hits.length) return fallback;
	} else {
		return null;
	}

	const handleKeyDown = (e) => {
		if (ariaSelected === null && hits.length > 0) {
			setAriaSelected(0);
		} else if (e.key === "ArrowDown") {
			setAriaSelected((prevIndex) =>
				prevIndex === hits.length - 1 ? 0 : prevIndex + 1
			);
			listRef.current.focus();
		} else if (e.key === "ArrowUp") {
			setAriaSelected((prevIndex) =>
				prevIndex === 0 ? hits.length - 1 : prevIndex - 1
			);
		} else if (e.key === "Enter") {
			const selectedItem = listRef.current.querySelector(
				`[aria-selected="true"]`
			);
			const route = selectedItem?.getAttribute("data-route");

			if (route) {
				navigate(route);
			}
		} else {
			box.current.focus();
		}
	};

	return (
		<ul
			ref={listRef}
			onKeyDown={handleKeyDown}
			role="listbox"
			tabIndex={0}
			className="max-h-80 overflow-y-auto focus:outline-none"
		>
			{hits.map((item, i) => {
				return (
					<ResultItem
						key={i}
						website={website}
						aria-selected={ariaSelected === i ? "true" : "false"}
						onMouseEnter={switchAriaSelected(i)}
						{...item?.doc}
					/>
				);
			})}
		</ul>
	);
});

const SearchKit = (props) => {
	const [result, setResult] = useState(null);
	const [input, setInput] = useState("");
	const box = useRef(null);

	const handleKeyDown = (e) => {
		if (e.key === "ArrowDown" && result && result.length) {
			e.preventDefault(); // Prevent default scrolling behavior
			document.querySelector("[role='listbox']").focus();
		}
	};

	return (
		<>
			<SearchBox
				{...props}
				result={result}
				setResult={setResult}
				input={input}
				setInput={setInput}
				handleKeyDown={handleKeyDown}
				box={box}
			/>
			<div className="border-t border-slate-200 bg-white px-2 py-3 empty:hidden dark:border-slate-400/10 dark:bg-slate-800">
				<SearchResult {...{ input, result, setResult, box, ...props }} />
			</div>
		</>
	);
};

function useSearchProps() {
	let buttonRef = useRef(null);
	let [open, setOpen] = useState(false);

	return {
		buttonProps: {
			ref: buttonRef,
			onClick() {
				setOpen(true);
			},
		},
		dialogProps: {
			open,
			setOpen: useCallback((open) => {
				let { width = 0, height = 0 } =
					buttonRef.current?.getBoundingClientRect() ?? {};
				if (!open || (width !== 0 && height !== 0)) {
					setOpen(open);
				}
			}, []),
		},
	};
}

const Search = (props) => {
	const { website, iconPosition = "center" } = props;

	let [modifierKey, setModifierKey] = useState();
	let { buttonProps, dialogProps } = useSearchProps();

	let [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setModifierKey(
			/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? "⌘" : "Ctrl "
		);
	}, []);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	const { useLocation } = website.getRoutingComponents();
	const location = useLocation();

	const path = location.pathname;

	const [searcher, setSearcher] = useState(null);

	const query = useCallback(
		(text) => {
			if (!searcher) {
				return website.getSearchData().then((data) => {
					const index = new FlexSearch.Document({
						document: {
							id: "href",
							index: ["content"],
							store: [
								"href",
								"title",
								"description",
								"route",
								"content",
								"contentType",
								"viewType",
								"contentId",
								"banner",
								"avatar",
							],
						},
						cache: true,
						tokenize: "forward",
					});

					const add = (sequential_data) => {
						for (let x = 0, data; x < sequential_data.length; x++) {
							data = sequential_data[x];

							index.add({
								...data,
								content: `${data.title} ${data.description} ${data.content}`,
							});
						}
					};

					add(data);

					setSearcher(index);

					if (website) {
						website.submitEvent("search", {
							search_term: text,
						});
					}

					return processResults(
						text,
						index.search(text, {
							enrich: true,
						})
					);
				});
			} else {
				if (website) {
					website.submitEvent("search", {
						search_term: text,
					});
				}

				return processResults(
					text,
					searcher.search(text, {
						enrich: true,
					})
				);
			}
		},
		[searcher]
	);

	const processResults = (text, documents) => {
		if (documents[0] == null) return documents;
		return [
			{
				...documents[0],
				result: documents[0].result.map(({ doc, ...rest }) => {
					const sentences = doc.content.split(/[.!?\|]/);
					const matchingSentence = sentences
						.find((sentence) =>
							sentence.toLowerCase().includes(text.toLowerCase())
						)
						?.trim();

					return {
						...rest,
						doc: {
							...doc,
							content: matchingSentence || "",
							query: text,
						},
					};
				}),
			},
		];
	};

	useEffect(() => {
		if (isOpen) {
			return;
		}

		function onKeyDown(event) {
			if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				openModal();
			}
		}

		window.addEventListener("keydown", onKeyDown);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [isOpen, setIsOpen]);

	useEffect(() => {
		if (isOpen) {
			closeModal();
		}
	}, [path]);

	return (
		<>
			<button
				type="button"
				className="group flex h-6 w-6 items-center justify-center sm:justify-start md:h-auto md:w-80 md:flex-none md:rounded-lg md:py-2.5 md:pl-4 md:pr-3.5 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-300 lg:w-96 dark:md:bg-slate-800/75 dark:md:ring-inset dark:md:ring-white/5 dark:md:hover:bg-slate-700/40 dark:md:hover:ring-slate-500"
				{...buttonProps}
				onClick={openModal}
			>
				<SearchIcon className="h-5 w-5 flex-none fill-slate-400 group-hover:fill-slate-500 md:group-hover:fill-slate-400 dark:fill-slate-500" />
				<span className="sr-only md:not-sr-only md:ml-2 md:text-slate-500 md:dark:text-slate-400">
					Search docs
				</span>
				{modifierKey && (
					<kbd className="ml-auto hidden font-medium text-slate-400 md:block dark:text-slate-500">
						<kbd className="font-sans">{modifierKey}</kbd>
						<kbd className="font-sans">K</kbd>
					</kbd>
				)}
			</button>
			<Dialog
				open={isOpen}
				as="div"
				className={`relative inset-0 z-50`}
				onClose={closeModal}
			>
				<div className="fixed inset-0 bg-slate-900/50 backdrop-blur" />
				<div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
					<Dialog.Panel className="mx-auto transform-gpu overflow-hidden rounded-xl bg-white shadow-xl sm:max-w-xl dark:bg-slate-800 dark:ring-1 dark:ring-slate-700">
						<div
							aria-expanded={false}
							aria-haspopup="listbox"
							role="combobox"
							/* aria-labelledby */
						>
							<SearchKit website={website} searchFn={query} />
						</div>
					</Dialog.Panel>
				</div>
			</Dialog>
		</>
	);
};

export default Search;
