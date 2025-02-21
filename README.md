# Interactive Quiz Platform

A modern quiz application built with React and Tailwind CSS that allows users to take timed quizzes and track their progress.

## Features

- Interactive quiz interface with multiple-choice and written questions
- Timer-based questions (30 seconds per question)
- Instant feedback on answers
- Quiz history tracking using IndexedDB
- Responsive design for all devices
- Progress tracking and scoring
- unlimited attempts support

## Technologies Used

- React
- Tailwind CSS
- IndexedDB (via idb)
- FontAwesome for icons
- ReduxToolkit for state management

## Running Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the local server URL

## Project Structure

- `/src/Component` - React components
- `/src/Questions` - Quiz questions and other static data
- `/src/DB` - Utility functions and database operations

## Quiz Features

- 30-second timer per question
- Instant feedback on answer selection
- Score tracking and history
- Ability to retry the quiz
- Clean and intuitive user interface
