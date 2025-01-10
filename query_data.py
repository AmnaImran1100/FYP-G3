import argparse
from langchain_chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_ollama import OllamaLLM
from get_embedding_function import get_embedding_function

CHROMA_PATH = r"F:\FYP\Current\o-level-physics-5054-20241117T145438Z-001"

# PROMPT_TEMPLATE = """
# structure of the response should be similar to question  papers
# Answer the question based only on the following context:

# {context}

# ---

# Answer the question based on the above context: {question}
# """
PROMPT_TEMPLATE = """
Generate a response in the exact format and structure of past question papers, including the tone and complexity of the questions.

Use only the provided context to craft your response. Do not include external information or assumptions.

Context:
{context}

---

Using the above context, generate a question with the following details: 
- Ensure the question adheres to the style, phrasing, and difficulty level of past papers.
- If applicable, include numbered subparts (e.g., (a), (b)).

Question: {question}
"""


def main():
    # Create CLI.
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_text = args.query_text
    query_rag(query_text)


def query_rag(query_text: str):
    # Prepare the DB.
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Search the DB.
    results = db.similarity_search_with_score(query_text, k=5)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)
    print(prompt)
    print("*"*50)
    model = OllamaLLM(model="mistral")
    response_text = model.invoke(prompt)

    sources = [doc.metadata.get("id", None) for doc, _score in results]
    formatted_response = f"Response: {response_text}\nSources: {sources}"
    print(formatted_response)
    return response_text


if __name__ == "__main__":
    main()