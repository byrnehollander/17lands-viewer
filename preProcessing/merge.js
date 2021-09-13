const cards = require('./cardsInfo.json')

const saveWinRates = (winRates) => {
  const dict = {}

  for (let i = 0; i < cards.length; i++) {
    const { name, type, colors, cmc, rarity, image } = cards[i]
    dict[name] = {
      name,
      colors,
      cmc: parseInt(cmc),
      rarity,
      image,
      type,
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
    const { name, type, colors, cmc, rarity, image, gihWR, gihWRCount } = value
    arrayToWrite.push(
      {
        name: name,
        colors: colors,
        cmc: parseInt(cmc),
        rarity: rarity,
        image: image,
        type: type,
        gihWR: gihWR,
        gihWRCount: parseInt(gihWRCount)
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
