const moment = require('moment-timezone');
const targetTimeZone = 'Asia/Bangkok';

const getDateTimeNow = () => {
    return moment().tz(targetTimeZone).format("YYYY-MM-DD HH:mm:ss")
}

module.exports = {
    getDateTimeNow
}