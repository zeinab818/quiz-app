# 🧠 Quiz App

An interactive and customizable quiz application built using **HTML**, **CSS**, and **JavaScript (OOP)**.  
Users can select their desired **category**, **difficulty level**, and **number of questions** to start a quiz tailored to their preferences.

🎮 **Live Demo**: [Open App](https://zeinab818.github.io/quiz-app)

---

## 🎯 Features

- ✅ Choose your preferred **quiz category**, **difficulty**, and **question count**
- 🔄 Dynamic data fetching from the [Open Trivia DB API](https://opentdb.com/)
- 🧠 Multiple-choice questions with score tracking
- 💡 Instant feedback on correct and incorrect answers
- 📱 Fully responsive design using CSS and boostrap(framework)
- 👩‍💻 Structured with **Object-Oriented JavaScript**

---

## 🧪 Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
  - OOP (Classes, Encapsulation)
  - Fetch API for external data

---

## 🔗 API Reference

The app uses the **Open Trivia DB API** to fetch quiz questions based on user input.

Dynamic API call format:
```js
https://opentdb.com/api.php?amount=${this.number}&category=${this.category}&difficulty=${this.difficulty}
