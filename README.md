# FYP-G3 wissen
INTRODUCTION-OVERVIEW:

We are aiming to design a project which will target the students of O Levels and A Levels specifically. We want to optimize the learning and exam preparation phases for students in such a way that it would save their time and manual labor. The project would focus on making the “Yearly” and “Topicals” Past Papers and Marking Schemes available on the same website and trainging the website on them, in order to provide students with AI prompts where they can ask academic related or questions from past papers and generate past papers on the existing pattern, moreover pdf notes and books would also be available on the website for the students to refer.

INTRODUCTION-MOTIVATION:
1. Address resource fragmentation: Students often struggle to find past papers, marking schemes, notes, and textbooks in one centralized location.

2. Optimize study time: Reduce time spent searching for materials, allowing students to focus more on learning and exam preparation.

3. Leverage AI for personalized learning: Incorporate AI to assist students with academic-related questions, enhancing their study experience.

4. Support student success: Provide a streamlined, accessible platform to improve the overall exam preparation process for O and A Levels. 

PROBLEM STATEMENT:

Clear Definition of the ProblemO and A Levels students face difficulties in efficiently managing study schedules and accessing centralized resources. Key materials like past papers, marking schemes, and notes are fragmented across multiple platforms, leading to wasted time and effort during exam preparation.

Why This Problem is SignificantThis inefficiency in preparation can negatively affect students' performance in critical exams, potentially limiting their academic and career opportunities. Additionally, students from disadvantaged backgrounds often struggle to access high-quality educational resources, further widening the gap in academic outcomes.

SYSTEM DESIGN AND KEY COMPONENTS:
1. User Layer: 
Students: Access resources, use AI tutor, take mock exams.
Administrators: Manage accounts, oversee functionality, update content.
Interactions: Students log in and use resources. Students interact with AI for personalized assistance and questions.

2. Frontend Layer:
User Interface (UI): Displays resources and interactions.
Search and Navigation: Allows access to resources.
Content Display: Presents materials, exams, AI-generated questions.
Interactions: Users search for and view content. Data from the backend is displayed dynamically.

3. Backend Layer: 
API Services: Handles frontend requests and data processing.
Authentication: Manages logins and sessions.
Data Processing: Retrieves and processes data from the database.
Interactions: Receives and processes requests from the frontend. Manages secure access and data transactions.

4. AI & Machine Learning Layer: 
Question Generation: Creates practice questions based on curriculum.
AI Tutor: Provides explanations and helps with concepts.
Feedback Mechanism: Analyzes performance and offers feedback.
Interactions: Processes user input and performance data. Generates responses and sends them to the frontend.

5. Database Layer:
Data Storage: Stores past papers, notes, textbooks.
Data Retrieval: Provides data to the backend based on queries.
Interactions: Backend queries the database for data retrieval and updates. Ensures data integrity and efficient management.

6. Integration Layer: 
Third-Party APIs: For cloud storage and educational tools.
External Educational Tools: Enhances platform functionality.
Interactions: Connects with external services for additional features and storage.







