const API_URL = 'http://localhost:3000';

export async function postTask(userId, task) {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...task, userId }), 
    });
    if (!response.ok) {
        throw new Error('Failed to post task');
    }
    return response.json();
}

export async function getTasks(userId) {
    const response = await fetch(`${API_URL}/tasks?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return response.json();
}
