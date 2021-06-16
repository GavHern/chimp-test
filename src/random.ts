export default function generateRandomNumbers(max, amount): number[] {
	let arr = [];

	while(arr.length < amount){
		var r = Math.floor(Math.random() * (max));
		if(arr.indexOf(r) === -1) arr.push(r);
	}

	return arr;
}