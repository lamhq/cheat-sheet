"""
Tweet Refinement Agent using LangGraph
Combines generation and reflection chains to iteratively improve tweets
"""

from typing import TypedDict, Annotated
from dotenv import load_dotenv

load_dotenv()

from langchain_core.messages import BaseMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI
from langgraph.graph import END, StateGraph
from langgraph.graph.message import add_messages

#region State Definition

class MessageGraph(TypedDict):
    """State schema for the tweet refinement graph"""
    messages: Annotated[list[BaseMessage], add_messages]

#endregion


#region Node Constants

REFLECT = "reflect"
GENERATE = "generate"

#endregion


#region Prompts

reflection_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a viral twitter influencer grading a tweet. Generate critique and recommendations for the user's tweet."
            "Always provide detailed recommendations, including requests for length, virality, style, etc.",
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]
)

generation_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a twitter techie influencer assistant tasked with writing excellent twitter posts."
            " Generate the best twitter post possible for the user's request."
            " If the user provides critique, respond with a revised version of your previous attempts.",
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]
)

#endregion


#region LLM and Chains

model = "gpt-5-nano-2025-08-07"
# model = "gpt-5.4-nano-2026-03-17"
llm = ChatOpenAI(model=model, temperature=0)
generate_chain = generation_prompt | llm
reflect_chain = reflection_prompt | llm

#endregion


#region Nodes

def generation_node(state: MessageGraph):
    """Generate or revise a tweet based on the message history"""
    return {"messages": [generate_chain.invoke({"messages": state["messages"]})]}


def reflection_node(state: MessageGraph):
    """Provide critique and feedback on the current tweet"""
    res = reflect_chain.invoke({"messages": state["messages"]})
    return {"messages": [HumanMessage(content=res.content)]}

#endregion


#region Graph Definition

builder = StateGraph(state_schema=MessageGraph)
builder.add_node(GENERATE, generation_node)
builder.add_node(REFLECT, reflection_node)
builder.set_entry_point(GENERATE)

def should_continue(state: MessageGraph):
    """Stop when the model has generated more than 2 tweets (initial + 2 revisions)"""
    ai_message_count = sum(1 for msg in state["messages"] if msg.__class__.__name__ == "AIMessage")
    if ai_message_count > 2:
        return END
    return REFLECT

builder.add_conditional_edges(GENERATE, should_continue)
builder.add_edge(REFLECT, GENERATE)

graph = builder.compile()

#endregion


#region Execution

graph.get_graph().draw_mermaid_png(output_file_path="flow.png")

initial_tweet = """Make this tweet better in maximum 70 words:
                u want learn english fast??
                dont just study book read watch movie listen musics talk peoples everyday,
                practice make perfct!!! never stop tryng, even if mistake its ok keep goin"""

inputs = {"messages": [HumanMessage(content=initial_tweet)]}
response = graph.invoke(inputs)

print("Final Refined Tweet:")
print(response["messages"][-1].content)

#endregion