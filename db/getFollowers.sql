SELECT f.id as followid, u.id, u.firstname, u.lastname, u.avatar, u.bio FROM users as U JOIN follow as f on u.id = f.followerid WHERE f.followedid = $1;