// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TalentChain {

    struct ParticipantEntry {
        string fileUrl;      // URL to the uploaded file (IPFS or other storage)
        string description;  
        uint256 timestamp;   
    }

    struct ParticipantEntryDetails {
        address participant;
        string fileUrl;
        string description;
        uint256 timestamp;
        uint256 voteCount;
    }

    struct Competition {
        string name;
        string description;
        string photoUrl;
        uint256 entryFee;
        uint256 totalPool;
        uint256 startTime;
        uint256 endTime;
        address[] participantsArray;
        mapping(address => bool) participants;
        mapping(address => ParticipantEntry) participantEntries;
        mapping(address => bool) voters;
        mapping(address => uint256) votes;
    }

     struct CompetitionDetails {
        uint256 id;
        string name;
        string description;
        string photoUrl;
        uint256 entryFee;
        uint256 totalPool;
        uint256 startTime;
        uint256 endTime;
        uint256 participantCount;
    }

    struct Winner {
        address winnerAddress;
        uint256 rewardAmount;
    }

    uint256 public competitionCount;
    mapping(uint256 => Competition) public competitions;
    mapping(uint256 => Winner) public winners;

    address public owner;
    uint256 entryFee = 0;  //Issue
    uint256 constant competitionDuration = 7 days;

    event CompetitionCreated(uint256 competitionId, string name, string description, string photoUrl, uint256 entryFee, uint256 endTime);
    event VoteCast(uint256 competitionId, address voter, address candidate);

    modifier onlyOwner() {
        require(msg.sender == owner, 'Owner Only Can Create A Competition');
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Create a competition by admin
    function createCompetition(string memory _name, string memory _description, string memory _photoUrl) public onlyOwner {
        require(bytes(_name).length > 0, "Empty Competition Name");
        require(bytes(_description).length > 0, "Empty Description");
        require(bytes(_photoUrl).length > 0, "Empty Photo URL");

        competitionCount++;
        uint256 competitionId = competitionCount;
        uint256 startTime = block.timestamp;

        Competition storage competition = competitions[competitionId];
        competition.name = _name;
        competition.description = _description;
        competition.photoUrl = _photoUrl;
        competition.entryFee = entryFee;
        competition.totalPool = 0;
        competition.startTime = startTime;
        competition.endTime = startTime + competitionDuration;

        emit CompetitionCreated(competitionId, _name, _description, _photoUrl, entryFee, competition.endTime);
    }

    //  Get A Single Competition by ID and all the details
    function getCompetitionDetails(uint256 competitionId) public view returns (
        string memory name,
        string memory description,
        string memory photoUrl,
        uint256 entryFee,
        uint256 totalPool,
        uint256 startTime,
        uint256 endTime,
        uint256 participantCount
    ) {
        Competition storage competition = competitions[competitionId];
        return (
            competition.name,
            competition.description,
            competition.photoUrl,
            competition.entryFee,
            competition.totalPool,
            competition.startTime,
            competition.endTime,
            competition.participantsArray.length
        );
    }

    // Get all competitions by anyone
    function getAllCompetitions() public view returns (CompetitionDetails[] memory) {
        CompetitionDetails[] memory allCompetitions = new CompetitionDetails[](competitionCount);
        for (uint256 i = 0; i < competitionCount; i++) {
            uint256 competitionId = i + 1;
            Competition storage competition = competitions[competitionId];
            allCompetitions[i] = CompetitionDetails(
                competitionId,
                competition.name,
                competition.description,
                competition.photoUrl,
                competition.entryFee,
                competition.totalPool,
                competition.startTime,
                competition.endTime,
                competition.participantsArray.length
            );
        }
        return allCompetitions;
    }


    function enterCompetition(uint256 competitionId, string memory fileUrl, string memory description) public payable {
        Competition storage competition = competitions[competitionId];
        require(block.timestamp <= competition.endTime, "Competition has ended");
        require(msg.value == competition.entryFee, "Incorrect entry fee amount");
        require(!competition.participants[msg.sender], "You have already entered this competition");
        require(bytes(fileUrl).length > 0, "File URL cannot be empty");

        // Add participant to the competition
        competition.participants[msg.sender] = true;
        competition.participantsArray.push(msg.sender);
        
        // Store participant's entry details
        competition.participantEntries[msg.sender] = ParticipantEntry({
            fileUrl: fileUrl,
            description: description,
            timestamp: block.timestamp
        });
        
        // Increase the total pool
        competition.totalPool += msg.value;
        
        emit EntrySubmitted(competitionId, msg.sender, fileUrl, description);
    }

    // get all entries in a competition
    function getAllEntries(uint256 competitionId) public view returns (ParticipantEntryDetails[] memory) {
        Competition storage competition = competitions[competitionId];
        uint256 participantCount = competition.participantsArray.length;
        
        ParticipantEntryDetails[] memory entries = new ParticipantEntryDetails[](participantCount);
        
        for (uint256 i = 0; i < participantCount; i++) {
            address participant = competition.participantsArray[i];
            ParticipantEntry storage entry = competition.participantEntries[participant];
            
            entries[i] = ParticipantEntryDetails({
                participant: participant,
                fileUrl: entry.fileUrl,
                description: entry.description,
                timestamp: entry.timestamp,
                voteCount: competition.votes[participant]
            });
        }
        
        return entries;
    }

    // Vote in a competition
    function vote(uint256 competitionId, address candidate) public {
        Competition storage competition = competitions[competitionId];
        require(block.timestamp <= competition.endTime, "Competition has ended");
        require(competition.participants[candidate], "Not a valid participant");
        require(!competition.voters[msg.sender], "You have already voted");

        competition.votes[candidate]++;
        competition.voters[msg.sender] = true;
        emit VoteCast(competitionId, msg.sender, candidate);
    }

    


}
