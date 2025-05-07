// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract TalentChain {
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
        mapping(address => bool) voters;
        mapping(address => uint256) votes;

    }

    struct  CompetitionDetails {
        uint256 id;
        string name;
        string description;
        string photoUrl;
        uint256 entryFee;
        uint256 totalPool;
        uint256 startTime;
        uint256 endTime;

    }

    struct Winner {
        address winnerAddress;
        uint256 rewardAmount;
    }

    uint256 public competitionCount;
    mapping(uint256 => Competition) public competitions;
    mapping(uint256 => Winner) public winners;

    address public owner;
    uint256 public constant entryFee = 0.0054 * 10**18;
    uint256 constant competitionDuration =  7 days;

    event CompetitionCreated(uint256 CompetitionId, string name, string description,string photoUrl, uint256 entryFee, uint256 endTime);


    modifier onlyOwner(){
        require(msg.sender == owner, 'Owner Only Can Create A Competition');
        _;
    }

    constructor(){
        owner = msg.sender;
    }

    function createCompetition(string memory _name, string memory _description) public onlyOwner {
        require(bytes(_name).length > 0, "Empty Competition Name");
        require(bytes(_description).length > 0, "Empty Description");

        competitionCount++;
        uint256 CompetitionId = competitionCount;
        uint256 startTime = block.timestamp;

        Competition storage competition = competitions[CompetitionId]
        competition.name = _name;
        competition.description = _description;
        competition.photoUrl = _photoUrl;
        competition.entryFee = entryFee;
        competition.totalPool = 0;
        competition.startTime = startTime;
        competition.endTime = startTime + competitionDuration;

        emit CompetitionCreated(CompetitionId, _name, _description, entryFee, competitions.endTime);

    }

    function getAllCompetitions() public view returns (CompetitionDetails[] memory){
        Competition[] memory allCompetitions = new CompetitionDetails[](competitionCount);
        for(uint256 i = 0; i < competitionCount; i++){
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
                competition.endTime
            );

        }
        return allCompetitions;
    }


}
