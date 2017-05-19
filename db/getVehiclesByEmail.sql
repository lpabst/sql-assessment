
select * from vehicles v
join users u on u.id = v.ownerid
where u.email ilike $1
