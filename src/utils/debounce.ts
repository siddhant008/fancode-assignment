/* eslint-disable @typescript-eslint/no-explicit-any */
let timeout: ReturnType<typeof setTimeout> | null;
function debounce(func: any, wait = 1000) {
	return function (...args: any[]) {
		clearTimeout(timeout!);
		timeout = setTimeout(function () {
			timeout = null;
			func(...args);
		}, wait);
	};
}
export default debounce;
