# finstock
# URL to live website

# Summary
###  Stock Market Research and tools
This is an educational website meant to provide stock market research and analyst for users to make their own judgement call.
### Context and Justification
This project aim to provide users a one stop location where they can access to financial information and necessary tools to make better investment decision. 
# 5 Planes of Design 
## Target audience group:
### People who are interested in the fundamental analysis. 
**Age:** 18 above  

**Occupation:** Students, Working Adults anyone who is keen to learn more about finance.

**IT Literacy Level:** Able to use computers with varying proficiency

**Goals:** 
Provide information about the company finances
Specifically, companies traded in the stock exchange around the world.
Have a better understanding before making any decision.

**Considerations:**
No exposure to finance jargon, need to ease them slowly. Design should be user friendly and easy for them to understand.

### Technical people
**Age:** 18 onwards 

**Occupation:** STEM Occupations

**Educational Level:** Tertiary

**IT Literacy Level:** Proficient at computers and familiar with computing concepts

**Goals:** 
Want to know the more technical aspects of finance

**Considerations:**  
Information presented needs to be technically accurate
Can handle more complex concepts which will give them better understanding

## UI/UX:
### User Stories
- As a working adult with little time and no prior knowledge about finance and investment, I want to learn more about them so that I can decide whether to invest in them.
Acceptance Criteria
Non-technical, gentle introduction of jargon

### Special considerations:
Due to the jurisdiction in which the website is created in, there should be no financial advice whatsoever. 
## Content & Features:

### Webpages

- ### Home Page
A way to access all 3 webpages from the landing page with a search bar function to find the desire ticker symbol.

- ### Stock Analysis Page
Dashboard that provide basic information about company and render the different financial statement chart.

- ### Market Map
This page provide general market sentiment of the world. Users are able to see which sector or country are performing better than its counterpart.

## Design

### Color Palette
![alt text](./images/Theme%20Colour.png)

The choice of color was primarily based on black and white theme. Associated with professionalism, minimalism and simplicity. Orange was used as the accent color, corresponding with success, determination and fun. 

### Font Palette

The following choices of font were made. 

Header: `font-family: 'Playfair Display', sans-serif;`

Body: ``font-family: 'Source Sans Pro', regular;``



### API Endpoints
Income Statement Data: 
https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo

Time Series Daily Data:
https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo

Earning Data:
https://www.alphavantage.co/query?function=EARNINGS&symbol=IBM&apikey=demo


### Technologies Used

## Used in all 3 sites in various ways
- HTML5
- CSS3
- JavaScript
- Bootstrap v5.1
- Font Awesome
- Google Fonts

## Used in production
- Visual Studio Code
- Git
- GitHub
- Netlify

## Used for widgets stock-analysis.html and others
Charts
- Apex Charts
- Tableau

# TEST CASES
| #  | Test Description | Test Steps | Expected Result |
| ------------- | ------------- | ------------- | ------------- |
|  | In home.html | In home.html | In home.html |
|  | Prerequisite: The user is at search bar of the home page |  |  |
| 1 | Able to search for ticker symbol of company | 1) Enter the ticker symbol into the textbox as aapl <br/> 2) Click the find icon or enter | Page will be redirect to stock-analysis.html <br/> <ul> <li> Company information should be display on side bar </li> <li> Default 1 day synchronise chart should load |
|  | In stock-analysis.html | In stock-analysis.html | In stock-analysis.html |
| 2 | Company earning and revenues chart should render | 1) Click on earning button at side bar | Expected to see reported and estimated EPS bar chart |
| 3 | Company debt to assets chart should render | 1) Click on financials button at side bar | Expected to see assets and liabilities bar chart with Debt to Assets show as line graph |
|  | Prerequisite: The user is at synchronise chart |  |  |
| 4 | Synchronise chart able to render the different time series selected base on the radio button selected | 1) Click on 1W radio button | Chart label date should show date frequency + 7 days (DD MMM) from left to right |
|  | In market-maps.html | In market-maps.html | In market-maps.html |
| 5 | Able to display the different tree chart selected in the side button | 1) Click on Australia at the side bar | Tableau chart show render |
|  | Prerequisite: The user is at Australia tree chart |  |  |
| 6 | Able to select the sector user wish to display | 1) Unclick the all checkbox <br/> 2) Select consumer staples checkbox | Expected to only see compaines in consumer staples sector |
| 7 | Hightlight textbox searching for company | 1) Click on the highlight checkbox <br/> 2) Select AGL Energy Limited | Box should be highlighted |

# Deployment
Hosted on Netlify free plan, without database. All dependencies are delivered via CDN. 
To deploy, fork this code, link your Github account with netlify, and make this repo a site. 

# Dependencies
- Bootstrap v5.1
- Font Awesome
- Google Fonts
- Apex Charts
- Axios
- Moment 
- Tableau

# CREDITS AND ACKNOWLEDGMENT
- Visual Studio Code
- Git
- GitHub
- Netlify
- HTML5
- CSS3
- JavaScript
- Bootstrap v5.1
- Font Awesome
- Google Fonts
- Apex Charts
- Axios
- Tableau
- Tim Wood, Iskren Chernev, Moment.js 
