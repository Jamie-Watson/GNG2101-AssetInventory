------------------------------------------------------------------------------

GOTTA MAKE PYTHON viRTUAL ENVIRONMENT (venv) TO RUN BACKEND AND 
GET ASSETS, CAN STILL LOGIN THOUGH

download python and pip package if not already downloaded
if on mac, use terminal instead of cmd prompt

to install: 
  - in cmd prompt, run: python -m pip install virtualenv

to make:
  - in cmd prompt, go to directory where you wanna make venv
  - run (name can be anything): python -m venv <name>
  - should make folder in directory with that name, this is ur venv

to activate:
  - be in directory where the venv is located
  - run: <name>\Scripts\activate
  - should see a (<name>) looking thingy at beginning of cmd prompt line

to download dependencies:
  - the dependencies are all listed in requirements.txt file
  - in cmd, go to backend directory
  - run: pip install -r requirements.txt

to like tell vscode that ur on virtual environment:
  - in vscode, do CTRL + SHIFT + P
  - search for Python: Select Interpreter
  - choose enter interpreter path and then find
  - go to your venv folder, Scripts, then choose python.exe

okay you should be good to do stuff now

------------------------------------------------------------------------------

TO RUN BACKEND SERVER (need to run to be able to login and stuff):
  - first, make sure you have virtual environment activated and have downloaded all dependencies
  - in command prompt, traverse to <xxx>/django_backend/backend directory
  - run: py manage.py runserver

------------------------------------------------------------------------------

django superuser info:
  username: admin
  email: admin@hospital.com
  password: 123

admin webpage: http://127.0.0.1:8000/admin/login/?next=/admin
api link: http://127.0.0.1:8000/api

------------------------------------------------------------------------------