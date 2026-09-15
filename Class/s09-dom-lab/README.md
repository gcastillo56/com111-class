# 🌿 COM111 Lab Challenge: Building the SDG 13 Climate Action Tracker

### 🎯 Learning Objectives
By completing this challenge, you will demonstrate mastery over:
1. **Dynamic DOM Manipulation:** Spawning, modifying, and deleting HTML elements programmatically using vanilla JavaScript (no jQuery allowed!).
2. **Dynamic UI Traversal:** Traversing and restructuring the HTML document tree on the fly to reorder elements.
3. **High-Performance Event Delegation:** Optimizing memory footprints by routing child click events through a single parent container.
4. **Interactive Application State:** Syncing real-time counters dynamically with DOM changes.

---

### 💻 The Scenario
You have been hired as a Junior Front-End Engineer for a green-tech NGO. Your first assignment is to build a high-performance, responsive **SDG 13: Climate Action Tracker Dashboard**. This dashboard allows activists to add municipal sustainability targets (e.g., *"Transition to 100% LED streetlights"*), rank them by environmental priority, dynamically move their priority up or down in real-time, and track active metrics—all without reloading the page.

---

### 🛠️ Your Mission: Core Requirements

Your implementation must successfully deliver the following features:

#### 1. Dynamic Task Spawning (No Hardcoding)
* Implement a form listener that intercepts submissions and programmatically creates a new climate action card.
* Each card must dynamically display the Action Title, its Priority Tier (High, Medium, Low), a Complete button, an Delete button, and reordering arrows.

#### 2. DOM Tree Traversal & Reordering
* Write logic using DOM relationship selectors (`.previousElementSibling`, `.nextElementSibling`, and `.insertBefore`) to let users swap a task card's position up or down.
* Ensure your reordering functions gracefully handle edge cases (e.g., trying to move the top card further "up" or the bottom card "down" must not cause runtime crashes).

#### 3. State-Driven Dynamic Counters
* Maintain real-time statistical counters at the top of the interface: **"Total Actions"** and **"Completed Actions"**.
* Whenever an action is added, toggled as "Complete", or deleted, these indicators must instantly update on-screen.

#### 4. High-Performance Event Delegation
* **Rule:** You are strictly forbidden from attaching individual event listeners to every button on every card.
* **Requirement:** Attach a *single* event listener to the parent container (`#action-list`). Capture all child click activities (completing, deleting, reordering) by intercepting the event bubble using `event.target` and `element.closest()`.

---

### 📂 Submission & Workspace Guidelines
* **Deliverable Folder:** Save your project inside your workspace directory under `/js-sprints/sdg-tracker/`.
* **Required Files:** `index.html` (comprising your layout and script) and a brief reflection in your team's weekly development log.
* **Code Standard:** Zero libraries (no jQuery, no Lodash). Use modern ES6+ arrow expressions, strict type checking, and clean, nested tag indentations.

---

### 🛡️ Academic Integrity & The "Explain-Back" Defense
Remember that this course operates under a strict **zero-tolerance academic integrity policy**. 

While you are encouraged to collaborate and utilize your AI Co-pilots, you must document your prompt history in your repository's `PROMPT_LOG.md`. Furthermore, you must be prepared for a **randomized "Explain-Back" Oral Defense**. 

During grading, any team member may be selected at random to perform a live, line-by-line walkthrough of the JavaScript logic. If a selected student cannot explain how the event bubble travels or how sibling DOM elements are dynamically swapped in memory, the entire team will receive a failing grade for this lab milestone. **Ensure everyone on your team has fully mastered every line of code!**
