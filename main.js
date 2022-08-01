//Admittedly obfuscated code that is just ridiculous,I know there is a better way to do this.
//Coming from Python just made it easier without a dictionary to shorten the code this the next best option for raw JS.
import { VariableParseAndCheck, DependentDeclarataion, SkipDivideByZero } from './Helper_Functions.js';
import { stateToAbbreviation, WCClassCheck, SUIConverter, FinanceCreditDeclaration } from './Converter_Functions.js'
import { stateAbbList, stateList, checkList } from './Other_Data.js';

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
  //First section handles direct declarations, things that are just pulled straight in.
  const RECRUIT = 5.5;
  const FICA = 0.0765;
  const FUTA = 0.006;
  const ACA = 0.015;
  let stateSelect = stateToAbbreviation(document.getElementById('stateSale').value, stateAbbList);
  let classCodeComplete = stateSelect + (!(document.getElementById('wcClassCode').value) ? '1111' : document.getElementById('wcClassCode').value);
  let SUI = SUIConverter(stateSelect, stateList);
	let WC = WCClassCheck(classCodeComplete, checkList);
	const FinanceCreditList = FinanceCreditDeclaration(paymentTerms.value)
  var FINANCE = FinanceCreditList[0];
  var creditStatement = FinanceCreditList[1];
  let markUpVar = VariableParseAndCheck(document.getElementById('markup').value);
	let payRateVar = VariableParseAndCheck(document.getElementById('payRate').value);
	let employeesVar = VariableParseAndCheck(document.getElementById('totalEmployees').value);
	let rolloverEEVar = VariableParseAndCheck(document.getElementById('rolloverEE').value);
	let estimatedWeeklyTurnoverVar = VariableParseAndCheck(document.getElementById('turnover').value);
	let weeklyOTHoursPaidVar = VariableParseAndCheck(document.getElementById('weeklyOTHours').value);
	let transportationVar = VariableParseAndCheck(document.getElementById('transportation').value);
	let unbillablesVar = VariableParseAndCheck(document.getElementById('unbillables').value);
	let billBackVar = VariableParseAndCheck(document.getElementById('billBack').value);
	let branchOnsiteVar = VariableParseAndCheck(document.getElementById('branchOnsite').value);
	let rebateVar = VariableParseAndCheck(document.getElementById('rebate').value);
	let PPEVar = VariableParseAndCheck(document.getElementById('ppe').value);
	let uniformsVar = VariableParseAndCheck(document.getElementById('uniforms').value);
	let billBack2Var = VariableParseAndCheck(document.getElementById('billBack2').value);
	let timeclocksVar = VariableParseAndCheck(document.getElementById('timeclock').value);
	let salesCycleVar = VariableParseAndCheck(document.getElementById('salesCycle').value);
	let implementationVar = VariableParseAndCheck(document.getElementById('implementation').value);
	let backgroundCheckVar = VariableParseAndCheck(document.getElementById('backgroundCheck').value);
	let drugScreenVar = VariableParseAndCheck(document.getElementById('drugScreen').value);
	let VMS = VariableParseAndCheck(document.getElementById('vms').value);

	//Everything here depends on something else, these shouldn't return NaN but always could, make sure to find them if they occur, they ruin everything.
	let regWeeklyHoursVar = DependentDeclarataion(document.getElementById('totalWeeklyReg').value, employeesVar * 32);
	let otMarkUpVar = DependentDeclarataion(document.getElementById('otMarkup').value, markUpVar);
	let weeklyOTHoursBillVar = weeklyOTHoursPaidVar - VariableParseAndCheck(document.getElementById('otOverCap').value);

	//The following are all computations from the original spread sheet. This will definitely require optimization and will be cleaned up over time.
	let totalPerEEVar = backgroundCheckVar + drugScreenVar + PPEVar + uniformsVar + RECRUIT + billBackVar;
	let eeStartCostVar = rolloverEEVar === 0 ? ((employeesVar - rolloverEEVar) * totalPerEEVar) : 0;
	let totalUpfrontCostVar = timeclocksVar + salesCycleVar + implementationVar + eeStartCostVar;
	let otPayRateVar = payRateVar * 1.5;
	let otBillRateVar = otPayRateVar * (1 + (otMarkUpVar / 100));
	let otBillVar = weeklyOTHoursBillVar *  otBillRateVar;
	let billRateVar = payRateVar * (1 + (markUpVar / 100));
	let otPay = weeklyOTHoursPaidVar * otPayRateVar;
	let otGPPerHourVar = otBillRateVar - otPayRateVar - (otPayRateVar * FICA + otPayRateVar * FUTA + otPayRateVar * SUI + WC / otPayRateVar + otPayRateVar * ACA + otPayRateVar * VMS + otPayRateVar * FINANCE);
	let otWeeklyMarginVar = otGPPerHourVar * weeklyOTHoursPaidVar;
	let regGPPerHourVar = billRateVar - payRateVar - (payRateVar * FICA + payRateVar * FUTA + payRateVar * SUI + WC / payRateVar + payRateVar * ACA + payRateVar * VMS + payRateVar * FINANCE);
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
	let weeklyVendorPayVar = weekly3rdPartyHoursVar * partyPayRateVar;
	let weeklyPartyTotalBill = weekly3rdPartyHoursVar * weekly3rdPartyHoursVar * partyPayRateVar;
	let partyWeeklyMarginVar = weeklyPartyTotalBill - weeklyVendorPayVar;
	let partyGPPerHour = !(partyWeeklyMarginVar / weekly3rdPartyHoursVar) ? 0 : partyWeeklyMarginVar / weekly3rdPartyHoursVar;
	let totalWeeklyHours = regWeeklyHoursVar  + weekly3rdPartyHoursVar + weeklyOTHoursPaidVar;
	let eeTurnoverCost = employeesVar * (estimatedWeeklyTurnoverVar / 100) * totalPerEEVar;
	let totalPerWeek = transportationVar + unbillablesVar + billBackVar + branchOnsiteVar + rebateVar + eeTurnoverCost;
	let weeklyEstimateRevenue = (billRateVar * regWeeklyHoursVar) + (weeklyOTHoursPaidVar * otBillRateVar) + (weekly3rdPartyHoursVar * otBillRateVar);
	let gpWeightedPerHour = (regGPPerHourVar * regWeeklyHoursVar / totalWeeklyHours) + (partyGPPerHour * weekly3rdPartyHoursVar / totalWeeklyHours) + (otGPPerHourVar * weeklyOTHoursPaidVar / totalWeeklyHours);
	let simpleGPNumber = 100 * SkipDivideByZero(gpWeightedPerHour / (billRateVar * SkipDivideByZero(regWeeklyHoursVar / totalWeeklyHours))) + (otBillRateVar * SkipDivideByZero(weeklyOTHoursPaidVar / totalWeeklyHours)) + (partyBillRateVar * SkipDivideByZero(weekly3rdPartyHoursVar / totalWeeklyHours));
	let gpWeightedPerWeek = gpWeightedPerHour * totalWeeklyHours
	let trueGrossProfitDollar = gpWeightedPerWeek - totalPerWeek;
	let trueGrossProfitPercent = SkipDivideByZero(trueGrossProfitDollar / weeklyEstimateRevenue) * 100;
	let weeksToProfitVar = SkipDivideByZero(totalUpfrontCostVar / trueGrossProfitDollar);
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
	let weeksToSUTAWageLimit = SkipDivideByZero(extraNumber / (payRateVar * 32));
	let hoursToProfitPerEE = (trueGrossProfitPercent < 0) ? 0 : totalPerEEVar / gpWeightedPerHour;

  //This will handle the Finance approval section.
  document.getElementById('sui').textContent = "SUI: " + classCodeComplete;
  document.getElementById('wcNetRate').textContent = "WC Net Rates: " ;
 	document.getElementById('FINANCEApprovalPayment').textContent = "Payment Terms: " + paymentTerms.value + '-' + creditStatement;
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

export function saveFile2() 
{
  // Get the data from each element on the form.
  const date = document.getElementById('date');
  const accountManager = document.getElementById('accountManager');
  const salesTeam = document.getElementById('salesTeam');

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

  //console.log(runMath());

  // This variable stores all the data.
  let data = 
    date.value +
      '\nAccount Manager: ' + accountManager.value +
      '\nSales Team: ' + salesTeam.value +
      '\nCustomer Type: ' + customerType.value +
      '\nClient Name: ' + clientName.value +
      '\nCompany Contact: ' + companyContact.value +
      '\nContact Phone: ' + contactPhone.value +
			'\nContact Email: ' + contactEmail.value +
			'\nContact Address: ' + contactAddress.value +
			'\nBilling Address: \n' +
			billingAddress.value + '\n' +
			city.value + ',' + state.value + ' ' + zipCode.value +
			'\nAccounts Payalbe Contact: ' + accountsPayableContact.value +
			'\nAP Contact Email: ' + apContactEmail.value +
			'\nBilling Email: ' + billingEmail.value +
			'\nServicing Branch: ' + servicingBranch.value +
			'\nClient Week Ending: ' + clientWeekEnding.value +
			'\nPosition(s): ' + positions.value +
			'\nEntity: ' + entity.value + 
			'\nState: ' + stateSale.value +
			'\nWC Class Code: ' + wcClassCode.value +
			'\nPay Rate: ' + payRate.value + 
			'\nMarkup: ' + markup.value +
			'\nTotal Employees' + totalEmployees.value +
			'\nRollover EE: ' + rolloverEE.value +
			'\nTurnover: ' + turnover.value +
			'\nPayment Terms: ' + paymentTerms.value

  // Convert the text to BLOB.
  const textToBLOB = new Blob([data],{ type: 'text/plain' });
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
  newLink.click(); 
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
  allIds.push('markup')
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
  const textToBLOB = new Blob([data],{ type: 'text/plain' });
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
  newLink.click(); 
}