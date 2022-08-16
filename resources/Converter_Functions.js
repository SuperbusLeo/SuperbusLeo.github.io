export function stateToAbbreviation(state, specialList) 
{
	for (var key of Object.keys(specialList)) 
	{
		if (state === key) 
		{
			return specialList[key];
			//stateAbbList
		}
	}
}

export function WCClassCheck(codeCheck, specialList) 
{
  //Pretty much this is the only necessary part of the code.
	//This will take the JSON and check for the key,it will end early given it finds the matching key and returns the object.
	for (var key of Object.keys(specialList)) 
	{
		if (codeCheck === key) 
		{
			return specialList[key] + "%";
			//checkList
		}
	}
	if (document.getElementById('wcClassCodeMissing').value.length === 0) 
	{
		return 0;
	}
	return parseFloat(document.getElementById('wcClassCodeMissing').value);
}

export function SUIConverter(stateLocal, specialList) 
{
  for (var key of Object.keys(specialList)) 
  {
		if (stateLocal === key) 
		{
			return specialList[key];
			//stateList
		}
	}
}

export function FinanceCreditDeclaration(inputVal) 
{
	if (inputVal === "Net 0") 
	{
  	return [0, "No Credit App Needed"];
  } 
  else if (inputVal === "Net 7") 
  {
  	return [0.0025,"Credit App Needed"];
  } 
  else if (inputVal === "Net 14" || inputVal === "Net 15" || inputVal === "Net 20" || inputVal === "Net 21") 
  {
  	return [0.005,"Credit App Needed"];
  } 
  else if (inputVal === "Net 25") 
  {
  	return [0.0075,"Credit App Needed"];
  } 
  else if (inputVal === "Net 30") 
  {
  	return [0.01,"Credit App Needed"];
  } 
  else if (inputVal === "Net 45") 
  {
  	return [0.0175,"Credit App Needed,CFO Approval"];
  } 
  else if (inputVal === "Net 60") 
  {
  	return [0.03,"Credit App Needed,CFO & CEO Approval"];
  }
}