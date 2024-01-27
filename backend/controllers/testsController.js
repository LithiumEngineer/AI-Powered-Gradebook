const asyncHandler = require('express-async-handler');
const subdomain = process.env.SUBDOMAIN;
const appID = process.env.APPID;
const apiToken = process.env.APITOKEN;
const multipleRecordsEndpoint = `https://${subdomain}.kintone.com/k/v1/records.json?app=${appID}`
const singleRecordEndpoint = `https://${subdomain}.kintone.com/k/v1/record.json?app=${appID}`;

const log = false;


// @desc    Get all tests
// @route   GET /tests
// @access  Private
const getAllTests = asyncHandler(async (req, res) => {
    const fetchOptions = {
        method: 'GET',
        headers: {
            'X-Cybozu-API-Token': apiToken
        }
    }
    const response = await fetch(multipleRecordsEndpoint, fetchOptions);
    const jsonResponse = await response.json();

    const filteredResponse = jsonResponse.records.map((record) => {
        if (record.data_type.value === 'test') {
            return {
                id: record.$id.value,
                topic: record.topic.value,
                student_grades_json: record.student_grades_json.value,
                test_type: record.test_type.value,
                owner_id: record.owner_id.value
            }
        } else return null;
    });
    const result = filteredResponse.filter(element => element !== null)

    if (log) console.log(result);
    res.json(result);
});


// @desc    Get test by Owner ID
// @route   GET /tests/:id
// @access  Private
const getTestByOwnerId = asyncHandler(async (req, res) => {
    const fetchOptions = {
        method: 'GET',
        headers: {
            'X-Cybozu-API-Token': apiToken
        }
    }
    const response = await fetch(multipleRecordsEndpoint, fetchOptions);
    const jsonResponse = await response.json();

    const filteredResponse = jsonResponse.records.map((record) => {
        if (record.data_type.value === 'test' && record.owner_id.value === req.params.id) {
            return {
                id: record.$id.value,
                topic: record.topic.value,
                student_grades_json: record.student_grades_json.value,
                test_type: record.test_type.value,
                owner_id: record.owner_id.value
            }
        } else return null;
    });
    const result = filteredResponse.filter(element => element !== null)

    if (log) console.log(result);
    res.json(result);
});


// @desc    Create a test
// @route   POST /tests
// @access  Private
const createTest = asyncHandler(async (req, res) => {
    const { topic, student_grades_json, test_type, owner_id } = req.body;
    if (!topic || !student_grades_json || !test_type || !owner_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const requestBody = {
        'app': appID,
        'record': {
            'data_type': {
                'value': 'test'
            },
            'topic': {
                'value': topic
            },
            'student_grades_json': {
                'value': student_grades_json
            },
            'test_type': {
                'value': test_type
            },
            'owner_id': {
                'value': owner_id
            }
        }
    };
    const options = {
        method: 'POST',
        headers: {
            'X-Cybozu-API-Token': apiToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    }
    const response = await fetch(singleRecordEndpoint, options);
    
    if (response.status === 200) {
        res.status(200).json({ message: 'Test created successfully' });
    } else {
        res.status(400).json({ message: 'Test creation failed' });
    }
});


// @desc    Update a test
// @route   PUT /tests/:id
// @access  Private
const updateTest = asyncHandler(async (req, res) => {
    const { record_id, topic, student_grades_json, test_type, owner_id } = req.body;
    if (!record_id || !topic || !student_grades_json || !test_type || !owner_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const requestBody = {
        'app': appID,
        'id': record_id,
        'record': {
            'topic': {
                'value': topic
            },
            'student_grades_json': {
                'value': student_grades_json
            },
            'test_type': {
                'value': test_type
            },
            'owner_id': {
                'value': owner_id
            }
        }
    };
    const options = {
        method: 'PUT',
        headers: {
            'X-Cybozu-API-Token': apiToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    }
    const response = await fetch(singleRecordEndpoint, options);
    
    if (response.status === 200) {
        res.status(200).json({ message: 'Test updated successfully' });
    } else {
        res.status(400).json({ message: 'Test update failed' });
    }
});


// @desc    Delete a test
// @route   DELETE /tests/:id
// @access  Private
const deleteTest = asyncHandler(async (req, res) => {
    const { record_id } = req.body;
    if (!record_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const requestBody = {
        'app': appID,
        'ids': [record_id]
    };
    const options = {
        method: 'DELETE',
        headers: {
            'X-Cybozu-API-Token': apiToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    }
    const response = await fetch(multipleRecordsEndpoint, options);

    if (response.status === 200) {
        res.status(response.status).json({ message: "Test deleted successfully!" });
    } else {
        if (log) console.log(response);
        res.status(response.status).json({ message: "Unable to perform operation." });
    }
});


module.exports = {
    getAllTests,
    getTestByOwnerId,
    createTest,
    updateTest,
    deleteTest
}