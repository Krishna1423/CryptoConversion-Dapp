// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract DataConsumerV3 {
    
    struct FeedInfo {
        AggregatorV3Interface aggregatorData;
        string desc;  //denotes conversion pair
    }

    mapping(uint => FeedInfo) feeds; 

    constructor() {
        // BTC/USD
        feeds[1] = FeedInfo(AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43),"BTC/USD");
        // ETH/USD
        feeds[2] = FeedInfo(AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306),"ETH/USD");
        // LINK/USD
        feeds[3] = FeedInfo(AggregatorV3Interface(0xc59E3633BAAC79493d908e63626716e204A45EdF),"LINK/USD");
        // BTC/ETH 
        feeds[4] = FeedInfo(AggregatorV3Interface(0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22),"BTC/ETH");
    }

    function getChainLinkDataFeedLatestAnswer(uint feedId) external view returns (int) {
       FeedInfo storage feed = feeds[feedId];
       (
        /* uint80 roundID */,
        int answer,
        /* uint startedAt */,
        /* uint timeStamp */,
        /* uint80 answeredInRound */
       ) = feed.aggregatorData.latestRoundData();
       return answer;
    }
}