from browser import bind, window, document, html, highlight, markdown
import os
import sys
import traceback
from browser.local_storage import storage

question_id = -1
# Transform markdown to html and insert in the document
output = "output_html_id"

imports = """
import sys
from browser import document
from io import StringIO
from browser.local_storage import storage
"""
utils = """
question_id = int(question_id)
class MyOutput:
    def __init__(self):
        self.console = document["output_html_id"]
    def write(self, text):
        self.console.text += text

def readInput():

    inputText = document["input_html_id"].value
    inputTextLines = inputText.splitlines()

    inputArray = []
    for i in inputTextLines:
        value = i
        try:
            value = int(value)
        except ValueError:
            pass
        inputArray.append(value)

    return inputArray

inputArray = readInput()
outputArray = []
"""

stdout_to_variable = """
old_stdout = sys.stdout
new_stdout = StringIO()
sys.stdout = new_stdout
"""
stdout_to_textarea = """
sys.stdout = MyOutput()
"""


def run(id):
    #document["input-letter"].clear()
    output_html_id = "output"+ id
    input_html_id = "input"+ id
    editor_html_id = "textarea-editor" + id

    clearOutput(output_html_id)

    code = document[editor_html_id].value    
    code = imports + utils + stdout_to_textarea + code
    code = replaceInput(code)
    code = setInputHtmlId(code, input_html_id)
    code = setOutputHtmlId(code, output_html_id)
    code = code.strip()
    loc = {}

    try:
        exec(code, {"test_id": 0, "question_id": question_id}, loc)
        document["error"].clear()
    except Exception as e:
        document[id].clear()
        document["error"].clear()
        document["error"] <= "Exception: " + str(e)
        #exception_handler(e)


def exception_handler(e):

    ex_type, ex_value, ex_traceback = sys.exc_info()

    # Extract unformatter stack traces as tuples
    trace_back = traceback.extract_tb(ex_traceback)

    # Format stacktrace
    stack_trace = list()

    for trace in trace_back:
        stack_trace.append("File : %s , Line : %d, Func.Name : %s, Message : %s" % (
            trace[0], trace[1], trace[2], trace[3]))

    print("Exception type : %s " % ex_type.__name__)
    print("Exception message : %s" % ex_value)
    print("Stack trace : %s" % stack_trace)


def replaceInput(code):
    return code.replace("input()", "inputArray.pop(0)")

def setInputHtmlId(code, input_html_id):
    return code.replace("input_html_id", input_html_id)

def setOutputHtmlId(code, output_html_id):
    return code.replace("output_html_id", output_html_id)

def clearOutput(output_html_id):
    document[output_html_id].clear()


@bind(document["mybutton1"], "click")
def runCode(ev):
    currentid = document["mybuttonparam"].value
    run(currentid)

# document['mybutton'].bind('click', runCode('paramofRuncode'))
