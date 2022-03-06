# Resale go where
<div class="image" style="display: inline-block;">
    <img src='images/desktopview.jpg'>
    <!-- <img src='images/mobile_view.jpg'> -->
</div>


## Project Summary

**Project Context**
```
Resale Go Where is a website developed to provide users with information to see the average price of resale flat in Singapore. The web application consist of charts that depicts the average transacted resale flat price trend from 2012 to 2022 feb, the least to most expensive flat type in individual town and number of different flat type transacted each year.
```
**Organization Goals**

The web app objective is to provide pricing information and the number of transacted flat type in each town to user/couples who would like to purchase resale flat instead of BTO.

**User Goals**

The aim of users is to obtain pricing inforamtion of resale flat from past year and use it as future reference/guide to purchase HDB flats in singapore. 

**Justification for the App**

The gov data sg provides dataset on pricing for different location. However, no data visualisation on the resale flat price were provided and hard for user to see consolidate the information for reference (the raw data has 10 thousand over records). Hence, having a chart that display average price trend would give user a easlier time to review the past year resale flat pricing.     

**URL for project**

_Orgranisation_
* objective: Provide a data visualiation on the past year average resale flat pricing 

_User_
*Objective: To get the insight on the past year resale flat price and trend, so that user can know which location has the highest resale value.

**UX/UI**

### **Strategy**

User stories | Acceptance Criteria
-------------|--------------------

As a user, I want to know the past 10 years average resale flat price | feature that display a line graph that enable user to review past 10 years average resale flat price

As a user, I want to see the average reslae flat price by town region so that I can compare price between different town that is with in the same region | feature that will sort towns by region and only display the average resale flat price line graph by region when a particular region is selected.  

As a user, I want to see the price of different flat type in particular town | feature that will display line graph of different flat types of the average resale flat pricing in a particular town.

### **Scope**

_Functional Specifications_
1. Users will be able to see the past year average resale flat pricing through a line chart plot
2. Users will be able to see the past year average resale flat pricing sorted by town
3. User will see the number of transacted resale flat sorted by town and year


_Non-functional:_
1. mobile responsive 
2. performanace requirement - (how fast would the data be fetch back from axios)


### **Structure**
do a powerpoint slides



### **Skeleton**



### **Surface**



### ***Features**

_Chart_

ApexCharts is used to display datasets that were sorted by the appliction from data.gov

_Radio buttons and dropdown_

The application is able to sort and display chart results base on town location and year

### **Technologies and Credits

HTML5, CSS3 and Javascript were used

gov data sg provided the datasets

axios cdn was used for retrieving data.

Apexchart API was used to display the graph

Paul's Github source code were used as references

Images for the webpage from pexel.com, google images 


### **Testing**



