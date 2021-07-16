const cards = require('./lsvRatings.json')
const winRates = require('./17LandsWinRate.json')

const dict = {}

for (let i = 0; i < cards.length; i++) {
  const { name, manaCost, type, colors, cmc, rarity, image, rating, ratingDescription } = cards[i]
  dict[name] = {
    name,
    manaCost,
    colors,
    cmc: parseInt(cmc),
    rarity,
    image,
    type,
    lsvRating: parseFloat(rating).toFixed(1),
    lsvDescription: ratingDescription,
    gihWR: '0',
    gihWRCount: '0'
  }
}

for (let i = 0; i < winRates.length; i++) {
  const { card, gihWR, count } = winRates[i]
  if (dict[card]) {
    dict[card].gihWR = gihWR
    dict[card].gihWRCount = count
  }
}

// print the dictionary
for (const [_, value] of Object.entries(dict)) {
  const { name, manaCost, type, colors, cmc, rarity, image, lsvRating, gihWR, gihWRCount, lsvDescription } = value
  console.log(`
    {
      "name": "${name}",
      "manaCost": "${manaCost}",
      "colors": ${JSON.stringify(colors)},
      "cmc": ${parseInt(cmc)},
      "rarity": "${rarity}",
      "image": "${image}",
      "type": ${JSON.stringify(type)},
      "rating": ${parseFloat(lsvRating)},
      "gihWR": ${JSON.stringify(gihWR)},
      "gihWRCount": ${parseInt(gihWRCount)},
      "lsvRating": ${lsvRating},
      "lsvDescription": ${JSON.stringify(lsvDescription)}
    },`)
}
