const users = [];

// Join user to chat
function userJoin(id, username, room) {
    const user = {id, username, room};

    users.push(user);

    return user;
}

// Get current user 
function getCurrentUser (id) {
    return users.find(user => user.id === id);
}

// User leaves chat 
const userLeave = (id) => {
    const index = users.findIndex(user => user.id === id);
    console.log(index)
    console.log(id)
    if (index !== -1) {
        return users.splice(index, 1);
    }
}

// Get room users 
const getRoomUsers = (room) => {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}