// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthRecords {
    struct Record {
        string id;
        string patientName;
        string data;
        uint256 timestamp;
    }

    mapping(string => Record) private records;
    uint256 private nextId;

    event RecordAdded(string indexed id, string patientName, uint256 timestamp);
    event RecordUpdated(string indexed id, string patientName, uint256 timestamp);
    event RecordDeleted(string indexed id, uint256 timestamp);

    function addRecord(string memory _patientId, string memory _patientName, string memory _data) public {
        string memory currentId = _patientId;
        
        records[currentId] = Record({
            id: currentId,
            patientName: _patientName,
            data: _data,
            timestamp: block.timestamp
        });

        emit RecordAdded(currentId, _patientName, block.timestamp);

    }

    function updateRecord(string memory _id, string memory _data) public {
        // require(_id < nextId, "Record does not exist");

        Record storage record = records[_id];
        record.data = _data;
        record.timestamp = block.timestamp;

        emit RecordUpdated(_id, record.patientName, block.timestamp);
    }

    function deleteRecord(string memory _id) public {
        // require(_id < nextId, "Record does not exist");

        // string memory patientName = records[_id].patientName;

        delete records[_id];

        emit RecordDeleted(_id, block.timestamp);
    }

    function getRecord(string memory _id) public view returns (string memory) {
        // require(_id < nextId, "Record does not exist");
        
        string memory hashedData =  records[_id].data;

        if (bytes(hashedData).length != 0) {
            return hashedData;
        }
        else {
            return "Record for the request patient ID not found";
        }
    }
}
