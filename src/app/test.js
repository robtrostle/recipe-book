// function calculateDaysBetweenDates(begin, end) {
//     const start = new Date(begin)
//     const endDate = new Date(end)
//     const diffTime = Math.abs(endDate.getTime() - start.getTime())
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
//     return diffDays
// }

function calculateDaysBetweenDates(begin, end) {
    const start = new Date(begin)
    const endDate = new Date(end)
    const diffTime = Math.abs(endDate.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}

