const API = "http://localhost:8000";

export async function getTopics() {
    const res = await fetch(`${API}/topics`);
    return res.json();
}

export async function getCards(topicId) {
    const res = await fetch(`${API}/cards/${topicId}`);
    return res.json();
}
