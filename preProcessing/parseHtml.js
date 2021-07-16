const parser = require('node-html-parser')

const html = `

`

const root = parser.parse(html)

const cards = root.querySelectorAll('tr')

console.log('[')

for (let i = 1; i < cards.length; i++) { // skip the first one
  const cardName = cards[i].querySelector('div.list_card').text.trim()
  const values = cards[i].querySelectorAll('td')

  const count = values[13].text
  const gihWR = values[14].text

  if (gihWR) {
    console.log(`{"card": "${cardName}", "gihWR": "${gihWR}", "count": "${count}"},`)
  }
}

console.log(']')
