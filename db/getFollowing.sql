SELECT u.id, u.firstname, u.lastname, u.avatar FROM users AS u JOIN follow AS f ON u.id = f.followedid WHERE f.followerid = $1;