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

for (let i = 0; i < winRates.length; i++) {
  const { card, gihWR, college, count } = winRates[i]
  if (dict[card]) {
    dict[card].winRateByCollege.push({ college, gihWR, count })
  }
}

// print the dictionary
for (const [_, value] of Object.entries(dict)) {
  const { name, manaCost, types, colors, cmc, rarity, image, lsvRating, winRateByCollege } = value
  if (winRateByCollege?.length > 0) {
    if (winRateByCollege?.length > 1) {
      winRateByCollege.sort((a, b) => parseFloat(b.gihWR) - parseFloat(a.gihWR))
    }
    console.log(`
    {
      "name": "${name}",
      "manaCost": "${manaCost}",
      "colors": ${JSON.stringify(colors)},
      "cmc": ${parseInt(cmc)},
      "rarity": "${rarity}",
      "image": "${image}",
      "types": ${JSON.stringify(types)},
      "rating": ${parseFloat(lsvRating)},
      "winRates": ${JSON.stringify(winRateByCollege)}
    },`)
  }
}
