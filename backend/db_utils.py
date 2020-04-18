from contextlib import contextmanager
import mysql.connector

DATABASE = 'Users'
USER = 'root'
HOST = 'localhost'
PASSWORD = 'toor'


class Database:
    def __init__(self):
        self.database = DATABASE
        self.user = USER
        self.host = HOST
        self.password = PASSWORD

    @contextmanager
    def cursor(self, database, user, host, password):
        conn = mysql.connector.connect(database=database, user=user, host=host, password=password)
        conn.autocommit = False
        cur = conn.cursor()

        yield cur

        cur.close()
        conn.commit()
        conn.close()

    def add_user(self, name, email, status=False, phone=None, mobile=None):
        try:
            with self.cursor(self.database, self.user, self.host, self.password) as cur:
                cur.callproc("add_user", [name, email, status, phone, mobile])
                return True
        except Exception as e:
            print('Add user exception')
            print(e)
            return False

    def get_user(self, user_id):
        try:
            with self.cursor(self.database, self.user, self.host, self.password) as cur:
                cur.callproc("get_user", [user_id])
                return next(cur.stored_results()).fetchone()
        except Exception as e:
            print('Get user exception')
            print(e)
            return None

    def update_user(self, user_id, name, email, status, phone, mobile):
        try:
            with self.cursor(self.database, self.user, self.host, self.password) as cur:
                cur.callproc("update_user", [user_id, name, email, status, phone, mobile])
                return True
        except Exception as e:
            print('Update user exception')
            print(e)
            return False

    def delete_user(self, user_id):
        try:
            with self.cursor(self.database, self.user, self.host, self.password) as cur:
                cur.callproc("delete_user", [user_id])
                return True
        except Exception as e:
            print('Delete user exception')
            print(e)
            return False

    def get_users(self):
        try:
            with self.cursor(self.database, self.user, self.host, self.password) as cur:
                cur.callproc("get_users", [])
                return next(cur.stored_results()).fetchall()
        except Exception as e:
            print('Get users exception')
            print(e)
            return []

    def get_courses(self):
        try:
            with self.cursor(self.database, self.user, self.host, self.password) as cur:
                cur.callproc("get_courses", [])
                return next(cur.stored_results()).fetchall()
        except Exception as e:
            print('Get courses exception')
            print(e)
            return []

    def get_user_courses(self, user_id):
        try:
            with self.cursor(self.database, self.user, self.host, self.password) as cur:
                cur.callproc("get_user_courses", [user_id])
                return next(cur.stored_results()).fetchall()
        except Exception as e:
            print('Get user courses exception')
            print(e)
            return []

    def update_user_courses(self, user_id, course_ids):
        try:
            with self.cursor(self.database, self.user, self.host, self.password) as cur:
                #  todo should be transaction!!
                cur.callproc("delete_user_courses", [user_id])
                for c_id in course_ids:
                    cur.callproc("add_user_course", [user_id, c_id])

                return True
        except Exception as e:
            print('Update user courses exception')
            print(e)
            return False


if __name__ == '__main__':
    db = Database()
