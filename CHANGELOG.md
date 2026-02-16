# Changelog

All notable changes to Cricket 2021 will be documented in this file.

## [Version 2.1.0] - 2026-02-15

### Fixed
- **ScoreCard Error**: Fixed crash when exiting bilateral series due to undefined track data
- Added safe access to track properties with default values

### Changed
- **Match-Level Configuration**: Pitch type and toss selection now happen before each match
  - Choose pitch conditions per match for variety
  - Toss winner and decision (bat/bowl first) selection
  - More realistic tournament experience
  
- **Group Stage Logic**: Even number of teams now split into two groups
  - Teams divided equally into Group A and Group B
  - Round-robin within each group
  - Top 2 from each group advance to semi-finals
  - Odd number of teams still use single round-robin format
  
- **Enhanced Match View**: New tabbed interface during matches
  - Live Match: Current match action
  - Current Batting: Live scorecard of batting team
  - Standings: Real-time tournament standings
  - Stats: Tournament statistics
  
- **Post-Match View**: Comprehensive match summary with tabs
  - Team 1 Scorecard: Full batting card for first team
  - Team 2 Scorecard: Full batting card for second team
  - Standings: Updated tournament table
  - Stats: Updated player statistics
  - Easy navigation between different views

### Added
- **MatchSetup Component**: Pre-match configuration screen
- **TournamentMatchView Component**: Live match with tournament context
- **PostMatchView Component**: Post-match analysis and navigation

## [Version 2.0.0] - 2026-02-15

### Added
- **Tournament Mode**: Full tournament system with group stages, semi-finals, and finals
  - Automatic standings calculation with points system (2 points for win, 1 for tie)
  - Net Run Rate (NRR) calculation for tie-breaking
  - Top 4 teams qualify for playoffs
  - Match stage indicators (Group Stage, Semi-Final, Final)
  
- **Bilateral Series Mode**: Play multi-match series between two teams
  - Choose between 3, 5, or 7 match series
  - Series scoreboard tracking wins for each team
  - Match-by-match results summary
  
- **Statistics Tab**: Tournament-wide player statistics
  - Top 5 run scorers (minimum 100 runs)
  - Top 5 highest strike rates (minimum 100 runs)
  - Displays runs, balls faced, and strike rate for each player
  
- **New Pitch Type - Dusty**: Added dusty pitch condition
  - Difficulty level: 5.5/10 (between Wet and Normal)
  - Moderate turn and slower pace
  - Slightly favors bowlers but more batting-friendly than Wet
  
- **Mode Selection Screen**: Choose between Quick Match, Bilateral Series, or Tournament

### Changed
- **Pitch Difficulty Rebalancing**:
  - Wet pitch: Reduced difficulty from 8/10 to 6/10 (more scoring opportunities)
  - Green pitch: Maintained at 7/10 difficulty
  - Normal pitch: Maintained at 4/10 difficulty (balanced)
  - Hard pitch: Maintained at 2/10 difficulty (batting-friendly)
  
- **Player Archetype Update**: Position 6 (e.g., Jadeja) changed from ALL_ROUNDER to POWER_HITTER
  - Increased scoring rate for better-paced innings
  - More aggressive shot selection
  - Higher boundary percentage

### Technical
- Added new components: ModeSelection, TournamentSetup, BilateralSetup, TournamentManager, BilateralManager, TournamentStandings, StatsTab, MatchSetup, TournamentMatchView, PostMatchView
- Enhanced PickTeams component with mode management
- Updated improvedRandomNumber.js with new pitch modifiers and player archetypes
- Improved game state tracking for tournament and series modes
- Fixed Node.js 17+ OpenSSL compatibility in package.json

### Notes
- This version introduces major gameplay modes while maintaining backward compatibility with quick match mode
- All existing features remain functional
- Tournament mode requires minimum 4 teams to start
- Match-level configuration provides more control and realism
