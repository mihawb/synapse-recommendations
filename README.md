# Recommendation Engine for Spotify

## What?
A song recommendation engine that allows the user to log in with Spotify and recommends them a list of songs similar to their listening history or recent favourite tracks.

## Why?
It started as a project for [Azure and AI](https://github.com/ekote/Azure-and-AI) course. Even though it got nearly full marks I was unsatisfied with *less than ideal* recommendation algorithm, and so I came up with a better one.

## How?
The current recommendation algorithm basically required rewriting whole Azure Functions module from ground up, but now the recommendations are on point! This is achieved in two steps:
1. genre selection - similar genres to those in the input song list are selected based on TF-IDF matrix and cosine similarity. An assumption was made here that if two genres have similar names they will most probably sound alike too;
2. song selection - relevant songs are grouped by k-means clustering algorithm and songs nearest to the clusters' centers (it's kNN if you're only looking for buzzwords) are selected as recommendations.   

Should you need a more detailed explanation, look no further than the [R&D directory in this repo](https://github.com/mihawb/synapse-recommendations/tree/main/R%26D).

## Demo
https://user-images.githubusercontent.com/46073943/206925426-8be40784-f72f-447e-b463-9de90f1acdcd.mp4

## Technologies used
* MS Azure with App Service, SQL Server and Functions  
* Python with whole lot of libraries for data exploration like Polars and scikit-learn
* React 
* Github Actions for CI/CD

## Archtecture
Please keep in mind that using at least three Azure resources was a requirement of the project. Otherwise, App Service could handle what Functions were used for, or we could abandon those three services altogether and use Spark pools instead. Unfortunately for The Zen of Python practitioners (myself included), there is more than one way to solve this. 
![architecture](https://user-images.githubusercontent.com/46073943/206925579-95c00d1c-77e9-4ae0-bfa5-b0c225752c47.jpg)

## Limitations
Integration with Spotify is the best and the worst part of this project. The best because users are allowed to effortlessly capture their listening habits and have this engine generate recommendations for them, which they can easily add to their library. The worst, because you will not experience it. 
![quotaext](https://user-images.githubusercontent.com/46073943/206925526-bac72ab9-29c4-4758-9c89-6cc3c1799ea5.png)

## Our team
Oh, the university projects, amirite. Let the [Contributors tab](https://github.com/mihawb/synapse-recommendations/graphs/contributors) speak for itself.
