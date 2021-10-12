// this code is garbage honestly

const submit = _ => {

	const shiftStartString = document.getElementById(`workStart`).value
	const shiftTotalTimeString = document.getElementById(`timeWorked`).value
	const isDayOff = document.getElementById(`dayOff`).checked

	if (shiftStartString.length === 0 && !isDayOff) {
		alert("missing shift start time!")
		return
	}

	if (isDayOff) {
		const table = document.getElementById("folhadeponto")

		const tableRoll = document.createElement(`tr`)
		table.appendChild(tableRoll)
		for (let i = 0; i < 4; ++i) {
			const tableItem = document.createElement(`td`)
			tableItem.classList.add(`dayOff`)
			tableItem.innerHTML = `DAY OFF`
			tableRoll.appendChild(tableItem)
		}

		return
	}

	const HOURS_WORKED = parseInt(shiftTotalTimeString),
		HOURS_INTERVAL_DURATION = 1,
		HOURS_INTERVAL_START = 4

	const timeList = shiftStartString.split(`:`)
	for (let i = 0; i < timeList.length; ++i) {
		timeList[i] = parseInt(timeList[i])
	}

	const originalShiftStartHour = timeList[0],
		originalShiftStartMinute = timeList[1]

	const shiftStartHour = originalShiftStartHour,
		shiftStartMinute = originalShiftStartMinute + randomizedIncrement()

	const intervalStartHour = shiftStartHour + HOURS_INTERVAL_START,
		intervalStartMinute = shiftStartMinute + randomizedIncrement()

	const intervalEndHour = intervalStartHour + HOURS_INTERVAL_DURATION,
		intervalEndMinute = intervalStartMinute + randomizedIncrement(1) // 1 here prevents delaying shift end too much

	const shiftEndHour = shiftStartHour + HOURS_WORKED + HOURS_INTERVAL_DURATION,
		shiftEndMinute = intervalEndMinute + randomizedIncrement()

	const shiftStart = new Date()
	shiftStart.setHours(shiftStartHour)
	shiftStart.setMinutes(shiftStartMinute)

	const intervalStart = new Date(shiftStart.getTime())
	intervalStart.setHours(intervalStartHour)
	intervalStart.setMinutes(intervalStartMinute)

	const intervalEnd = new Date(shiftStart.getTime())
	intervalEnd.setHours(intervalEndHour)
	intervalEnd.setMinutes(intervalEndMinute)

	const shiftEnd = new Date(shiftStart.getTime())
	shiftEnd.setHours(shiftEndHour)
	shiftEnd.setMinutes(shiftEndMinute)

	const table = document.getElementById("folhadeponto")

	const tableRoll = document.createElement(`tr`)
	table.appendChild(tableRoll)

	const items = [shiftStart, intervalStart, intervalEnd, shiftEnd]

	for (const item of items) {
		const tableItem = document.createElement(`td`)
		const hours = item.getHours().toString().padStart(2, `0`),
			minutes = item.getMinutes().toString().padStart(2, `0`)

		tableItem.innerHTML = `${hours}:${minutes}`
		tableRoll.appendChild(tableItem)
	}
}
const randomizedIncrement = (max = 3) => Utils.getRandomInt(1, max)