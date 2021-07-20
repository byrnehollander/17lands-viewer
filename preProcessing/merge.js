const cards = require('./lsvRatings.json')

const saveWinRates = (winRates) => {
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

  const arrayToWrite = []

  // print the dictionary
  for (const [_, value] of Object.entries(dict)) {
    const { name, manaCost, type, colors, cmc, rarity, image, lsvRating, gihWR, gihWRCount, lsvDescription } = value
    arrayToWrite.push(
      {
        name: name,
        manaCost: manaCost,
        colors: colors,
        cmc: parseInt(cmc),
        rarity: rarity,
        image: image,
        type: type,
        rating: parseFloat(lsvRating),
        gihWR: gihWR,
        gihWRCount: parseInt(gihWRCount),
        lsvRating: lsvRating,
        lsvDescription: lsvDescription
      })
  }

  require('fs').writeFile(
    '../src/ratings.json',
    JSON.stringify(arrayToWrite),
    function (err) {
      if (err) {
        console.error('Broke!')
      }
    }
  )
}

module.exports = saveWinRates
