
select v.id, v.make, v.model, v.year, v.ownerid, u.firstname, u.lastname from vehicles v
join users u on u.id = v.ownerid
where year > 2000
order by year desc
