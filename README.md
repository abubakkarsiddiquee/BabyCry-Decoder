# BabyCry Decoder – Infant Cry Analysis System

## Branch Structure

### `main`

Main frontend branch containing the core mobile application features, UI development, and ML integration workflow.

### `auth-feature`

Authentication branch focused on user login, signup, JWT authentication, and account management features.

### `backend`

Backend branch containing server-side development, API implementation, database integration, and model communication logic.

## Overview

BabyCry Decoder is a machine learning-based mobile application designed to help parents understand infant needs through cry pattern analysis. The system analyzes baby cry audio and predicts possible conditions such as hunger, discomfort, tiredness, or burping using deep learning techniques.

## Features

* Infant cry classification using CNN-based deep learning
* Audio preprocessing and spectrogram generation
* Real-time cry analysis through a mobile application
* User authentication and account management
* Instant care suggestions based on prediction results

## Key Contributions

* Led the development of an ML-based system to identify infant needs from crying patterns
* Built and processed an infant audio dataset by converting raw audio into spectrograms for feature extraction
* Trained and optimized a CNN model using TensorFlow/Keras for cry classification and pattern recognition
* Integrated the trained model into a React Native mobile application for real-time cry analysis and care suggestions
* Prepared the project proposal, secured faculty approval, and coordinated the development process within the team
* Designed a user-focused interface and recommendation system to support parents with newborn care guidance

## Tech Stack

### Machine Learning

* Python
* TensorFlow
* Keras
* CNN Architecture

### Signal Processing

* Librosa

### Mobile Development

* React Native

### Backend

* Node.js
* Express.js
* MySQL

### Tools & Design

* Jira
* Figma
* GitHub
* JWT Authentication
* Team Collaboration

## System Workflow

1. Collect infant cry audio
2. Convert audio into spectrograms using Librosa
3. Train CNN model on processed dataset
4. Integrate trained model into the mobile application
5. Predict infant needs from real-time audio input
6. Provide care suggestions to users

## Future Improvements

* Improve model accuracy with larger datasets
* Add cloud-based inference support
* Implement push notifications and parental reminders
* Enhance recommendation accuracy with advanced deep learning models

## Contributors

Developed as an academic and research-focused project for intelligent newborn care assistance.
