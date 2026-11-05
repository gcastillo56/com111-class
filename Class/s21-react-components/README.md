## 📝 Student Mission Prompt 

### 🌿 Scenario
You are building the frontend interface for the **SustainHub Climate Action Explorer**. The dashboard needs to display a grid of municipal climate projects, allow users to vote and bookmark initiatives in real time, and navigate to a dedicated details page for any selected project without refreshing the browser page.


The exercise requires you to build a React Application from scratch to achieve this. The landing page should display the available initiatives that will the following shape:

```js
const SAMPLE_INITIATIVES = [
  { id: '101', title: 'Campus Solar Canopy', category: 'Energy', votes: 14, description: 'Lorem ipsum', author: 'Dr. X' },
  { id: '102', title: 'Zero-Waste Cafeteria Loop', category: 'Waste', votes: 29, description: 'Lorem ipsum', author: 'Master Splinter' },
  { id: '103', title: 'Urban Rainwater Harvester', category: 'Water', votes: 8, description: 'Lorem ipsum', author: 'Dr. Banner' }
];
```

They should be displayed as Cards in the landing page. These cards should only display the title and the number of votes it holds, as well as a button to vote on any of the given initiatives. When clicking on the card, you should be taken to a "detail" page that should display the rest of the information. The page should be bookmarkable, thus the parameter should travel in the url.

Although the styling of things is not something I will be grading, try to get acquainted with using tailwind, you can ONLY use GenAI for this purpose.

To display multiple multiple elements out of a list, we use the map function as follows:

```js
<div className="row g-4">
    {SAMPLE_INITIATIVES.map((item) => ( <MyComponent .../> ))}
</div>
```