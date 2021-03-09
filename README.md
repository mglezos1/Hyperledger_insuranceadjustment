# Hyperledger_insuranceadjustment

# State Data

	States:["Assesment", "Under Review", "Fault Determined", "Under Appeal", "Under Review by a Compliance Officer", "Payout"]
	State:0
	Name:
	Car:
	At Fault: false
  
# Transition 
	reviewPolicy-client
	fillReport-client
	determineFault-insurance
	acceptOffer-client
	rejectOffer-client
	adjusterAgrees-insurance
	adjusterDisagrees-insurance
	complianceDecision-compliance
  
# Functions 
	checkFault(Name, Car)
	checkStatus(Name)
	
