 /* Necessary import:
 */
 import "@testing-library/jest-dom";
 import { render, screen} from "@testing-library/react";
 import userEvent from "@testing-library/user-event";
 /**
  * Import all the related component(s) here:
  * 
  * 
  */
 import PlayQuiz from '../components/PlayQuiz'
 
// Mock quiz data
const quiz = {
    "id": "123",
    "name": "Math Challenge",
    "questions":[
      {
        "id":1,
        "questionName": "What is 2 + 2?",
        "options": ["3", "4", "5", "6"],
        "correct_answer": "4",
        "points": 5
      },
      {
        "id":2,
        "questionName": "Solve: 5 * 8",
        "options": ["35", "40", "45", "50"],
        "correct_answer": "40",
        "points": 10
      }
    ],
    "highest_score": 10
  };
  
  describe('PlayQuiz component', () => {
    it('renders quiz name and questions', () => 
    {
        const user = userEvent.setup();
        render(<PlayQuiz quiz={quiz} />);

        expect(screen.getByText('Math Challenge')).toBeInTheDocument();
        expect(screen.getByText('1. What is 2 + 2?')).toBeInTheDocument();
        expect(screen.getByText('2. Solve: 5 * 8')).toBeInTheDocument();
    });
  
  
  });
 
