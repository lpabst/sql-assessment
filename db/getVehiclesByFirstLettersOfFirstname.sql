
select * from vehicles v
join users u on u.id = v.ownerid
where u.firstname ilike $1 || '%'
