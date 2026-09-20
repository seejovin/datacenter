"""Run the prebuilt interactive academy inside Streamlit; no Node build required."""
from pathlib import Path
import streamlit as st
import streamlit.components.v1 as components

ROOT = Path(__file__).resolve().parent
st.set_page_config(page_title="Inside the Data Center", page_icon="🏢", layout="wide", initial_sidebar_state="collapsed")
st.markdown("<style>.block-container{padding:1rem;max-width:none}iframe{border:0}</style>", unsafe_allow_html=True)
if not (ROOT / "web" / "index.html").exists():
    st.error("The prebuilt web folder is missing. Upload the complete extracted project, including web/.")
    st.stop()
explorer = components.declare_component("data_center_explorer", path=str(ROOT / "web"))
explorer(key="data-center-explorer", default=None)
