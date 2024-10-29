------------------------------------------------------------------------------

GOTTA MAKE PYTHON ViRTUAL ENVIRONMENT (venv) TO RUN BACKEND SERVER

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

GETTING STARTED

gotta make sure all the database stuff is synced and also that you have an admin account that will be used to login from the frontend
if errors happen during this process let us know and we will try to fix

  1. make sure you're in the django_backend/backend directory in cmd
  2. run: py manage.py makemigrations
  3. run: py manage.py migrate
  4. run: py manage.py runserver
  5. go to the api link listed below, go to the employee part and create one (don't fill in barcode and barcodeImage stuff, its automatic)
  6. go back and then into the admin part and create one of those
  7. if you're getting errors and you have a populated database, you may need to run py manage.py flush (THIS WILL REMOVE ALL DB DATA, BE CAREFUL)

you should be good to login to the webpage now!


api link: http://127.0.0.1:8000/api
admin webpage: http://127.0.0.1:8000/admin/login/?next=/admin

------------------------------------------------------------------------------