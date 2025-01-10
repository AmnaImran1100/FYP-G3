from phi.agent import Agent, RunResponse
from phi.model.groq import Groq
# from phi.model.openai import OpenAIChat
from phi.tools.duckduckgo import DuckDuckGo
from phi.tools.calculator import Calculator
from phi.tools.csv_tools import CsvTools
# from phi.playground import Playground, serve_playground_app
# from phi.storage.agent.sqlite import SqlAgentStorage
from phi.model.google import Gemini

from dotenv import load_dotenv
load_dotenv()

health_agent = Agent(
    name="Health Agent",
    # model=OpenAIChat(id="gpt-4o"),
    # model=Gemini(id="gemini-1.5-flash"),
    model = Groq(id = "llama-3.3-70b-versatile"),
    tools=[DuckDuckGo(), 
           Calculator(
            add=True,
            subtract=True,
            multiply=True,
            divide=True,
            exponentiate=True,
            factorial=True,
            is_prime=True,
            square_root=True,
        ),CsvTools(csvs=[
            r'F:\FYP\agent\healthy-diet-recipes-a-comprehensive-dataset\versions\2\All_Diets.csv',
            r'F:\FYP\agent\healthy-diet-recipes-a-comprehensive-dataset\versions\2\keto.csv',
            r'F:\FYP\agent\healthy-diet-recipes-a-comprehensive-dataset\versions\2\dash.csv',
            r'F:\FYP\agent\healthy-diet-recipes-a-comprehensive-dataset\versions\2\mediterranean.csv',
            r'F:\FYP\agent\healthy-diet-recipes-a-comprehensive-dataset\versions\2\paleo.csv',
            r'F:\FYP\agent\healthy-diet-recipes-a-comprehensive-dataset\versions\2\vegan.csv',
        ])
],
    markdown=True,
    show_tool_calls=True,
    description="An AI specialized in health and diet queries.",
    task="Answer health and diet-related questions.",
    instructions=[
        "Get data from CsvTools for diet recipes and nutrients",
        "Use tables to display numerical data",
        "Provide links of the sources when you use the duckduckgo",
        "Avoid providing medical advice beyond general knowledge.",
        "I do not have answer for this domain"
    ],
    prevent_hallucinations = True,
    debug_mode=True,
    # storage=SqlAgentStorage(table_name="health_agent", db_file="agents.db"),
    # add_history_to_messages=True,
    additional_context="You are a virtual assistant focusing on health and nutrition. use keto.csv",
    
)
health_agent.print_response("tell me abut keto diet and recipe how can i reduce my bmi from 26 to 23. also tell me latest news on diet")
# run: RunResponse = health_agent.run("Caculate BMI for mass is 46kg and height is 5 feet 6 inches")
# print(run.content)
# app = Playground(agents=[health_agent]).get_app()

# if __name__ == "__main__":
#     serve_playground_app("health_agent:app", reload=True)

EVAL_PROMPT = """
Expected Response: {expected_response}
Actual Response: {actual_response}
---
(Answer with 'true' or 'false') Does the actual response match the expected response? 
"""


def test_csv_data():
    assert query_and_validate(
        question="How much protein is in Cauliflower Rice Recipe",
        expected_response="21.07g",
    )


def test_agent():
    assert query_and_validate(
        question="Caculate BMI for mass is 46kg and height is 5 feet 6 inches",
        expected_response="BMI is 16",
    )


def query_and_validate(question: str, expected_response: str):
    run: RunResponse = health_agent.run(question)
    response_text = run.content
    prompt = EVAL_PROMPT.format(
        expected_response=expected_response, actual_response=response_text
    )

    run: RunResponse = health_agent.run(prompt)
    evaluation_results_str = run.content
    evaluation_results_str_cleaned = evaluation_results_str.strip().lower()

    print(prompt)

    if "true" in evaluation_results_str_cleaned:
        # Print response in Green if it is correct.
        print("\033[92m" + f"Response: {evaluation_results_str_cleaned}" + "\033[0m")
        return True
    elif "false" in evaluation_results_str_cleaned:
        # Print response in Red if it is incorrect.
        print("\033[91m" + f"Response: {evaluation_results_str_cleaned}" + "\033[0m")
        return False
    else:
        raise ValueError(
            f"Invalid evaluation result. Cannot determine if 'true' or 'false'."
        )

# test_csv_data()
# test_agent()