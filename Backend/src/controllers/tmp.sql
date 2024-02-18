SELECT c.* 
FROM users_courses uc
JOIN courses c
ON uc.courseId = c.courseId
having uc.userId=$1;