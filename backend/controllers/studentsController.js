const asyncHandler = require('express-async-handler');
const subdomain = process.env.SUBDOMAIN;
const appID = process.env.APPID;
const apiToken = process.env.APITOKEN;
const multipleRecordsEndpoint = `https://${subdomain}.kintone.com/k/v1/records.json?app=${appID}`
const singleRecordEndpoint = `https://${subdomain}.kintone.com/k/v1/record.json?app=${appID}`;

const log = false;

// @desc    Get all students
// @route   GET /students
// @access  Private
const getAllStudents = asyncHandler(async (req, res) => {
    const fetchOptions = {
        method: 'GET',
        headers: {
            'X-Cybozu-API-Token': apiToken
        }
    }
    const response = await fetch(multipleRecordsEndpoint, fetchOptions);
    const jsonResponse = await response.json();

    const filteredResponse = jsonResponse.records.map((record) => {
        if (record.data_type.value === 'student') {
            return {
                id: record.$id.value,
                first_name: record.first_name.value,
                last_name: record.last_name.value,
                teacher_id: record.teacher_id.value
            }
        } else return null;
    });
    const result = filteredResponse.filter(element => element !== null)

    console.log(result);
    res.json(result);
});


// @desc    Get student by Teacher ID
// @route   GET /students/:id
// @access  Private
const getStudentByTeacherId = asyncHandler(async (req, res) => {
    const fetchOptions = {
        method: 'GET',
        headers: {
            'X-Cybozu-API-Token': apiToken
        }
    }
    const response = await fetch(multipleRecordsEndpoint, fetchOptions);
    const jsonResponse = await response.json();

    const filteredResponse = jsonResponse.records.map((record) => {
        if (record.data_type.value === 'student' && record.teacher_id.value === req.params.id) {
            return {
                id: record.$id.value,
                first_name: record.first_name.value,
                last_name: record.last_name.value,
                teacher_id: record.teacher_id.value
            }
        } else return null;
    });
    const result = filteredResponse.filter(element => element !== null)

    if (log) console.log(result);
    res.json(result);
});


// @desc    Create a student
// @route   POST /students
// @access  Private
const createStudent = asyncHandler(async (req, res) => {
    const { first_name, last_name, teacher_id } = req.body;
    if (!first_name || !last_name || !teacher_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const requestBody = {
        'app': appID,
        'record': {
            'data_type': {
                'value': 'student'
            },
            'first_name': {
                'value': first_name
            },
            'last_name': {
                'value': last_name
            },
            'teacher_id': {
                'value': teacher_id
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
        res.status(response.status).json({ message: "Student created successfully!" });
    } else {
        res.status(response.status).json({ message: "Duplicate student id." });
    }
});


// @desc    Update a student
// @route   PUT /students
// @access  Private
const updateStudent = asyncHandler(async (req, res) => {
    const { record_id, first_name, last_name, teacher_id } = req.body;
    if (!record_id || !first_name || !last_name || !teacher_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const requestBody = {
        'app': appID,
        'id': record_id,
        'record': {
            'data_type': {
                'value': 'student'
            },
            'first_name': {
                'value': first_name
            },
            'last_name': {
                'value': last_name
            },
            'teacher_id': {
                'value': teacher_id
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
        res.status(response.status).json({ message: "Student updated successfully!" });
    } else {
        if (log) console.log(response);
        res.status(response.status).json({ message: "Unable to perform operation." });
    }
});


// @desc    Delete a student
// @route   DELETE /students
// @access  Private
const deleteStudent = asyncHandler(async (req, res) => {
    const { record_id } = req.body;
    if (!record_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    /*
    // ensure that the record exists
    const fetchOptions = {
        method: 'GET',
        headers: {
            'X-Cybozu-API-Token': apiToken
        }
    }
    const res = await fetch(multipleRecordsEndpoint, fetchOptions);
    const jsonResponse = await res.json();
    const filteredResponse = jsonResponse.records.map((record) => {
        if (record.$id.value === record_id) {
            return {
                id: record.$id.value,
                first_name: record.first_name.value,
                last_name: record.last_name.value,
                teacher_id: record.teacher_id.value
            }
        } else return null;
    });
    const result = filteredResponse.filter(element => element !== null)
    if (result.length === 0) {
        return res.status(400).json({ message: 'Record does not exist.' });
    }

    // confirm that the record is a student
    if (result[0].data_type !== 'student') {
        return res.status(400).json({ message: 'Record is not a student.' });
    }*/

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
        res.status(response.status).json({ message: "Student deleted successfully!" });
    } else {
        if (log) console.log(response);
        res.status(response.status).json({ message: "Unable to perform operation." });
    }
});


module.exports = {
    getAllStudents,
    getStudentByTeacherId,
    createStudent,
    updateStudent,
    deleteStudent
}