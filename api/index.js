const collections = require('./collections.json')

function dayDiff(date1, date2) {
  let diff = Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24))
  return diff
}

function findNextCollection() {
  const today = new Date()
  let nextCollection = {
    color: null,
    date: null,
  }
  let currentMinDays = 1000
  collections.forEach((collection) => {
    const days = dayDiff(today, new Date(collection.date))
    if (days >= 0 && days < currentMinDays) {
      currentMinDays = days
      nextCollection = collection
    }
  })
  return nextCollection
}

export default function handler(request, response) {
  response.status(200).json({
    body: JSON.stringify(findNextCollection())
  });
