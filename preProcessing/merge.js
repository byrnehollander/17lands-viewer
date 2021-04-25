const cards = require('./lsvRatings.json')
const winRates = require('./17LandsWinRate.json')

const dict = {}

for (let i = 0; i < cards.length; i++) {
  const { name, manaCost, types, colors, cmc, rarity, image, rating } = cards[i]
  dict[name] = {
    name,
    manaCost,
    colors,
    cmc: parseInt(cmc),
    rarity,
    image,
    types,
    lsvRating: parseFloat(rating),
    winRateByCollege: []
  }
}

// console.log(dict)

// TODO: iterate through winRates and add to winRateByCollege array
for (let i = 0; i < winRates.length; i++) {
}

// print the dictionary
