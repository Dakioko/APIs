from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Pydantic model for validation
class Todo(BaseModel):
    title: str
    completed: bool

# Sample data
todos = [
    Todo(title="Buy groceries", completed=False),
    Todo(title="Walk the dog", completed=True)
]

@app.get("/todos", response_model=List[Todo])
async def get_todos():
    return todos
