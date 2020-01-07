const pg = require('pg')
let pgPool = pg.Pool(require('./creds/aws.config'));

/**
 *  meeting_id 
 * meeting_type 
 * group_id 
 * zone_id 
 * location_name
 * address
 * zip
 * city   
 * state 
 * lat
 * lng
 * accessibility 
 * day    
 * time_begin 
 * time_end 
 * specialinterest 
 */
const getAllMeetingsWithFiltersFunction = `
create or replace function getAllMeetingsWithFilters(
    _time_begin      varchar default "*",
    _time_end        varchar default "*",
    _day             varchar default "*",
    _meeting_type    varchar default "*",
    _specialinterest varchar default "*",
    _accessibility   bool    default null)
    
    returns table (
        meeting_id      int,
        meeting_type    varchar,
        location_name   varchar,
        address         varchar,
        zip             varchar,
        lat             double precision,
        lng             double precision,
        accessibility   boolean,
        day             varchar,
        time_begin      varchar,
        time_end        varchar,
        specialinterest varchar
    ) as

    $func$

    case
        when _accessibility = null then
            _accessibility = ANY('{true,false}'::boolean[])
    end

    begin
        return query
        select 
            m.meeting_id, 
            m.meeting_type, 
            m.location_name, 
            m.address, 
            m.zip, 
            m.lat, 
            m.lng, 
            m.accessibility
            m.day,
            m.time_begin,
            m.time_end,
            m.specialinterest
        from meeting as m
        where 
            m.time_begin = _time_begin,
            m.time_end = _time_end,
            m.day = _day,
            m.meeting_type = _meeting_type,
            m.specialinterest = _specialinterest
    end
    $func$ language plpgsql;
`

async function getAllMeetings() {
    const stmt = "select * from meeting limit 1;"
    // const stmt = "select * from meeting;"
    try {
        const client = await pgPool.connect();
        // TODO: type unknown, check
        const result = await client.query(stmt);
        return result;
    } catch (e) {
        return Error(e)
    } finally {
        client.release();
    }
}

/**
 * 
 * @param {time} startAt 
 * @param {time} endAt 
 * @param {string[]} days 
 * @param {string} type 
 * @param {string} specialInterests 
 * @param {bool} accessibility 
 */
async function getMeetingsWithFilters(beginTime, endTime, days, type, specialInterests, accessibility) {
    const query = {
        name: "getMeetingsWithFilters",
        text: 
    }
}