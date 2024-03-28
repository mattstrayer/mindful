// Not needed because of the Models static methods to init from Objects

// function transformDates(items: Array<Date | string>, dateKeys: Array<string>) {
// 	return items.map((item) => {
// 		for (const key in Object.keys(item)) {
// 			if (dateKeys.includes(key)) {
// 				item[key] = stringToDate(item[key]);
// 			}
// 		}

// 		return item;
// 	});
// }

// function stringToDate(value: string): Date {
// 	return new Date(value);
// }

// export default {
// 	transformDates,
// };
