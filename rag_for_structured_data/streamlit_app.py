import os
import requests
import streamlit as st
from dotenv import load_dotenv
from pinecone import Pinecone
from query_processor import QueryProcessor
from PIL import Image
from io import BytesIO

def display_image(image_url):
    """Handle image display for both regular URLs and Google Drive links"""
    try:
        if 'drive.google.com' in image_url:
            # Convert Google Drive share link to direct download URL
            file_id = image_url.split('/d/')[1].split('/')[0]
            direct_url = f'https://drive.google.com/uc?export=download&id={file_id}'
            
            # Create session to handle potential redirects
            session = requests.Session()
            response = session.get(direct_url, stream=True)
            
            if response.status_code == 200:
                image = Image.open(BytesIO(response.content))
                image = image.resize((1000, 500))  # (width, height)
                st.image(image, caption="Question Diagram", use_container_width=True)
            else:
                st.error(f"Failed to load Google Drive image (HTTP {response.status_code})")
        else:
            # Handle regular image URLs
            st.image(image_url, caption="Question Diagram", use_container_width=True)
            
    except Exception as e:
        st.error(f"Error displaying image: {str(e)}")

def initialize_pinecone():
    """Initialize and return Pinecone index connection"""
    load_dotenv()
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    return pc.Index("o-level-physics-paper-1")

# Configure page
st.set_page_config(
    page_title="WISSEN",
    page_icon="🧪",
    layout="wide"
)

# Custom CSS styling
st.markdown("""
    <style>
    .main {background-color: #f9f9f9;}
    .question-box {
        padding: 20px;
        border-radius: 10px;
        margin: 10px 0;
        background: white;
        border-bottom: 1px solid #e0e0e0;
    }
    .header {color: #2b5876;}
    </style>
    """, unsafe_allow_html=True)

# App header
st.markdown("<h1 class='header'>📚 WISSEN</h1>", unsafe_allow_html=True)

# Initialize services
try:
    index = initialize_pinecone()
    query_processor = QueryProcessor(index)
except Exception as e:
    st.error(f"Failed to initialize services: {str(e)}")
    st.stop()

# Search form
with st.form("search_form"):
    query = st.text_input("Enter your question search:", 
                         placeholder="E.g. 'Find year 2023 questions about magnetism'")
    search_button = st.form_submit_button("🔍 Search")

# Handle search
if search_button and query:
    with st.spinner("Searching through physics questions..."):
        try:
            results = query_processor.search_questions(query)
        except Exception as e:
            st.error(f"Search failed: {str(e)}")
            st.stop()
    
    if not results:
        st.warning("No matching questions found. Try different keywords.")
    else:
        st.markdown(f"### Found {len(results)} results for: '{query}'")
        
        for i, match in enumerate(results, 1):
            meta = match.metadata
            with st.container():
                st.divider()
                
                cols = st.columns([1,4])
                with cols[0]:
                    st.markdown(f"**Year:** {meta['year']}")
                    st.markdown(f"**Variant:** {meta['variant']}")
                    st.markdown(f"**Question #:** {meta['questionNumber']}")
                
                with cols[1]:
                    st.markdown(f"**Statement:** {meta['questionStatement']}")
                    
                    # Display image if available
                    if meta.get('image') and meta['image'] not in ['', 'urlOfImage']:
                        display_image(meta['image'])
                    
                    # Display options
                    if meta.get('options') and isinstance(meta['options'], list):
                        st.markdown("**Options:**")
                        for opt in meta['options']:
                            if "https" in opt:
                                display_image(opt)
                            else:
                                st.markdown(f"- {opt}")

elif search_button and not query:
    st.error("Please enter a search query first!")

# Sidebar info
with st.sidebar:
    st.markdown("## About")
    st.markdown("Search through O-Level Physics past paper questions using natural language queries.")
    st.markdown("**Features:**")
    st.markdown("- Search by year, topic, or question content")
    st.markdown("- View full question details")
    st.markdown("- Access question diagrams when available")
    st.markdown("---")
    st.markdown("**Example searches:**")
    st.markdown("- 'Questions about nuclear physics'")
    st.markdown("- '2023 magnetism problems'")
    st.markdown("- 'Mirror diagram questions'")