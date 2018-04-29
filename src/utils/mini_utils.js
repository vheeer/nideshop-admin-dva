//
export function boolToNum(bool) {
	let result = null;
	if(typeof bool === "boolean"){
		if(bool === false)
			result = 0;
		else if(bool === true)
			result = 1;
	}else{

	}
	return result;
}
export function numToBool(number) {
	let result = null;
	if(typeof number === "number"){
		if(number === 0)
			result = false;
		else if(number === 1)
			result = true;
	}else{
		
	}
	return result;
}
export function objToParams(obj) {
	let str = "";
	for(let key in obj)
	{
		if(obj[key] !== undefined)
			str += key + "=" + obj[key] + "&";
	}
	str = str.substr(0, str.length - 1);
	return str;
}

export function getDiff(nextObj, currentObj) {
	const diff = [];
	for(const key in nextObj)
	{
    	if(nextObj[key] !== currentObj[key])
    		diff.push(key);
    }
    return diff;
}