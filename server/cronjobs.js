const cron = require('node-cron');
const db = require('./db_init')

const scheduler = function() {
    cron.schedule('0 0 */1 * * *', () => {
        console.log('Clearing db every 1 hour');
        db.schema.Message({});
        db.schema.Room({});
        db.schema.User({});
    });
}

module.exports = {
    schedule: scheduler
}