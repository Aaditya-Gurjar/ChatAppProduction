import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login"
import "./InterviewQuestions.css"; // Import CSS for styling

const InterviewQuestions = () => {
  const navigate = useNavigate(); // For navigation

  // Array of 20 top common interview questions and answers
  const questionsAndAnswers = [
    { question: "Can you tell me about yourself?", answer: "Provide a concise summary of your background, skills, and experience relevant to the role." },
    { question: "What are your strengths?", answer: "Highlight specific strengths that align with the job description, like problem-solving or teamwork." },
    { question: "What are your weaknesses?", answer: "Mention a real weakness and how you're working to overcome it, showing self-awareness and growth." },
    { question: "Why do you want to work here?", answer: "Research the company and mention its values, culture, or recent achievements that resonate with you." },
    { question: "Where do you see yourself in five years?", answer: "Share realistic career aspirations that align with the role and company growth." },
    { question: "Why should we hire you?", answer: "Explain how your skills, experience, and personality make you the ideal fit for the role." },
    { question: "Can you explain a challenging situation you faced and how you handled it?", answer: "Describe a specific example using the STAR method (Situation, Task, Action, Result)." },
    { question: "What is your greatest professional achievement?", answer: "Share an accomplishment that had a significant impact, quantifying results where possible." },
    { question: "How do you handle stress and pressure?", answer: "Explain techniques you use to manage stress and provide an example of a high-pressure situation you handled well." },
    { question: "What do you know about our company?", answer: "Demonstrate research by mentioning the company's mission, products, or recent news." },
    { question: "Why did you leave your last job?", answer: "Be honest but positive, focusing on how the new role aligns with your goals." },
    { question: "What is your expected salary?", answer: "Provide a range based on market research, emphasizing flexibility and interest in the role." },
    { question: "Do you prefer working alone or in a team?", answer: "Express flexibility, with examples of thriving in both solo and collaborative environments." },
    { question: "How do you prioritize your work?", answer: "Discuss tools or methods like task lists or project management software that you use to stay organized." },
    { question: "What motivates you?", answer: "Mention factors like challenges, growth opportunities, or making a meaningful impact." },
    { question: "Do you have any questions for us?", answer: "Prepare thoughtful questions about the role, team, or company to show genuine interest." },
    { question: "What is your leadership style?", answer: "Describe your leadership approach, providing examples if you have experience leading teams." },
    { question: "How do you handle feedback?", answer: "Emphasize openness to feedback and your approach to applying it constructively." },
    { question: "Can you explain a time you failed and what you learned?", answer: "Share a genuine failure and focus on the lessons learned and how you improved." },
    { question: "What are your hobbies or interests outside of work?", answer: "Share hobbies that highlight skills or traits relevant to the role, if possible." },
  ];

  // Redirect handler for the button
  const handleRedirect = () => {
    navigate("/getMoreQuestions"); // Redirect to the login page
  };

  return (
    // <div className="main-container">
    //   <button className="redirect-btn" onClick={handleRedirect}>
    //     See More Interview Questions
    //   </button>

    //   <div className="questions-container">
    //     {questionsAndAnswers.map((item, index) => (
    //       <div key={index} className="question-answer">
    //         <h3>{item.question}</h3>
    //         <p>{item.answer}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <Login/>
  );
};

export default InterviewQuestions;
