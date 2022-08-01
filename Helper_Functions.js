export function VariableParseAndCheck(elementID) 
{
	if (!parseFloat(elementID)) 
	{
		return 0;
	} 
	else 
	{
		return parseFloat(elementID);
	}
}

export function DependentDeclarataion(elementID, falseyReturn) 
{
	if(!parseFloat(elementID)) 
	{
		return falseyReturn;
	} 
	else 
	{
		return parseFloat(elementID);
	}
}

export function SkipDivideByZero(mathematicalExpression) 
{
	if (!mathematicalExpression) 
	{
		return 0;
	} 
	else 
	{
		return mathematicalExpression;
	}
}