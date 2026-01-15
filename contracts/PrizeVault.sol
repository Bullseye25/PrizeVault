// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrizeVault is ReentrancyGuard, Ownable {
    IERC20 public usdc;

    struct Player {
        uint256 principalBalance; // Withdrawable User Deposit
        uint256 winningsBalance;  // Won from the lottery (Withdrawable or Convertible)
        uint256 bonusBalance;     // Non-withdrawable, for tickets only
        uint256 ticketBalance;    // Active tickets for the draw
        bool exists;
    }

    mapping(address => Player) public players;
    address[] public playerList;
    
    uint256 public totalPrincipal;
    uint256 public totalTickets;
    
    // Events
    event Deposit(address indexed user, uint256 amount);
    event BonusAwarded(address indexed user, uint256 amount);
    event TicketsPurchased(address indexed user, uint256 cost, uint256 ticketAmount, string source);
    event WithdrawPrincipal(address indexed user, uint256 amount);
    event WithdrawWinnings(address indexed user, uint256 amount);
    event WinningsConverted(address indexed user, uint256 amount);
    event WinnerPicked(address indexed winner, uint256 prizeAmount);
    
    constructor(address _usdcToken) Ownable(msg.sender) {
        usdc = IERC20(_usdcToken);
    }

    // 1. Deposit USDC
    function deposit(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount must be > 0");
        require(usdc.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        if (!players[msg.sender].exists) {
            players[msg.sender].exists = true;
            playerList.push(msg.sender);
        }

        players[msg.sender].principalBalance += _amount;
        totalPrincipal += _amount;
        
        // 5% Bonus if deposit >= 20 USDC
        if (_amount >= 20 * 10**6) { 
            uint256 bonus = (_amount * 5) / 100;
            players[msg.sender].bonusBalance += bonus;
            emit BonusAwarded(msg.sender, bonus);
        }

        emit Deposit(msg.sender, _amount);
    }

    // 2. Buy Tickets
    // Sources: 0 = Principal, 1 = Bonus, 2 = Winnings
    function buyTickets(uint256 _usdcAmount, uint8 _source) external nonReentrant {
        require(_usdcAmount > 0, "Amount must be > 0");
        Player storage player = players[msg.sender];
        
        string memory sourceStr;

        if (_source == 0) {
            require(player.principalBalance >= _usdcAmount, "Insufficient principal");
            player.principalBalance -= _usdcAmount;
            totalPrincipal -= _usdcAmount; // Consumed into the pot
            sourceStr = "PRINCIPAL";
        } else if (_source == 1) {
            require(player.bonusBalance >= _usdcAmount, "Insufficient bonus");
            player.bonusBalance -= _usdcAmount;
            sourceStr = "BONUS";
        } else if (_source == 2) {
             require(player.winningsBalance >= _usdcAmount, "Insufficient winnings");
             player.winningsBalance -= _usdcAmount;
             // Winnings used for tickets are also consumed
             sourceStr = "WINNINGS";
        } else {
            revert("Invalid source");
        }

        uint256 newTickets = _usdcAmount * 10;
        player.ticketBalance += newTickets;
        totalTickets += newTickets;

        emit TicketsPurchased(msg.sender, _usdcAmount, newTickets, sourceStr);
    }

    // 3. Withdraw Principal
    function withdrawPrincipal(uint256 _amount) external nonReentrant {
        require(players[msg.sender].principalBalance >= _amount, "Insufficient principal");
        
        players[msg.sender].principalBalance -= _amount;
        totalPrincipal -= _amount;
        
        require(usdc.transfer(msg.sender, _amount), "Transfer failed");

        emit WithdrawPrincipal(msg.sender, _amount);
    }

    // 4. Withdraw Winnings
    function withdrawWinnings(uint256 _amount) external nonReentrant {
        require(players[msg.sender].winningsBalance >= _amount, "Insufficient winnings");

        players[msg.sender].winningsBalance -= _amount;
        // Winnings are not part of 'totalPrincipal', they are surplus in the contract
        
        require(usdc.transfer(msg.sender, _amount), "Transfer failed");

        emit WithdrawWinnings(msg.sender, _amount);
    }

    // 5. Convert Winnings to Deposit (Compound)
    function convertWinningsToDeposit(uint256 _amount) external nonReentrant {
        require(players[msg.sender].winningsBalance >= _amount, "Insufficient winnings");

        players[msg.sender].winningsBalance -= _amount;
        players[msg.sender].principalBalance += _amount;
        totalPrincipal += _amount; // Now it is part of the liability

        emit WinningsConverted(msg.sender, _amount);
    }

    // SIMULATED DRAW (Admin manually picks winner and amount for Demo)
    function drawWinner(address _winner, uint256 _prizeAmount) external onlyOwner {
        require(totalTickets > 0, "No tickets");
        // In real VRF, we'd pick random address. Here we let admin simulate.
        
        players[_winner].winningsBalance += _prizeAmount;
        
        // Reset tickets? For demo we might keep them or reset. 
        // Let's reset purely for simulation logic if desired, or keep cumulative.
        // For this hackathon demo, we simply award the prize.
        
        emit WinnerPicked(_winner, _prizeAmount);
    }
}
