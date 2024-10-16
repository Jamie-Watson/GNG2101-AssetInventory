GOTTA MAKE PYTHON viRTUAL ENVIRONMENT (venv) TO EDIT BACKEND !!!!

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

okay you should be good to do stuff now
------------------------------------------------------------------------------
superuser info:
  username: admin
  email: admin@hospital.com
  password: 123

admin webpage: http://127.0.0.1:8000/admin/login/?next=/admin