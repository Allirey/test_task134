# Test task junior full-stack

### how to use:

###### clone project:
$ git clone https://github.com/Allirey/test_task134\
$ cd test_task134/

###### create necessary DB and tables:

$ sudo mysql -u [your_user or just 'root'] -p < [path/to/init_db.sql]

######create virtual environment: 
$ python3 -m venv venv \
$ source venv/bin/activate \
$ pip install -r requirements.txt \
\
To run backend you should be under **project root** directory:\
$ flask run

###### install frontend dependency:
$ cd frontend/ \
$ npm install \
To run frontend you should be under '**frontend**/' directory:\
$ npm start
