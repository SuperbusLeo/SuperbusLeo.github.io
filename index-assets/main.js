//Admittedly obfuscated code that is just ridiculous,I know there is a better way to do this.
//Coming from Python just made it easier without a dictionary to shorten the code this the next best option for raw JS.
import { VariableParseAndCheck, DependentDeclarataion, SkipDivideByZero } from '../resources/Helper_Functions.js';
import { stateToAbbreviation, WCClassCheck, SUIConverter, FinanceCreditDeclaration } from '../resources/Converter_Functions.js'

var stateAbbList;
var stateList;
var checkList;
fetch("./data/State_Abbreviations.json").then(res => res.json()).then(first => stateAbbList = first)
fetch("./data/SUI_Data.json").then(res => res.json()).then(second => stateList = second)
fetch("./data/WC_Data.json").then(res => res.json()).then(third => checkList = third)

//This is a function to pop unncessary input functions,this allows for modifying others much easier and cleaner.\
//Probably a better way of doing this,that may also not require a function.
function popStuff(array) 
{
  let pops = ['requiredInfo','math','errorMessage','additionalContacts','temptoHireHours','taxExemption','totalWeeklyReg','otMarkup','weeklyOTHours','otCap','otOverCap','partyStaffing','partyMarkup','partyWeeklyHours','vms','unbillalbes','billBack','branchOnsite','rebate','transportation','backgroundCheck','drugScreen','ppe','uniforms','billBack2','timeclock','salesCycle','impementation','sui','wcNetRate','FINANCEApprovalPayment','creditLimit','weeklyEstRevenue','simpleGP','weightGPHour','weightGPWeek','payRateRepeat','billRate','markupRepeat','trueGPPercent','weeksToProfit','weeksToWageLimit','hoursToProfit','trueGPDollars']
  for (const element of pops) 
  {
    var index = array.indexOf(element);
    array.splice(index,1);
  }
  return array;
}

//This function is incomplete right now,but it will function to modify all the follow output fields with appropriate information. I want to implement pop ups for when errors do 
//happen,but for now there will only be errors in the output and no explanation.
export function runMath() 
{
	const varToString = varObj => Object.keys(varObj)[0]

  //First section handles direct declarations, things that are just pulled straight in.
  const RECRUIT = 5.5;
  const FICA = 0.0765;
  const FUTA = 0.006;
  const ACA = 0.015;
  let stateSelect = stateToAbbreviation(document.getElementById('stateSale').value, stateAbbList);
  console.log(varToString({stateSelect}), stateSelect);
  let classCodeComplete = stateSelect + (!(document.getElementById('wcClassCode').value) ? '1111' : document.getElementById('wcClassCode').value);
  console.log(varToString({classCodeComplete}), classCodeComplete);
  let SUI = SUIConverter(stateSelect, stateList);
  console.log(varToString({SUI}), SUI);
  let WC = WCClassCheck(classCodeComplete, checkList);
  console.log(varToString({WC}), WC);
  const paymentTerms = document.getElementById('paymentTerms').value
	const FinanceCreditList = FinanceCreditDeclaration(paymentTerms)
  var FINANCE = FinanceCreditList[0];
  console.log(varToString({FINANCE}), FINANCE);
  var creditStatement = FinanceCreditList[1];
  console.log(varToString({creditStatement}), creditStatement);
  let markUpVar = VariableParseAndCheck(document.getElementById('markup').value);
	console.log(varToString({markUpVar}), markUpVar);
  let payRateVar = VariableParseAndCheck(document.getElementById('payRate').value);
	console.log(varToString({payRateVar}), payRateVar);
  let employeesVar = VariableParseAndCheck(document.getElementById('totalEmployees').value);
	console.log(varToString({employeesVar}), employeesVar);
  let rolloverEEVar = VariableParseAndCheck(document.getElementById('rolloverEE').value);
	console.log(varToString({rolloverEEVar}), rolloverEEVar);
  let estimatedWeeklyTurnoverVar = VariableParseAndCheck(document.getElementById('turnover').value);
	console.log(varToString({estimatedWeeklyTurnoverVar}), estimatedWeeklyTurnoverVar);
  let weeklyOTHoursPaidVar = VariableParseAndCheck(document.getElementById('weeklyOTHours').value);
	console.log(varToString({weeklyOTHoursPaidVar}), weeklyOTHoursPaidVar);
  let transportationVar = VariableParseAndCheck(document.getElementById('transportation').value);
	console.log(varToString({transportationVar}), transportationVar);
  let unbillablesVar = VariableParseAndCheck(document.getElementById('unbillables').value);
	console.log(varToString({unbillablesVar}), unbillablesVar);
  let billBackVar = VariableParseAndCheck(document.getElementById('billBack').value);
	console.log(varToString({billBackVar}), billBackVar);
  let branchOnsiteVar = VariableParseAndCheck(document.getElementById('branchOnsite').value);
	console.log(varToString({branchOnsiteVar}), branchOnsiteVar);
  let rebateVar = VariableParseAndCheck(document.getElementById('rebate').value);
	console.log(varToString({rebateVar}), rebateVar);
  let PPEVar = VariableParseAndCheck(document.getElementById('ppe').value);
	console.log(varToString({PPEVar}), PPEVar);
  let uniformsVar = VariableParseAndCheck(document.getElementById('uniforms').value);
	console.log(varToString({uniformsVar}), uniformsVar);
  let billBack2Var = VariableParseAndCheck(document.getElementById('billBack2').value);
	console.log(varToString({billBack2Var}), billBack2Var);
  let timeclocksVar = VariableParseAndCheck(document.getElementById('timeclock').value);
	console.log(varToString({timeclocksVar}), timeclocksVar);
  let salesCycleVar = VariableParseAndCheck(document.getElementById('salesCycle').value);
	console.log(varToString({salesCycleVar}), salesCycleVar);
  let implementationVar = VariableParseAndCheck(document.getElementById('implementation').value);
	console.log(varToString({implementationVar}), implementationVar);
  let backgroundCheckVar = VariableParseAndCheck(document.getElementById('backgroundCheck').value);
	console.log(varToString({backgroundCheckVar}), backgroundCheckVar);
  let drugScreenVar = VariableParseAndCheck(document.getElementById('drugScreen').value);
  console.log(varToString({drugScreenVar}), drugScreenVar);
  let VMS = VariableParseAndCheck(document.getElementById('vms').value);
	console.log(varToString({VMS}), VMS);
  
	//Everything here depends on something else, these shouldn't return NaN but always could, make sure to find them if they occur, they ruin everything.
	let regWeeklyHoursVar = DependentDeclarataion(document.getElementById('totalWeeklyReg').value, employeesVar * 32);
	console.log(varToString({regWeeklyHoursVar}), regWeeklyHoursVar);
  let otMarkUpVar = DependentDeclarataion(document.getElementById('otMarkup').value, markUpVar);
	console.log(varToString({otMarkUpVar}), otMarkUpVar);
  let weeklyOTHoursBillVar = weeklyOTHoursPaidVar - VariableParseAndCheck(document.getElementById('otOverCap').value);
  console.log(varToString({weeklyOTHoursBillVar}), weeklyOTHoursBillVar);
  
	//The following are all computations from the original spread sheet. This will definitely require optimization and will be cleaned up over time.
	let totalPerEEVar = backgroundCheckVar + drugScreenVar + PPEVar + uniformsVar + RECRUIT + billBackVar;
	console.log(varToString({totalPerEEVar}), totalPerEEVar);
  let eeStartCostVar = rolloverEEVar === 0 ? ((employeesVar - rolloverEEVar) * totalPerEEVar) : 0;
	console.log(varToString({eeStartCostVar}), eeStartCostVar);
  let totalUpfrontCostVar = timeclocksVar + salesCycleVar + implementationVar + eeStartCostVar;
	console.log(varToString({totalUpfrontCostVar}), totalUpfrontCostVar);
  let otPayRateVar = payRateVar * 1.5;
	console.log(varToString({otPayRateVar}), otPayRateVar);
  let otBillRateVar = otPayRateVar * (1 + (otMarkUpVar / 100));
	console.log(varToString({otBillRateVar}), otBillRateVar);
  let otBillVar = weeklyOTHoursBillVar *  otBillRateVar;
	console.log(varToString({otBillVar}), otBillVar);
  let billRateVar = payRateVar * (1 + (markUpVar / 100));
	console.log(varToString({billRateVar}), billRateVar);
  let otPay = weeklyOTHoursPaidVar * otPayRateVar;
	console.log(varToString({otPay}), otPay);
  let otGPPerHourVar = otBillRateVar - otPayRateVar - (otPayRateVar * FICA + otPayRateVar * FUTA + otPayRateVar * SUI + (otPayRateVar * (WC / 100)) + otPayRateVar * ACA + otPayRateVar * VMS + otPayRateVar * FINANCE);
	console.log(varToString({otGPPerHourVar}), otGPPerHourVar);
  let otWeeklyMarginVar = otGPPerHourVar * weeklyOTHoursPaidVar;
	console.log(varToString({otWeeklyMarginVar}), otWeeklyMarginVar);
  let regGPPerHourVar = billRateVar - payRateVar - (payRateVar * FICA + payRateVar * FUTA + payRateVar * SUI + (payRateVar * (WC / 100)) + payRateVar * ACA + payRateVar * VMS + payRateVar * FINANCE);
  console.log(varToString({regGPPerHourVar}), regGPPerHourVar);
  var weekly3rdPartyHoursVar = 0;
	var partyMarkUpVar = 0;
	var partyBillRateVar = 0;
	var partyPayRateVar = 0;
	if (document.getElementById('partyStaffing').value === "yes") 
	{
		weekly3rdPartyHoursVar = VariableParseAndCheck(document.getElementById('partyWeeklyHours').value);
		partyMarkUpVar = VariableParseAndCheck(document.getElementById('partyMarkup').value);
		partyBillRateVar = billRateVar;
		partyPayRateVar = payRateVar * (1 + markUpVar / 100)
	}
	console.log(varToString({weekly3rdPartyHoursVar}), weekly3rdPartyHoursVar);
  console.log(varToString({partyMarkUpVar}), partyMarkUpVar);
  console.log(varToString({partyBillRateVar}), partyBillRateVar);
  console.log(varToString({partyPayRateVar}), partyPayRateVar);
	let weeklyVendorPayVar = weekly3rdPartyHoursVar * partyPayRateVar;
	console.log(varToString({weeklyVendorPayVar}), weeklyVendorPayVar);
  let weeklyPartyTotalBill = weekly3rdPartyHoursVar * weekly3rdPartyHoursVar * partyPayRateVar;
	console.log(varToString({weeklyPartyTotalBill}), weeklyPartyTotalBill);
  let partyWeeklyMarginVar = weeklyPartyTotalBill - weeklyVendorPayVar;
	console.log(varToString({partyWeeklyMarginVar}), partyWeeklyMarginVar);
  let partyGPPerHour = !(partyWeeklyMarginVar / weekly3rdPartyHoursVar) ? 0 : partyWeeklyMarginVar / weekly3rdPartyHoursVar;
	console.log(varToString({partyGPPerHour}), partyGPPerHour);
  let totalWeeklyHours = regWeeklyHoursVar  + weekly3rdPartyHoursVar + weeklyOTHoursPaidVar;
	console.log(varToString({totalWeeklyHours}), totalWeeklyHours);
  let eeTurnoverCost = employeesVar * (estimatedWeeklyTurnoverVar / 100) * totalPerEEVar;
	console.log(varToString({eeTurnoverCost}), eeTurnoverCost);
  let totalPerWeek = transportationVar + unbillablesVar + billBackVar + branchOnsiteVar + rebateVar + eeTurnoverCost;
	console.log(varToString({totalPerWeek}), totalPerWeek);
  let weeklyEstimateRevenue = (billRateVar * regWeeklyHoursVar) + (weeklyOTHoursPaidVar * otBillRateVar) + (weekly3rdPartyHoursVar * otBillRateVar);
	console.log(varToString({weeklyEstimateRevenue}), weeklyEstimateRevenue);
  let gpWeightedPerHour = (regGPPerHourVar * regWeeklyHoursVar / totalWeeklyHours) + (partyGPPerHour * weekly3rdPartyHoursVar / totalWeeklyHours) + (otGPPerHourVar * weeklyOTHoursPaidVar / totalWeeklyHours);
	console.log(varToString({gpWeightedPerHour}), gpWeightedPerHour);
  let simpleGPNumber = 100 * SkipDivideByZero(gpWeightedPerHour / (billRateVar * SkipDivideByZero(regWeeklyHoursVar / totalWeeklyHours))) + (otBillRateVar * SkipDivideByZero(weeklyOTHoursPaidVar / totalWeeklyHours)) + (partyBillRateVar * SkipDivideByZero(weekly3rdPartyHoursVar / totalWeeklyHours));
	console.log(varToString({simpleGPNumber}), simpleGPNumber);
  let gpWeightedPerWeek = gpWeightedPerHour * totalWeeklyHours
	console.log(varToString({gpWeightedPerWeek}), gpWeightedPerWeek);
  let trueGrossProfitDollar = gpWeightedPerWeek - totalPerWeek;
	console.log(varToString({trueGrossProfitDollar}), trueGrossProfitDollar);
  let trueGrossProfitPercent = SkipDivideByZero(trueGrossProfitDollar / weeklyEstimateRevenue) * 100;
	console.log(varToString({trueGrossProfitPercent}), trueGrossProfitPercent);
  let weeksToProfitVar = SkipDivideByZero(totalUpfrontCostVar / trueGrossProfitDollar);
	console.log(varToString({weeksToProfitVar}), weeksToProfitVar);
  var extraNumber = 0;
	if (stateSelect === "DC" || stateSelect === "TX") 
	{
		extraNumber = 9000;
	} 
	else if (stateSelect === "IA") 
	{
		extraNumber = 10000;
	} 
	else if (stateSelect === "TN") 
	{
		extraNumber = 7000;
	}
	console.log(varToString({extraNumber}), extraNumber);
	let weeksToSUTAWageLimit = SkipDivideByZero(extraNumber / (payRateVar * 32));
	console.log(varToString({weeksToSUTAWageLimit}), weeksToSUTAWageLimit);
  let hoursToProfitPerEE = (trueGrossProfitPercent < 0) ? 0 : totalPerEEVar / gpWeightedPerHour;
  console.log(varToString({hoursToProfitPerEE}), hoursToProfitPerEE);
  
  //This will handle the Finance approval section.
  document.getElementById('sui').textContent = "SUI: " + classCodeComplete;
  document.getElementById('wcNetRate').textContent = "WC Net Rates: " ;
 	document.getElementById('FINANCEApprovalPayment').textContent = "Payment Terms: " + FINANCE + '-' + creditStatement;
  //document.getElementById('creditLimit').textContent = "Credit Limit Needed: " + result; //This is something that was only there for viewing, it was removed as it was deemed pointless for scaling.


	//HTML modifiers
	document.getElementById('weeklyEstRevenue').textContent = `Weekly Est. Revenue: ${weeklyEstimateRevenue.toFixed(2)}`;
	document.getElementById('simpleGP').textContent = `Simple GP: ${simpleGPNumber.toFixed(2)}%`;
	document.getElementById("weightGPHour").textContent = `GP Weighted Per Hour: ${gpWeightedPerHour.toFixed(2)}`;
	document.getElementById("weightGPWeek").textContent = `GP Weighted Per Week: ${gpWeightedPerWeek.toFixed(2)}`;
	document.getElementById("payRateRepeat").textContent = `Pay Rate: ${payRateVar.toFixed(2)}`;
	document.getElementById("billRate").textContent = `Bill Rate: ${billRateVar.toFixed(2)}`;
	document.getElementById("markupRepeat").textContent = `Mark-up ${markUpVar.toFixed(2)}`;
	document.getElementById("trueGPPercent").textContent = `True Gross Profit: ${trueGrossProfitPercent.toFixed(2)}%`;
	document.getElementById("trueGPDollars").textContent = `True Gross Profit: $${trueGrossProfitDollar.toFixed(2)}`;
	document.getElementById("weeksToProfit").textContent = `Weeks to Profit: ${weeksToProfitVar.toFixed(2)}`;
	document.getElementById("weeksToWageLimit").textContent = `Weeks to SUTA Wage Limit: ${weeksToSUTAWageLimit.toFixed(2)}`;
	document.getElementById("hoursToProfit").textContent = `Hours to profit per EE: ${hoursToProfitPerEE.toFixed(2)}`
}

export function saveFile() 
{
  //Compile into array for checking
  var allElements = document.getElementsByTagName("*");
  var allIds = [];
  for (var i = 0,n = allElements.length; i < n; ++i) 
  {
    var el = allElements[i];
    if (el.id) 
    { 
    	allIds.push(el.id);
    }
  }
  var idList = [...allIds];
  popStuff(allIds);
  allIds.push('markup');
  console.log(allIds);
  console.log(idList);
  var doIContinue = true;
          
  for (const input of allIds) 
  {
  	var tempVal = document.getElementById(input);
    if (!tempVal.value) 
    {
      document.getElementById(input).style.border = "2px solid red";
      document.getElementById('errorMessage').textContent = "Look at the highlighted red boxes to make sure you filled in the correct information!";
      doIContinue = false;
    }
    else 
    {
      document.getElementById(input).style.border = "1px solid black";
      document.getElementById('errorMessage').textContent = "";
    }
  }

  if (!doIContinue) 
  {
  	alert("Missing information! Cannot download Text file!")
    return;
  }
  runMath()
  //console.log(runMath());

  // This variable stores all the data.
  let data = 
    'Position(s): ' + positions.value +
			'\nEntity: ' + entity.value + 
			'\nState: ' + stateSale.value +
			'\nWC Class Code: ' + wcClassCode.value +
			'\nPay Rate: ' + payRate.value + 
			'\nMarkup: ' + markup.value +
			'\nTotal Employees' + totalEmployees.value +
			'\nRollover EE: ' + rolloverEE.value +
			'\nTurnover: ' + turnover.value +
			'\nPayment Terms: ' + paymentTerms.value +
			'\n\n\t' + document.getElementById("weeklyEstRevenue").textContent +
			'\n\t' + document.getElementById("simpleGP").textContent +
			'\n\t' + document.getElementById("weightGPHour").textContent +
			'\n\t' + document.getElementById("weightGPWeek").textContent +
			'\n\t' + document.getElementById("payRateRepeat").textContent +
			'\n\t' + document.getElementById("billRate").textContent +
			'\n\t' + document.getElementById("markupRepeat").textContent +
			'\n\t' + document.getElementById("trueGPPercent").textContent +
			'\n\t' + document.getElementById("trueGPDollars").textContent +
			'\n\t' + document.getElementById("weeksToProfit").textContent +
			'\n\t' + document.getElementById("weeksToWageLimit").textContent +
			'\n\t' + document.getElementById("hoursToProfit").textContent;

  // Convert the text to BLOB.
  /*const textToBLOB = new Blob([data],{ type: 'text/plain' });
  const sFilesalesTeam = 'formData.txt';// The file to save the data.
  let newLink = document.createElement("a");
  newLink.download = sFilesalesTeam;
  if (window.webkitURL != null) 
  {
    newLink.href = window.webkitURL.createObjectURL(textToBLOB);
  } 
  else 
  {
    newLink.href = window.URL.createObjectURL(textToBLOB);
    newLink.style.display = "none";
    document.body.appendChild(newLink);
  }
  newLink.click();*/
  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  doc.text(data, 10, 10);
  doc.save("formData.pdf");
}