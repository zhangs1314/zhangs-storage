function fetch (id) {
	return document.getElementById (id);
}
function fetchByTagName (tagName) {
	return document.getElementsByTagName (tagName);
}
function fetchByTitle (tagName, title) {
	var elements = fetchByTagName (tagName), i, element, title, newElements = new Array ();
	for (i = 0; i < elements.length; i ++) {
		element = elements [i];
		if (element.title == title) {
			newElements.push (element);
		}
	}
	return newElements;
}
function getLeft (element) {
	var left = element.offsetLeft;
	if (element.tagName.toLowerCase () != "body") {
		element = element.parentNode;
		left += getLeft (element);
	}
	return left;
}
function getTop (element) {
	var top = element.offsetTop;
	if (element.tagName.toLowerCase () != "body") {
		element = element.parentNode;
		top += getTop (element);
	}
	return top;
}