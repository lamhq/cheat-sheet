from dotenv import load_dotenv
from langchain_core.messages import HumanMessage
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langgraph.graph import MessagesState, StateGraph, END
from langgraph.prebuilt import ToolNode

load_dotenv()

#region Tools

@tool
def weather_search(query: str) -> str:
    """Useful for searching weather information."""
    return f"The weather in {query} is sunny with a high of 14°C and a low of 10°C."

@tool
def conclude(temp: float) -> str:
    """
    param temp: temperature in Celsius
    returns: a string conclude the weather is hot, cold or moderate
    """
    if temp > 30:
        return "The weather is hot."
    elif temp < 15:
        return "The weather is cold."
    else:
        return "The weather is moderate."

tools = [weather_search, conclude]

#endregion


#region LLM

model = "gpt-5-nano-2025-08-07"
# model = "gpt-5.4-nano-2026-03-17"
llm = ChatOpenAI(model=model, temperature=0).bind_tools(tools)

#endregion


#region Nodes

AGENT_REASON="agent_reason"
ACT= "act"
LAST = -1

def agent_reasoning_node(state: MessagesState) -> MessagesState:
    """
    Run the agent reasoning node.
    """

    SYSTEM_MESSAGE="""
    You are a helpful assistant that can use tools to answer questions.
    """
    response = llm.invoke([
        {"role": "system", "content": SYSTEM_MESSAGE}, 
        *state["messages"]
    ])
    return {"messages": [response]}

tool_node = ToolNode(tools)

#endregion


#region Edges

def should_continue(state: MessagesState) -> str:
    last_message = state["messages"][LAST]
    if not last_message.tool_calls:
        return END
    return ACT

#endregion


#region Flow

flow = StateGraph(MessagesState)
flow.add_node(AGENT_REASON, agent_reasoning_node)
flow.add_node(ACT, tool_node)
flow.add_conditional_edges(AGENT_REASON, should_continue, {
    END:END,
    ACT:ACT
})
flow.add_edge(ACT, AGENT_REASON)
flow.set_entry_point(AGENT_REASON)

#endregion


#region Flow

app = flow.compile()
app.get_graph().draw_mermaid_png(output_file_path="flow.png")

print("ReAct Implementation with LangGraph")
question = "What is the temperature in Sydney? Is it hot or cold?"
print(f"Question: {question}")

res = app.invoke({"messages": [HumanMessage(content=question)]})
print(res["messages"][LAST].content)

#endregion