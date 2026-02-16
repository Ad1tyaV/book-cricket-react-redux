# Cricket 2021 - New Features Guide

## Overview
This document describes the new features added to Cricket 2021 in version 2.0.0.

## 1. Player Performance Fix
**Issue**: Player at position 6 (e.g., Jadeja) was playing too slowly.

**Solution**: Changed the archetype for position 6 from ALL_ROUNDER to POWER_HITTER across all formats:
- T20: Now plays more aggressively with higher boundary percentage
- ODI 50: Increased scoring rate from ~6.0 to ~7.8 runs per over
- ODI 40: Enhanced strike rate for faster innings building

## 2. New Pitch Type - Dusty
**Description**: A new pitch condition that sits between Wet and Normal in difficulty.

**Characteristics**:
- Difficulty: 5.5/10
- Offers moderate turn and slower pace
- More batting-friendly than Wet pitch
- Slightly favors bowlers compared to Normal pitch
- Realistic for subcontinental conditions

**Modifiers**:
- Wicket chance: +1
- Dot balls: +4
- Singles: +2
- Boundaries: Slightly reduced

## 3. Pitch Difficulty Rebalancing
**Changes Made**:
- **Wet Pitch**: Reduced from difficulty 8/10 to 6/10
  - Less extreme dot ball frequency
  - Better scoring opportunities
  - More realistic match outcomes
  
- **Green Pitch**: Maintained at 7/10 (no changes)
- **Normal Pitch**: Maintained at 4/10 (no changes)
- **Hard Pitch**: Maintained at 2/10 (no changes)

## 4. Tournament Mode
**Features**:
- Select 4+ teams from available roster
- Round-robin group stage (all teams play each other)
- Automatic standings calculation with:
  - Points system (2 for win, 1 for tie, 0 for loss)
  - Net Run Rate (NRR) calculation
  - Matches played, won, lost tracking
  
- **Playoffs System**:
  - Top 4 teams qualify
  - Semi-Final 1: 1st vs 4th
  - Semi-Final 2: 2nd vs 3rd
  - Final: Winners of semi-finals
  
- **Match Stage Indicators**: Shows current stage (Group Stage, Semi-Final, Final)
- **Progress Tracking**: Displays current match number and total matches

## 5. Bilateral Series Mode
**Features**:
- Select any two teams
- Choose series length: 3, 5, or 7 matches
- Series scoreboard showing wins for each team
- Match-by-match results tracking
- Series winner declaration
- Complete match summary at series end

## 6. Statistics Tab
**Features**:
- **Top 5 Run Scorers**: Players with most runs (minimum 100 runs)
  - Shows: Player name, team, runs, balls faced, strike rate
  
- **Top 5 Strike Rates**: Fastest scoring players (minimum 100 runs)
  - Shows: Player name, team, runs, balls faced, strike rate
  
- Available in tournament mode
- Updates automatically after each match
- Qualification threshold ensures meaningful statistics

## 7. Mode Selection Screen
**Options**:
1. **Quick Match**: Traditional single match between two teams
2. **Bilateral Series**: Multi-match series between two teams
3. **Tournament**: Full tournament with multiple teams

## How to Use

### Quick Match
1. Select "Quick Match" from mode selection
2. Choose teams, pitch type, and overs
3. Play the match

### Bilateral Series
1. Select "Bilateral Series" from mode selection
2. Choose two teams
3. Select number of matches (3, 5, or 7)
4. Choose pitch type and overs
5. Play through the series

### Tournament
1. Select "Tournament" from mode selection
2. Select at least 4 teams (can select all 9)
3. Choose pitch type and overs
4. Play through group stage matches
5. View standings and statistics
6. Top 4 teams advance to playoffs
7. Play semi-finals and final

## Technical Details

### New Components
- `ModeSelection.js`: Initial mode selection screen
- `TournamentSetup.js`: Tournament configuration
- `BilateralSetup.js`: Series configuration
- `TournamentManager.js`: Tournament orchestration and logic
- `BilateralManager.js`: Series orchestration and logic
- `TournamentStandings.js`: Standings display with NRR
- `StatsTab.js`: Player statistics display

### Updated Components
- `PickTeams.js`: Enhanced with mode management
- `improvedRandomNumber.js`: Updated pitch modifiers and player archetypes

### NRR Calculation
Net Run Rate = (Runs Scored / Balls Faced) × 6 - (Runs Conceded / Balls Bowled) × 6

This provides accurate run rate per over for tie-breaking in standings.
