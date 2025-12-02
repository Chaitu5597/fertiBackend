const axios = require('axios');

const API_URL = 'http://localhost:5000/api/careers';

const testCareer = {
    category: "Test Category",
    id: "test-job-1",
    title: "Test Job Title",
    preview: "Test Preview",
    desc: "Test Description",
    about: "Test About",
    responsibilities: ["Resp 1", "Resp 2"],
    requirements: ["Req 1"],
    skills: ["Skill 1"],
    tools: ["Tool 1"],
    experience: "1-2 years",
    salary: "100000",
    location: "Test Location",
    mode: "Remote",
    type: "Contract",
    positions: 1,
    daysLeft: 10,
    niceToHave: ["Nice 1"],
    applyNote: "Test Note"
};

async function runTests() {
    try {
        console.log("1. Creating a new career...");
        const createRes = await axios.post(API_URL, testCareer);
        console.log("Created:", createRes.data.id);

        console.log("2. Fetching all careers...");
        const getAllRes = await axios.get(API_URL);
        console.log("Total careers:", getAllRes.data.length);
        const createdCareer = getAllRes.data.find(c => c.id === testCareer.id);
        if (!createdCareer) throw new Error("Created career not found in list");

        console.log("3. Fetching career by ID...");
        const getOneRes = await axios.get(`${API_URL}/${testCareer.id}`);
        console.log("Fetched:", getOneRes.data.title);

        console.log("4. Updating career...");
        const updateRes = await axios.put(`${API_URL}/${testCareer.id}`, { title: "Updated Title" });
        console.log("Updated:", updateRes.data.title);

        console.log("5. Deleting career...");
        await axios.delete(`${API_URL}/${testCareer.id}`);
        console.log("Deleted");

        console.log("All tests passed!");
    } catch (error) {
        console.error("Test failed:", error.response ? error.response.data : error.message);
    }
}

runTests();
