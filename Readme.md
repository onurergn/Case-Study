# Readme

## Installation

- Install docker
- Install nodejs
- Install yarn
- Install vue cli (`npm i -g @vue/cli`)

- Install backend deps by running `yarn` in the backend folder
- Install frontend deps by running `yarn` in the frontend folder

### Database
On Mac / Linux machines you can run the database by navigating to the mongo folder and running

````
/bin/sh start.sh
````

### Frontend

You can run the frontend by navigating to frontend folder and running `yarn serve`

### Backend

You can run the backend by navigating to backend folder and running `yarn start`


## Assignment

Create an app that fetches NPS groupings and Emoticon averages from the backend endpoints. As an optional bonus, also fetch the NPS Score from another endpoint.

### Frontend instructions

Create a new Vue component for each of the items you're going to fetch from the backend. Each of the view should contain a button to fetch the data from the respective backend endpoint. Implement a loading state to the button to be displayed only when data is being fetched. After a successful fetch, the button should be disabled. The main view should display the data similar to the provided mockups. (See `Mockups.jpg`)

When data fetch completes, the component should emit the data to the parent component and the data should be updated accordingly.


## Backend instructions

The backend is using a mongoose as an ORM to the underlying data. You should take a look at the data schema in `backend/src/models/data.ts` to understand it. Also, you can see the whole database dump in `mongo/MOCK_DATA.json`. The data is already pre-loaded to the mongo docker image when you build it.

We've added a delay to the endpoints to more easily demonstrate the loading text.

### Emoticon average

The emoticon average should be calculated using the mongo aggregation framework, using only data that has the type `type: 'Emoticon'`.

### NPS Grouping

The NPS grouping should be calculated using the mongo aggregation framework. If you're unfamiliar with NPS, you can check it out at https://en.wikipedia.org/wiki/Net_Promoter

Basically, you need to group each NPS data to Promoters (value: 9 & 10), Passives: (value: 7 & 8) and Detractors: (values: 0-6). This can be done using a single aggregation pipeline. Hint: Use the `$group` operator.

### BONUSES: 

#### 1) NPS Score

NPS Score can be calculated with this formula: Percentage of promoters - Percentage of Detractors.

The idea is to use the NPS grouping you made in the previous assignment and calculate the score in the backend before passing the response back to the frontend.

For example: 
We have data with the scores of `4,5,2,8,10`

The total number of answers is `5`.

The number of promoters is `1` (value: 10)

The number of detractors is `3` (values 4,5,2)



The percentage of promoters is `1 / 5 = 20%`.

The percentage of detractors is `3 / 5 = 60%`.

The NPS Score is `20 - 60 = -40`.

You can double-check the answer using http://www.npscalculator.com/en


#### 2) Linting

 Please set up and use linting while coding "Backend". You can use any linting tool and strategy.
 
#### 3) Testing

 Please set up and write tests for at least frontend or backend by using Jest

## Useful links

https://docs.mongodb.com/manual/reference/operator/aggregation/group/

https://docs.mongodb.com/manual/reference/operator/aggregation/switch

**Any code in this repo might change without any prior notice and it's forbidden to share, serve or store it publicly personally
