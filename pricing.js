function calculateVolLifePrice(product, coverageLevels) {
  var price = 0
  var dollarsOff = 0
  for (var i = 0; i < coverageLevels.length; i++) {
    var coverageAmount = coverageLevels[i].coverage
    price += (coverageAmount / product.cost.costDivisor) * product.cost.price
  }

  if (product.employerContribution.mode === 'dollar') {
    price = price - product.employerContribution.contribution
  }
  else {
    dollarsOff = price * (product.employerContribution.contribution / 100)
    price = price - dollarsOff
  }

  return parseInt(price * 100) / 100
}

function calculateLTDPrice(product, employee) {
  var price = 0
  var dollarsOff = 0
  var salaryPercentage = product.coveragePercentage / 100

  price += ((employee.salary * salaryPercentage) / product.cost.costDivisor) * product.cost.price

  if (product.employerContribution.mode === 'dollar') {
    price = price - product.employerContribution.contribution
  } else {
    dollarsOff = price * product.employerContribution.contribution
    price = price - dollarsOff
  }

  return parseInt(price * 100) / 100


}
module.exports.calculateProductPrice = function (product, employee, coverageLevels) {

  switch (product.type) {
    case 'volLife':
      return calculateVolLifePrice(product, coverageLevels)
    case 'ltd':
      return calculateLTDPrice(product, employee)
    default: return 0


  }
}
