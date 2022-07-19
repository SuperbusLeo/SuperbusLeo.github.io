export function stateToAbbreviation(state, specialList) {
	for (var key of Object.keys(specialList)) {
		if (state === key) {
			return specialList[key];
			//stateAbbList
		}
	}
}

export function WCClassCheck(codeCheck, specialList) {
  //Pretty much this is the only necessary part of the code.
	//This will take the JSON and check for the key,it will end early given it finds the matching key and returns the object.
	for (var key of Object.keys(specialList)) {
		if (codeCheck === key) {
			return specialList[key] + "%";
			//checkList
		}
	}
	if (document.getElementById('wcClassCodeMissing').value.length === 0) {
		return 0;
	}
	return parseFloat(document.getElementById('wcClassCodeMissing').value);
}

export function SUIConverter(stateLocal, specialList) {
  for (var key of Object.keys(specialList)) {
		if (stateLocal === key) {
			return specialList[key];
			//stateList
		}
	}
}