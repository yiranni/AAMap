create or replace function getAllMeetingsWithFilters(
    _time_begin      varchar default '*',
    _time_end        varchar default '*',
    _day             varchar default '*',
    _meeting_type    varchar default '*',
    _specialinterest varchar default '*',
    _accessibility   bool[]  default '{null}'::boolean[])
    
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

    begin

        if _accessibility == '{null}'::bool[] then
            _accessibility = '{true,false}'::bool[]
        end if

        return query
        select 
            -- m.meeting_id, 
            -- m.meeting_type, 
            -- m.location_name, 
            -- m.address, 
            -- m.zip, 
            -- m.lat, 
            -- m.lng, 
            -- m.accessibility
            -- m.day,
            -- m.time_begin,
            -- m.time_end,
            -- m.specialinterest
            *
        from (
            select *
            from meeting m
            where 
                m.accessibility in _accessibility,
                m.time_begin = _time_begin,
                m.time_end = _time_end,
                m.day = _day,
                m.meeting_type = _meeting_type,
                m.specialinterest = _specialinterest
            and

        ) m
    end
    $func$ language plpgsql;