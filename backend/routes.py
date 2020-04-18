from flask import jsonify, request
from backend import app
from .db_utils import Database

db = Database()


@app.route('/api/users', methods=['GET', 'POST'])
@app.route('/api/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def users(user_id=None):
    if user_id:
        if request.method == 'GET':
            # return user by id
            db_data = db.get_user(user_id)
            if not db_data:
                return jsonify({'message': 'user not found'}), 404
            user = {'id': db_data[0],
                    'name': db_data[1],
                    'email': db_data[2],
                    'status': db_data[3],
                    'phone': db_data[4],
                    'mobile': db_data[5]}
            return jsonify(user)

        if request.method == 'DELETE':
            # delete user
            if db.delete_user(user_id):
                return jsonify({'message': 'deleted'}), 204
            else:
                return jsonify({'message': 'not deleted'}), 404

        if request.method == 'PUT':
            # update user
            data = request.get_json()
            user_courses = data['courses']
            # todo should be transaction
            db.update_user(user_id, data['name'], data['email'], data['status'], data['phone'], data['mobile'])
            db.update_user_courses(user_id, user_courses)
            return jsonify({'message': 'updated'})

    else:
        if request.method == 'GET':
            # return all users
            user_list = [{'id': u_id,
                          'name': u_name,
                          'email': u_email,
                          'status': u_status,
                          'phone': u_phone,
                          'mobile': u_mobile}
                         for u_id, u_name, u_email, u_status, u_phone, u_mobile in db.get_users()]
            return jsonify(user_list)

        if request.method == 'POST':
            # add new user
            data = request.get_json()
            if db.add_user(data['name'], data['email'], data['status'], data['phone'], data['mobile']):
                return jsonify({'message': 'created'}), 201
            else:
                return jsonify({'message': 'not created'}), 400


@app.route('/api/courses', methods=['GET'])
@app.route('/api/courses/<int:user_id>', methods=['GET'])
def courses(user_id=None):
    if user_id is None:
        # return all courses
        all_courses = [{'id': c_id,
                        'name': c_name,
                        'code': c_code,
                        }
                       for c_id, c_name, c_code, in db.get_courses()]
        return jsonify(all_courses)
    else:
        # return user courses
        user_courses = [{'id': c_id,
                         'name': c_name,
                         'code': c_code,
                         }
                        for c_id, c_name, c_code, in db.get_user_courses(user_id)]
        return jsonify(user_courses)
