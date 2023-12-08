import {iOSdarwinList} from './Darwin-iOS-list.js'

export function iOSInfoFrom(uastring) {
	for (const {version, regex} of iOSdarwinList) {
		if (uastring.match(new RegExp(regex)) != null) {
			return { version }
		}
	}
}