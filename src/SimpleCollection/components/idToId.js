export default function idToId(innerId, outerId, before) {
	const innerDiv = document.getElementById(innerId);
	const outerDiv = document.getElementById(outerId);


	if (outerDiv && innerDiv) {
		// while (innerDiv.firstChild) {
		// 	outerDiv.append(innerDiv.firstChild);
		// }

		const childNodes = Array.from(innerDiv.childNodes);

		childNodes.forEach((node) => {
			if (node.parentNode === innerDiv) {
				before ? outerDiv.insertBefore(node, document.getElementById(before)): outerDiv.appendChild(node);
			}
		});
		// innerDiv.remove();
	}
}
